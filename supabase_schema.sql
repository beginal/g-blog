-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    tags TEXT[] DEFAULT '{}',
    thumbnail TEXT,
    description TEXT,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_date ON posts(date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Policy: Anyone can read posts
CREATE POLICY "Posts are viewable by everyone" ON posts
    FOR SELECT USING (true);

-- Policy: Only authenticated users can create posts
CREATE POLICY "Authenticated users can create posts" ON posts
    FOR INSERT 
    WITH CHECK (auth.uid() = author_id);

-- Policy: Users can only update their own posts
CREATE POLICY "Users can update own posts" ON posts
    FOR UPDATE 
    USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

-- Policy: Users can only delete their own posts
CREATE POLICY "Users can delete own posts" ON posts
    FOR DELETE 
    USING (auth.uid() = author_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data (optional - remove in production)
-- INSERT INTO posts (title, content, date, tags, thumbnail, description, author_id)
-- VALUES 
-- ('Getting Started with Next.js 14', 'Content here...', '2024-01-15', ARRAY['nextjs', 'react', 'typescript'], 'https://example.com/thumbnail1.jpg', 'Learn how to build modern web applications with Next.js 14', auth.uid()),
-- ('Understanding TypeScript Generics', 'Content here...', '2024-01-10', ARRAY['typescript', 'programming'], 'https://example.com/thumbnail2.jpg', 'Deep dive into TypeScript generics', auth.uid());
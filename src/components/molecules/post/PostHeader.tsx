interface PostHeaderProps {
  title: string;
  date: string;
  tags?: string[];
}

export default function PostHeader({ title, date, tags }: PostHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{title}</h1>
      <div className="flex items-center justify-center space-x-4 text-white/60 text-sm">
        <span>{date}</span>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-[#3a404d] rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
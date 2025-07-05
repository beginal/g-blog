'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { COLORS } from '@/config/constants';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center">
      <div 
        className="w-full max-w-md rounded-lg shadow-xl p-8"
        style={{ backgroundColor: COLORS.surfaceCard }}
      >
        <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{
                backgroundColor: COLORS.background,
                '--focus-ring-color': COLORS.info,
              } as React.CSSProperties}
              onFocus={(e) => {
                e.currentTarget.style.ringColor = COLORS.info;
              }}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{
                backgroundColor: COLORS.background,
                '--focus-ring-color': COLORS.info,
              } as React.CSSProperties}
              onFocus={(e) => {
                e.currentTarget.style.ringColor = COLORS.info;
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition duration-200"
            style={{
              backgroundColor: COLORS.info,
              opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#2563eb'; // blue-700
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = COLORS.info;
              }
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            계정이 없으신가요?{' '}
            <Link 
              href="/signup" 
              className="font-medium transition duration-200"
              style={{ color: COLORS.info }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#60a5fa'; // blue-400
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = COLORS.info;
              }}
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

LoginPage.displayName = 'LoginPage';

export default LoginPage;
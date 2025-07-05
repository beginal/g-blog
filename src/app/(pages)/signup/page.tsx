'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signup } from '@/lib/api/auth';
import { COLORS } from '@/config/constants';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    try {
      const data = await signup({ email, password });

      if (data.needsEmailVerification) {
        setSuccessMessage('회원가입이 완료되었습니다! 이메일을 확인하여 계정을 활성화해주세요.');
      } else {
        setSuccessMessage('회원가입이 완료되었습니다!');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message || '회원가입 중 오류가 발생했습니다.');
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
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">
            회원가입
          </h2>
          <p 
            className="text-center text-sm mb-8"
            style={{ color: COLORS.textMuted }}
          >
            이미 계정이 있으신가요?{' '}
            <Link 
              href="/login" 
              className="font-medium transition duration-200"
              style={{ 
                color: COLORS.info,
                ':hover': { color: COLORS.primary }
              }}
            >
              로그인하기
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div 
              className="px-4 py-2 rounded-md text-sm"
              style={{ 
                backgroundColor: `${COLORS.error}33`,
                borderColor: COLORS.error,
                color: COLORS.error,
                border: `1px solid ${COLORS.error}`
              }}
            >
              {error}
            </div>
          )}
          {successMessage && (
            <div 
              className="px-4 py-2 rounded-md text-sm"
              style={{ 
                backgroundColor: `${COLORS.success}33`,
                borderColor: COLORS.success,
                color: COLORS.success,
                border: `1px solid ${COLORS.success}`
              }}
            >
              {successMessage}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{
                  backgroundColor: COLORS.background,
                  borderColor: COLORS.border,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.boxShadow = `0 0 0 2px ${COLORS.info}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = COLORS.border;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{
                  backgroundColor: COLORS.background,
                  borderColor: COLORS.border,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.boxShadow = `0 0 0 2px ${COLORS.info}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = COLORS.border;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="비밀번호 (최소 6자)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{
                  backgroundColor: COLORS.background,
                  borderColor: COLORS.border,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.boxShadow = `0 0 0 2px ${COLORS.info}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = COLORS.border;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full font-medium py-2 px-4 rounded-md transition duration-200 disabled:cursor-not-allowed"
              style={{
                backgroundColor: loading ? `${COLORS.info}80` : COLORS.info,
                color: COLORS.text
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = COLORS.primaryHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = COLORS.info;
                }
              }}
            >
              {loading ? '처리 중...' : '회원가입'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

SignUpPage.displayName = 'SignUpPage';

export default SignUpPage;
'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import MainWrapper from '@/components/layout/MainWrapper';
import { useLayoutConfig } from '@/hooks/useLayoutConfig';

interface LayoutControllerProps {
  children: React.ReactNode;
}

export default function LayoutController({ children }: LayoutControllerProps) {
  const { shouldShowHeader, shouldShowMainWrapper } = useLayoutConfig();

  return (
    <>
      {shouldShowHeader && <Header />}
      {shouldShowMainWrapper ? (
        <MainWrapper>{children}</MainWrapper>
      ) : (
        children
      )}
    </>
  );
}
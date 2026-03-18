'use client';

import { Suspense } from 'react';
import InterviewRoom from '@/components/InterviewRoom';

export default function MockInterviewPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[calc(100vh-4rem)]">Loading Interview Room...</div>}>
      <InterviewRoom />
    </Suspense>
  );
}

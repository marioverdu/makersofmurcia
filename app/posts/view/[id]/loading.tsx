"use client"

import { UnifiedLoading } from '@/components/ui/unified-loading';

export default function PostViewLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <UnifiedLoading />
    </div>
  );
}

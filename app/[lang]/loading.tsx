import { UnifiedLoading } from '@/components/ui/unified-loading';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <UnifiedLoading size={48} />
    </div>
  );
}

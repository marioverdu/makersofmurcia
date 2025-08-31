import { UnifiedLoading } from '@/components/ui/unified-loading';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <UnifiedLoading size={48} />
        <p className="mt-4 text-gray-600 text-sm">Cargando experiencia laboral...</p>
      </div>
    </div>
  );
}

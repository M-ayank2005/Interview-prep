import SystemDesignCanvas from '@/components/SystemDesignCanvas';
import '@excalidraw/excalidraw/index.css';

export const metadata = {
  title: 'System Design | Interview Prep',
  description: 'Interactive system design whiteboard',
};

export default function SystemDesignPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <SystemDesignCanvas />
    </div>
  );
}

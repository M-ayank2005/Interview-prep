'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Download, Share2, Save } from 'lucide-react';
import { toast } from 'sonner';

// Excalidraw MUST be imported dynamically because it heavily relies on the window object 
// and will throw errors if rendered on the server during Next.js SSR.
const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full w-full">Loading Canvas...</div> }
);

export default function SystemDesignCanvas() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  const handleExport = async () => {
    if (!excalidrawAPI) return;
    const elements = excalidrawAPI.getSceneElements();
    if (!elements || !elements.length) {
      toast.error('Canvas is empty. Draw something first!');
      return;
    }
    
    // Using dynamic import for the export function as well
    const { exportToBlob } = await import('@excalidraw/excalidraw');
    const blob = await exportToBlob({
        elements,
        mimeType: 'image/png',
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles()
    });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `system-design-${new Date().toISOString().slice(0, 10)}.png`;
    link.click();
    toast.success('Diagram exported successfully!');
  };

  const handleSave = () => {
     toast.info('Saving to profile functionality coming soon!');
  };

  return (
    <div className="h-full w-full flex flex-col bg-background">
      <div className="flex items-center justify-between p-4 border-b bg-muted/20">
        <div>
          <h2 className="text-xl font-semibold">System Design Whiteboard</h2>
          <p className="text-sm text-muted-foreground">Architect Low-Level and High-Level Designs interactively.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export PNG
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
             <Save className="w-4 h-4 mr-2" />
             Save to Profile
          </Button>
          <Button size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Collaborate
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative">
         {/* The Excalidraw component requires a definite height wrapper */}
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          theme="dark"
          UIOptions={{
            canvasActions: {
              loadScene: false,
              export: false,
              saveAsImage: false, // We're using our own UI for this
            }
          }}
        />
      </div>
    </div>
  );
}

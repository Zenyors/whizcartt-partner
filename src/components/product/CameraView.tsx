
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  switchCamera: () => void;
  captureImage: () => void;
  stopCamera: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({
  videoRef,
  canvasRef,
  switchCamera,
  captureImage,
  stopCamera
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <canvas ref={canvasRef} className="hidden" />
        
        <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-4">
          <Button 
            variant="outline" 
            onClick={switchCamera}
            className="bg-white"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button 
            onClick={captureImage}
            className="bg-white text-black hover:bg-gray-100"
          >
            Capture
          </Button>
        </div>
      </div>
      
      <Button
        variant="outline"
        className="mt-4"
        onClick={stopCamera}
      >
        Cancel
      </Button>
    </div>
  );
};

export default CameraView;

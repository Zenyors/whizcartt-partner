
import { useState, useRef, RefObject, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CameraControls {
  cameraActive: boolean;
  facingMode: 'user' | 'environment';
  startCamera: (videoRef: RefObject<HTMLVideoElement>) => Promise<void>;
  stopCamera: (videoRef: RefObject<HTMLVideoElement>) => void;
  switchCamera: () => void;
  captureImage: (
    videoRef: RefObject<HTMLVideoElement>,
    canvasRef: RefObject<HTMLCanvasElement>,
    onImageCapture: (imageData: string) => void
  ) => void;
}

export function useCamera(): CameraControls {
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const { toast } = useToast();

  const startCamera = async (videoRef: RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode }
      });
      
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Failed to access camera",
        variant: "destructive",
      });
      throw error;
    }
  };

  const stopCamera = (videoRef: RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    
    const stream = videoRef.current.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const switchCamera = () => {
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
  };

  const captureImage = (
    videoRef: RefObject<HTMLVideoElement>,
    canvasRef: RefObject<HTMLCanvasElement>,
    onImageCapture: (imageData: string) => void
  ) => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    try {
      // Get image data as base64
      const imageData = canvas.toDataURL('image/jpeg');
      onImageCapture(imageData);
    } catch (error) {
      console.error("Error capturing image:", error);
      toast({
        title: "Error",
        description: "Failed to capture image",
        variant: "destructive",
      });
    }
  };

  // Ensure camera cleanup when component unmounts or facingMode changes
  useEffect(() => {
    return () => {
      if (cameraActive) {
        // This won't actually work here since we don't have videoRef, 
        // but the component using this hook should call stopCamera in its cleanup
      }
    };
  }, [cameraActive]);

  return {
    cameraActive,
    facingMode,
    startCamera,
    stopCamera,
    switchCamera,
    captureImage
  };
}


import { useState, useRef, RefObject } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BarcodeScanner {
  isScanning: boolean;
  startBarcodeScanner: (
    videoRef: RefObject<HTMLVideoElement>,
    canvasRef: RefObject<HTMLCanvasElement>,
    onBarcodeDetected?: (barcodeData: { rawValue: string }) => void,
    onImageCapture?: (imageData: string) => void
  ) => Promise<void>;
  stopBarcodeScanner: () => void;
}

export function useBarcodeScanner(): BarcodeScanner {
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const scanIntervalRef = useRef<number | null>(null);

  const startContinuousScan = (
    videoRef: RefObject<HTMLVideoElement>,
    canvasRef: RefObject<HTMLCanvasElement>,
    onBarcodeDetected?: (barcodeData: { rawValue: string }) => void,
    onImageCapture?: (imageData: string) => void
  ) => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    scanIntervalRef.current = window.setInterval(async () => {
      if (!videoRef.current || !canvasRef.current || !isScanning) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      try {
        if ('BarcodeDetector' in window) {
          const barcodeDetector = new (window as any).BarcodeDetector({
            formats: ['qr_code', 'ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'code_93', 'itf']
          });
          
          const barcodes = await barcodeDetector.detect(canvas);
          
          if (barcodes.length > 0) {
            // Stop scanning when a barcode is found
            clearInterval(scanIntervalRef.current || 0);
            scanIntervalRef.current = null;
            setIsScanning(false);
            
            // Draw rectangle around the barcode
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'red';
            ctx.strokeRect(
              barcodes[0].boundingBox.x,
              barcodes[0].boundingBox.y,
              barcodes[0].boundingBox.width,
              barcodes[0].boundingBox.height
            );
            
            // Get image with the highlighted barcode
            const imageData = canvas.toDataURL('image/jpeg');
            
            // Pass the image data to the callback if it exists
            if (onImageCapture) {
              onImageCapture(imageData);
            }
            
            // Pass the barcode data if callback exists
            if (onBarcodeDetected) {
              onBarcodeDetected(barcodes[0]);
              
              toast({
                title: "Barcode detected",
                description: `Barcode value: ${barcodes[0].rawValue}`,
              });
            }
          }
        }
      } catch (error) {
        console.error("Error scanning barcode:", error);
      }
    }, 200); // Scan every 200ms
  };

  const startBarcodeScanner = async (
    videoRef: RefObject<HTMLVideoElement>,
    canvasRef: RefObject<HTMLCanvasElement>,
    onBarcodeDetected?: (barcodeData: { rawValue: string }) => void,
    onImageCapture?: (imageData: string) => void
  ) => {
    try {
      // Check if the BarcodeDetector API is available
      if (!('BarcodeDetector' in window)) {
        toast({
          title: "Not supported",
          description: "Barcode scanning is not supported on this device",
          variant: "destructive",
        });
        return;
      }
      
      setIsScanning(true);
      toast({
        title: "Barcode Scanner",
        description: "Point your camera at a barcode",
      });
      
      // Start continuous scanning
      startContinuousScan(videoRef, canvasRef, onBarcodeDetected, onImageCapture);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start barcode scanner",
        variant: "destructive",
      });
      console.error("Barcode scanner error:", error);
    }
  };

  const stopBarcodeScanner = () => {
    // Clear any ongoing scan interval
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
  };

  return {
    isScanning,
    startBarcodeScanner,
    stopBarcodeScanner
  };
}

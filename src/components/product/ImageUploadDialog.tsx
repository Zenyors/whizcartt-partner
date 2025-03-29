
import React, { useRef, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useCamera } from '@/hooks/useCamera';
import { useBarcodeScanner } from '@/hooks/useBarcodeScanner';
import CameraView from './CameraView';
import UploadOptions from './UploadOptions';

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageCapture: (imageData: string) => void;
  onBarcodeDetected?: (barcodeData: { rawValue: string }) => void;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  open,
  onOpenChange,
  onImageCapture,
  onBarcodeDetected
}) => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  
  // Custom hooks
  const { 
    cameraActive, 
    startCamera, 
    stopCamera: stopCameraFn, 
    switchCamera, 
    captureImage: captureImageFn 
  } = useCamera();
  
  const { 
    isScanning, 
    startBarcodeScanner, 
    stopBarcodeScanner 
  } = useBarcodeScanner();

  // Handle barcode scanning
  const handleScanBarcode = async () => {
    try {
      await startCamera(videoRef);
      startBarcodeScanner(videoRef, canvasRef, onBarcodeDetected, onImageCapture);
    } catch (error) {
      console.error("Failed to start camera for barcode scanning:", error);
    }
  };

  // Handle camera capture
  const handleUseCamera = async () => {
    try {
      await startCamera(videoRef);
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  // Capture image from camera
  const captureImage = () => {
    captureImageFn(videoRef, canvasRef, (imageData) => {
      onImageCapture(imageData);
      stopCamera();
      onOpenChange(false);
    });
  };

  // Stop the camera
  const stopCamera = () => {
    stopCameraFn(videoRef);
    stopBarcodeScanner();
  };

  // Handle gallery selection
  const handleGallerySelect = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Process file input (both gallery and file picker)
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onImageCapture(reader.result);
        onOpenChange(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Clean up when dialog closes or component unmounts
  useEffect(() => {
    if (!open && cameraActive) {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [open, cameraActive]);

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) stopCamera();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product Image</DialogTitle>
        </DialogHeader>
        
        {cameraActive ? (
          <CameraView
            videoRef={videoRef}
            canvasRef={canvasRef}
            switchCamera={switchCamera}
            captureImage={captureImage}
            stopCamera={() => {
              stopCamera();
            }}
          />
        ) : (
          <UploadOptions
            handleScanBarcode={handleScanBarcode}
            handleUseCamera={handleUseCamera}
            handleGallerySelect={handleGallerySelect}
            handleFileSelect={handleFileSelect}
            galleryInputRef={galleryInputRef}
            fileInputRef={fileInputRef}
            handleFileInputChange={handleFileInputChange}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;

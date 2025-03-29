
import React from 'react';
import { Camera, ScanBarcode, Image, FileImage, RotateCcw } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageCapture: (imageData: string) => void;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  open,
  onOpenChange,
  onImageCapture
}) => {
  const { toast } = useToast();
  const [cameraActive, setCameraActive] = React.useState(false);
  const [facingMode, setFacingMode] = React.useState<'user' | 'environment'>('environment');
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);

  // Handle barcode scanning
  const handleScanBarcode = async () => {
    try {
      // Check if the BarcodeDetector API is available
      if ('BarcodeDetector' in window) {
        // Start camera for barcode scanning
        await startCamera();
        setCameraActive(true);
        toast({
          title: "Barcode Scanner",
          description: "Point your camera at a barcode",
        });
        
        // We'll detect barcodes in the capture function
      } else {
        toast({
          title: "Not supported",
          description: "Barcode scanning is not supported on this device",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start barcode scanner",
        variant: "destructive",
      });
      console.error("Barcode scanner error:", error);
    }
  };

  // Handle camera capture
  const handleUseCamera = async () => {
    try {
      await startCamera();
      setCameraActive(true);
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Failed to access camera",
        variant: "destructive",
      });
      console.error("Camera error:", error);
    }
  };

  // Start the camera
  const startCamera = async () => {
    if (!videoRef.current) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode }
      });
      
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    } catch (error) {
      console.error("Error accessing camera:", error);
      throw error;
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (!videoRef.current) return;
    
    const stream = videoRef.current.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Switch camera between front and back
  const switchCamera = async () => {
    stopCamera();
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
    // Restart camera with new facing mode
    setTimeout(async () => {
      await startCamera();
    }, 300);
  };

  // Capture image from camera
  const captureImage = async () => {
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
      // If we're in barcode scanning mode, try to detect barcodes
      if ('BarcodeDetector' in window) {
        const barcodeDetector = new (window as any).BarcodeDetector({
          formats: ['qr_code', 'ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'code_93', 'itf']
        });
        
        const barcodes = await barcodeDetector.detect(canvas);
        
        if (barcodes.length > 0) {
          // We found a barcode
          toast({
            title: "Barcode detected",
            description: `Barcode value: ${barcodes[0].rawValue}`,
          });
          
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
          onImageCapture(imageData);
          stopCamera();
          onOpenChange(false);
          return;
        }
      }
      
      // Get image data as base64
      const imageData = canvas.toDataURL('image/jpeg');
      onImageCapture(imageData);
      stopCamera();
      onOpenChange(false);
    } catch (error) {
      console.error("Error capturing image:", error);
      toast({
        title: "Error",
        description: "Failed to capture image",
        variant: "destructive",
      });
    }
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

  // Clean up when dialog closes
  React.useEffect(() => {
    if (!open && cameraActive) {
      stopCamera();
    }
  }, [open, cameraActive]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product Image</DialogTitle>
        </DialogHeader>
        
        {cameraActive ? (
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
              onClick={() => {
                stopCamera();
                setCameraActive(false);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-6"
              onClick={handleScanBarcode}
            >
              <ScanBarcode className="h-10 w-10 mb-2" />
              <span>Scan Barcode</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-6"
              onClick={handleUseCamera}
            >
              <Camera className="h-10 w-10 mb-2" />
              <span>Use Camera</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-6"
              onClick={handleGallerySelect}
            >
              <Image className="h-10 w-10 mb-2" />
              <span>From Gallery</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-6"
              onClick={handleFileSelect}
            >
              <FileImage className="h-10 w-10 mb-2" />
              <span>Choose File</span>
            </Button>
            
            <input 
              type="file"
              ref={galleryInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileInputChange}
              capture="environment"
            />
            
            <input 
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;

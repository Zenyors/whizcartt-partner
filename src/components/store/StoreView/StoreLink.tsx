
import React, { useState } from 'react';
import { CheckCircle, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

interface StoreLinkProps {
  handleCopyStoreLink: () => void;
  storeLink?: string;
}

const StoreLink: React.FC<StoreLinkProps> = ({ 
  handleCopyStoreLink,
  storeLink = "https://mystore.com/store-name" 
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    handleCopyStoreLink();
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  const shareToSocialMedia = (platform: string) => {
    let shareUrl = '';
    
    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=Check out my store: ${encodeURIComponent(storeLink)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(storeLink)}&text=Check out my store`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL, so we just copy the link
        navigator.clipboard.writeText(storeLink);
        toast({
          title: "Link Copied for Instagram",
          description: "Share this link on Instagram"
        });
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg mt-3">
      <p className="text-sm text-gray-600 truncate mr-2">{storeLink}</p>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center" 
          onClick={handleCopyLink}
        >
          {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="flex items-center">
              <Share2 className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem onClick={() => shareToSocialMedia('whatsapp')}>
              WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia('facebook')}>
              Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia('twitter')}>
              Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia('instagram')}>
              Instagram
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default StoreLink;

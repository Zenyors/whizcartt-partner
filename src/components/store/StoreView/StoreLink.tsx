
import React, { useState } from 'react';
import { Link, Share2, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StoreLinkProps {
  handleCopyStoreLink: () => void;
}

const StoreLink: React.FC<StoreLinkProps> = ({ handleCopyStoreLink }) => {
  const storeLink = "https://whizcart.partner/store/123"; // In a real app, this would be dynamic
  
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeLink)}`, '_blank');
  };
  
  const shareOnInstagram = () => {
    // Instagram doesn't have a direct share URL, but you could show instructions
    alert("To share on Instagram: Copy the link and paste it in your Instagram story or post.");
  };
  
  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(storeLink)}`, '_blank');
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
      <div className="flex items-center">
        <span>Copy Store link</span>
      </div>
      <div className="flex items-center gap-2">
        <Link className="h-5 w-5 cursor-pointer" onClick={handleCopyStoreLink} />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={shareOnFacebook}>
              <Facebook className="h-4 w-4 mr-2 text-blue-600" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareOnInstagram}>
              <Instagram className="h-4 w-4 mr-2 text-pink-600" />
              <span>Instagram</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareOnWhatsApp}>
              <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
              <span>WhatsApp</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default StoreLink;


import React from 'react';
import { Bell, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface HeaderActionsProps {
  onAddProduct: () => void;
  onSettings: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({ 
  onAddProduct,
  onSettings
}) => (
  <div className="flex gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <div className="py-2 px-3 text-center border-b">
          <p className="font-medium">Notifications</p>
        </div>
        <div className="p-4 text-center text-sm text-gray-500">
          <p>No new notifications</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem 
          className="cursor-pointer flex items-center"
          onClick={onAddProduct}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer flex items-center"
          onClick={onSettings}
        >
          <Settings className="mr-2 h-4 w-4" />
          Store Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

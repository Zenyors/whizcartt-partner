
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  LayoutDashboard, 
  Package, 
  RotateCcw, 
  CreditCard, 
  Settings,
  Megaphone,
  HelpCircle,
  LogOut,
  Store,
  Link
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetContent, SheetHeader } from './ui/sheet';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';

interface ProfileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ open, onClose }) => {
  const { userProfile, logout } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const copyStoreLink = () => {
    navigator.clipboard.writeText('https://store.whizcart.com/johndoe');
    toast({
      title: "Link copied",
      description: "Store link copied to clipboard",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const menuItems = [
    { icon: FileText, label: 'Order History', path: '/orders' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'My Products', path: '/products' },
    { icon: RotateCcw, label: 'Return & Refund', path: '/returns' },
    { icon: CreditCard, label: 'Payment', path: '/payments' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Megaphone, label: 'Advertisement', path: '/advertisements' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-[280px] p-0 bg-gray-100">
        <div className="flex flex-col min-h-full">
          {/* Header with user info */}
          <div className="p-4 bg-white">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-base">{userProfile.name}</h3>
                <p className="text-sm text-gray-600">{userProfile.phone}</p>
                <p className="text-sm text-gray-500">{userProfile.email}</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs" 
                onClick={() => handleNavigation('/store-view')}
              >
                <Store className="h-3 w-3 mr-1" />
                View Store
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs" 
                onClick={copyStoreLink}
              >
                <Link className="h-3 w-3 mr-1" />
                Copy Store link
              </Button>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="flex items-center w-full py-3 px-6 hover:bg-gray-200 transition-colors"
                  >
                    <item.icon className="h-5 w-5 mr-4 text-gray-600" />
                    <span className="text-sm font-light">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout button */}
          <div className="mt-auto py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full py-3 px-6 hover:bg-gray-200 transition-colors text-red-600"
            >
              <LogOut className="h-5 w-5 mr-4" />
              <span className="text-sm font-light">Log Out</span>
            </button>
          </div>
          
          {/* Bottom company name */}
          <div className="p-4 flex justify-center items-center border-t border-gray-200">
            <span className="text-sm text-gray-500">Whizcart</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSidebar;

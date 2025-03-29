
import { useToast } from '@/hooks/use-toast';

export const useNotificationService = () => {
  const { toast } = useToast();

  const notifyStoreLinkCopied = () => {
    toast({
      title: "Link copied",
      description: "Store link copied to clipboard",
    });
  };

  const notifyStoreStatusChanged = (isActive: boolean) => {
    toast({
      title: isActive ? "Store Activated" : "Store Deactivated",
      description: isActive ? "Your store is now online" : "Your store is now offline",
    });
  };

  const notifyStoreUpdated = (component: string) => {
    toast({
      title: `${component} Updated`,
      description: `Your store ${component.toLowerCase()} has been updated`,
    });
  };

  const notifyProductAction = (action: string, id?: number) => {
    toast({
      title: `Product ${action}`,
      description: id ? `Product #${id} has been ${action.toLowerCase()}` : `Product has been ${action.toLowerCase()}`,
    });
  };

  return {
    notifyStoreLinkCopied,
    notifyStoreStatusChanged,
    notifyStoreUpdated,
    notifyProductAction
  };
};

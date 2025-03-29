
export interface Order {
  id: string;
  totalItems: number;
  amount: number;
  status: 'pending' | 'accepted' | 'denied' | 'completed';
  timestamp: Date;
  reason?: string;
}

export interface DashboardStats {
  ordered: number;
  dispatched: number;
  delivered: number;
  cancelled: number;
  totalOrders: number;
  dailyEarnings: number;
}

// Mock data for the dashboard
const mockOrders: Order[] = [
  {
    id: 'XYZ123',
    totalItems: 3,
    amount: 45.99,
    status: 'pending',
    timestamp: new Date(),
  },
  {
    id: 'ABC456',
    totalItems: 1,
    amount: 12.50,
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: 'DEF789',
    totalItems: 5,
    amount: 78.25,
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: 'GHI101',
    totalItems: 2,
    amount: 25.99,
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: 'JKL112',
    totalItems: 4,
    amount: 67.50,
    status: 'denied',
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    reason: 'Items out of stock'
  }
];

const mockStats: DashboardStats = {
  ordered: 0,
  dispatched: 0,
  delivered: 0,
  cancelled: 0,
  totalOrders: 0,
  dailyEarnings: 0
};

export const getOrders = (): Order[] => {
  return [...mockOrders];
};

export const getStats = (): DashboardStats => {
  return { ...mockStats };
};

export const updateOrderStatus = (
  orderId: string, 
  status: 'accepted' | 'denied',
  reason?: string
): void => {
  const orderIndex = mockOrders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    mockOrders[orderIndex].status = status;
    if (status === 'denied' && reason) {
      mockOrders[orderIndex].reason = reason;
    }
  }
};

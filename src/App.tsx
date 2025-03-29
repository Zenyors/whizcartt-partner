
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'; // Add React import
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Returns from "./pages/Returns";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Advertisements from "./pages/Advertisements";
import Help from "./pages/Help";
import Store from "./pages/Store";
import StoreView from "./pages/StoreView";
import AddProduct from "./pages/AddProduct"; // Add the new import
import Login from "./pages/Login"; // Add Login import
import Signup from "./pages/Signup"; // Add Signup import
import NotFound from "./pages/NotFound";

// Create the client outside of the component to avoid recreating it on every render
const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/advertisements" element={<Advertisements />} />
              <Route path="/help" element={<Help />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store-view" element={<StoreView />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/login" element={<Login />} /> {/* Add Login route */}
              <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;

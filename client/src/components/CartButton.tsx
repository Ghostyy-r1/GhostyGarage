import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "R1M Custom T-Shirt",
      price: 34.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Ghosty's Garage Hoodie",
      price: 59.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop"
    }
  ]);
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9 mr-1 border border-gray-700 bg-black/20 hover:bg-black/30"
        >
          <ShoppingCart className="h-4 w-4 text-gray-200" />
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border border-red-700 flex items-center justify-center text-[10px] text-white font-medium"
            >
              {totalItems}
            </motion.div>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle className="text-xl flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        
        <div className="flex flex-col flex-1 overflow-auto">
          <AnimatePresence>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-500 mb-4">Looks like you haven't added any items to your cart yet.</p>
                <SheetClose asChild>
                  <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
                </SheetClose>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex items-center space-x-4 p-2 border border-gray-200 dark:border-gray-800 rounded-lg"
                    >
                      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-sm font-bold text-primary">${item.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6 rounded-full p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <span>-</span>
                          </Button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6 rounded-full p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <span>+</span>
                          </Button>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeItem(item.id)}
                        className="h-7 w-7 rounded-full"
                      >
                        <span className="sr-only">Remove</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-auto pt-6">
                  <Separator className="mb-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid gap-2">
                    <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      Checkout
                    </Button>
                    <SheetClose asChild>
                      <Button variant="outline" size="lg" className="w-full">
                        Continue Shopping
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
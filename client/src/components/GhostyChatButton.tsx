import { useState } from 'react';
import { MessageCircle, X, Send, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAIChat, type ChatMessage } from '@/hooks/use-ai-chat';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function GhostyChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const {
    messages,
    isLoading,
    sendMessage,
    connectionStatus
  } = useAIChat({
    onError: () => {
      toast({
        title: 'Chat Error',
        description: 'Failed to get a response from Ghosty. Please try again later.',
        variant: 'destructive',
      });
    }
  });

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Add a welcome message if there are no messages
  const chatMessages = messages.length === 0 
    ? [
        {
          id: 'welcome',
          type: 'ai' as const,
          content: "Hey there, rider! I'm Ghosty, your friendly motorcycle enthusiast assistant. How can I help you today? Ask me anything about our community, motorcycles, or just say hi!",
          timestamp: new Date().toISOString(),
        }
      ]
    : messages;

  return (
    <>
      {/* Floating action button */}
      <Button
        onClick={handleToggle}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg"
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-80 sm:w-96 z-50"
          >
            <Card className="shadow-xl border-purple-300 dark:border-purple-800">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg p-4 flex flex-row items-center space-x-2">
                <Ghost className="h-6 w-6" />
                <CardTitle className="text-lg font-bold">Ghosty</CardTitle>
                {connectionStatus !== 'open' && (
                  <span className="text-xs px-2 py-1 bg-yellow-500 text-yellow-950 rounded-full ml-auto">
                    Fallback Mode
                  </span>
                )}
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 flex flex-col space-y-3">
                  {chatMessages.map((message) => (
                    <ChatBubble key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <div className="self-start bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg p-3 max-w-[85%]">
                      <div className="flex space-x-1">
                        <div className="animate-bounce h-2 w-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                        <div className="animate-bounce h-2 w-2 bg-purple-600 dark:bg-purple-400 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                        <div className="animate-bounce h-2 w-2 bg-purple-600 dark:bg-purple-400 rounded-full" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Ghosty anything..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSend} 
                    disabled={inputValue.trim() === '' || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface ChatBubbleProps {
  message: ChatMessage;
}

function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.type === 'user';
  
  return (
    <div
      className={cn(
        "max-w-[85%]",
        isUser ? "self-end" : "self-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg p-3",
          isUser 
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" 
            : "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Ghost, Check, Clock, HelpCircle } from 'lucide-react';
import { Bike } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { User } from 'lucide-react';
import { Wrench } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Draggable from 'react-draggable';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAIChat, type ChatMessage } from '@/hooks/use-ai-chat';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function GhostyChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [seenMessages, setSeenMessages] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
  
  // Mark messages as seen when chat is open and scrolled to bottom
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      const timer = setTimeout(() => {
        const newSeen = { ...seenMessages };
        messages.forEach(msg => {
          if (msg.type === 'ai') {
            newSeen[msg.id] = true;
          }
        });
        setSeenMessages(newSeen);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages, seenMessages]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

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
          content: "Hey there, rider! I'm Ghosty from Toronto, Canada. I'm the creator of Ghosty's Garage and an Automotive Service Technician with a passion for motorcycles, especially my Yamaha YZF-R1M.\n\nHow can I help you today? You can ask me about:\n• My background and motorcycle journey\n• Our community features and events\n• Motorcycle maintenance tips\n• My merchandise and Instagram\n• Or just say hi! 🏍️",
          timestamp: new Date().toISOString(),
        }
      ]
    : messages;

  return (
    <>
      {/* Floating action button with tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleToggle}
              className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg"
              size="icon"
            >
              {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-purple-600 text-white border-purple-700">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>Ask Ghosty anything about motorcycles!</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Chat popup - draggable */}
      <AnimatePresence>
        {isOpen && (
          <Draggable
            handle=".drag-handle"
            defaultPosition={{x: window.innerWidth - 400, y: window.innerHeight - 650}}
            bounds="body"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed w-80 sm:w-96 z-50"
              style={{ position: 'absolute' }}
            >
              <Card className="shadow-xl border-purple-300 dark:border-purple-800">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg p-4 flex flex-row items-center space-x-3 drag-handle cursor-move">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src="https://i.imgur.com/2kGDzJO.png" alt="Ghosty" />
                    <AvatarFallback className="bg-purple-800 text-white">GH</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <CardTitle className="text-lg font-bold">Ghosty</CardTitle>
                    <div className="flex items-center text-xs text-white/80">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                      Active now
                    </div>
                  </div>
                  {connectionStatus !== 'open' && (
                    <span className="text-xs px-2 py-1 bg-yellow-500 text-yellow-950 rounded-full ml-auto">
                      Fallback Mode
                    </span>
                  )}
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-80 overflow-y-auto p-4 flex flex-col space-y-4">
                    {chatMessages.map((message, index) => (
                      <ChatBubble 
                        key={message.id} 
                        message={message} 
                        seen={seenMessages[message.id] || false}
                        previousMessage={index > 0 ? chatMessages[index - 1] : undefined}
                      />
                    ))}
                    
                    {/* Show conversation starters if there are only welcome messages */}
                    {chatMessages.length === 1 && chatMessages[0].id === 'welcome' && (
                      <div className="self-center flex flex-wrap gap-2 justify-center mt-2 w-full">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 text-xs px-3 py-1 h-auto border-purple-200 dark:border-purple-700"
                          onClick={() => {
                            setInputValue("Tell me about your merchandise");
                            handleSend();
                          }}
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          View Merch
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 text-xs px-3 py-1 h-auto border-purple-200 dark:border-purple-700"
                          onClick={() => {
                            setInputValue("Why do you go by the name Ghosty?");
                            handleSend();
                          }}
                        >
                          <User className="h-3 w-3 mr-1" />
                          About You
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 text-xs px-3 py-1 h-auto border-purple-200 dark:border-purple-700"
                          onClick={() => {
                            setInputValue("What motorcycle do you ride?");
                            handleSend();
                          }}
                        >
                          <Bike className="h-3 w-3 mr-1" />
                          Your Bike
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 text-xs px-3 py-1 h-auto border-purple-200 dark:border-purple-700"
                          onClick={() => {
                            setInputValue("Tell me about upcoming events");
                            handleSend();
                          }}
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          Events
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 text-xs px-3 py-1 h-auto border-purple-200 dark:border-purple-700"
                          onClick={() => {
                            setInputValue("What maintenance tips do you have?");
                            handleSend();
                          }}
                        >
                          <Wrench className="h-3 w-3 mr-1" />
                          Maintenance Tips
                        </Button>
                      </div>
                    )}
                    
                    {isLoading && (
                      <div className="self-start flex items-center space-x-2 max-w-[85%]">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://i.imgur.com/2kGDzJO.png" alt="Ghosty" />
                          <AvatarFallback className="bg-purple-800 text-white text-xs">GH</AvatarFallback>
                        </Avatar>
                        <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="animate-bounce h-2 w-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                            <div className="animate-bounce h-2 w-2 bg-purple-600 dark:bg-purple-400 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                            <div className="animate-bounce h-2 w-2 bg-purple-600 dark:bg-purple-400 rounded-full" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
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
          </Draggable>
        )}
      </AnimatePresence>
    </>
  );
}

interface ChatBubbleProps {
  message: ChatMessage;
  seen?: boolean;
  previousMessage?: ChatMessage;
}

function ChatBubble({ message, seen = false, previousMessage }: ChatBubbleProps) {
  const isUser = message.type === 'user';
  
  // Check if this is the first message in a sequence from the same sender
  const isFirstInSequence = !previousMessage || previousMessage.type !== message.type;
  
  // Get the timestamp for display
  const timestamp = new Date(message.timestamp);
  const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div
      className={cn(
        "max-w-[85%] relative",
        isUser ? "self-end" : "self-start"
      )}
    >
      {/* Only show avatar for the first message in a sequence from Ghosty */}
      {!isUser && isFirstInSequence && (
        <div className="flex items-center mb-1 ml-1">
          <Avatar className="h-6 w-6 mr-1">
            <AvatarImage src="https://i.imgur.com/2kGDzJO.png" alt="Ghosty" />
            <AvatarFallback className="bg-purple-800 text-white text-xs">GH</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500 dark:text-gray-400">Ghosty</span>
        </div>
      )}
      
      <div
        className={cn(
          "rounded-lg p-3",
          isUser 
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" 
            : "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
        )}
      >
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a 
                  {...props} 
                  className="text-purple-600 dark:text-purple-400 font-medium underline hover:text-purple-800 dark:hover:text-purple-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                />
              )
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
      
      <div className={cn(
        "flex items-center text-xs mt-1 space-x-1",
        isUser ? "justify-end" : "justify-start"
      )}>
        <span className="text-gray-500 dark:text-gray-400">{timeString}</span>
        
        {isUser && (
          <span className="text-blue-500">
            {seen ? (
              <Check className="h-3 w-3" />
            ) : (
              <Clock className="h-3 w-3" />
            )}
          </span>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, X, Send, Ghost, Check, Clock, HelpCircle, ArrowUpDown, ArrowLeftRight,
  Minimize, Maximize, MinusCircle, Settings, Bike, Calendar, ShoppingBag, User, Wrench,
  Map, Star, Info, Hash, Sparkles, ChevronDown, ChevronUp
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAIChat, type ChatMessage } from '@/hooks/use-ai-chat';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function GhostyChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [seenMessages, setSeenMessages] = useState<Record<string, boolean>>({});
  const [chatSize, setChatSize] = useState({ width: 380, height: 520 });
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
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
            <div className="fixed bottom-6 right-6 z-40" style={{ position: "relative" }}>
              <Button
                onClick={handleToggle}
                className="rounded-full w-14 h-14 p-0 shadow-lg shadow-purple-900/20 bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-none"
                size="icon"
              >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
              </Button>
              
              {/* Notification dot - show when there are unread AI messages */}
              {!isOpen && messages.some(m => m.type === 'ai' && !seenMessages[m.id]) && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-xs text-white font-bold"
                >
                  {messages.filter(m => m.type === 'ai' && !seenMessages[m.id]).length}
                </motion.div>
              )}
              
              {/* Animated pulse when open */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.8 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 rounded-full bg-purple-600 -z-10"
                ></motion.div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-purple-800 text-white border-purple-700">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>Ask Ghosty anything about motorcycles!</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Chat popup - draggable and resizable */}
      <AnimatePresence>
        {isOpen && (
          <Draggable
            handle=".drag-handle"
            defaultPosition={{x: window.innerWidth - 440, y: window.innerHeight - 620}}
            bounds="body"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50"
              style={{ position: 'absolute' }}
            >
              <ResizableBox
                width={chatSize.width}
                height={chatSize.height}
                minConstraints={[280, 400]}
                maxConstraints={[600, 800]}
                resizeHandles={['se']}
                handle={
                  <div className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center cursor-se-resize text-purple-400 dark:text-purple-600 z-10">
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M0 10H2V8H4V6H6V4H8V2H10V0H0" fill="currentColor" />
                    </svg>
                  </div>
                }
                onResizeStop={(e, data) => {
                  setChatSize({
                    width: data.size.width,
                    height: data.size.height,
                  });
                  
                  // Scroll to bottom after resize
                  if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Card 
                  className="shadow-xl border-purple-300 dark:border-purple-800"
                  style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg p-3 flex flex-row items-center space-x-3 drag-handle cursor-move">
                    <Avatar className="h-10 w-10 border-2 border-white/20 flex-shrink-0 shadow-md">
                      <AvatarImage src="https://i.imgur.com/2kGDzJO.png" alt="Ghosty" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white">GH</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center">
                        <CardTitle className="text-lg font-bold truncate">Ghosty</CardTitle>
                        <Badge className="ml-2 bg-purple-300/20 text-white text-[10px] px-1.5 py-0 h-4 border border-purple-200/30">
                          Creator
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-white/80">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                        Active now
                      </div>
                    </div>
                    <div className="flex items-center ml-auto space-x-2">
                      {connectionStatus !== 'open' && (
                        <span className="text-xs px-2 py-1 bg-yellow-500 text-yellow-950 rounded-full">
                          Fallback Mode
                        </span>
                      )}
                      
                      <div className="flex items-center ml-auto">
                        <TooltipProvider>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10"
                                onClick={() => setIsMinimized(!isMinimized)}
                              >
                                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-purple-900 border-purple-700 text-white">
                              <span>{isMinimized ? 'Maximize' : 'Minimize'}</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10"
                                onClick={handleToggle}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-purple-900 border-purple-700 text-white">
                              <span>Close Chat</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardHeader>
                  {isMinimized ? (
                    <div className="p-3 border-t flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-gray-500">Chat minimized - click to expand</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => setIsMinimized(false)}
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <CardContent className="p-0 flex-grow overflow-hidden">
                        <div 
                          className="p-4 flex flex-col space-y-4 overflow-y-auto" 
                          style={{ height: `calc(100% - 0px)` }}
                          ref={chatContainerRef}
                        >
                          {chatMessages.map((message, index) => (
                            <ChatBubble 
                              key={message.id} 
                              message={message} 
                              seen={seenMessages[message.id] || false}
                              previousMessage={index > 0 ? chatMessages[index - 1] : undefined}
                            />
                          ))}
                          
                          {/* Show conversation starters if there are only welcome messages */}
                          {chatMessages.length === 1 && chatMessages[0].id === 'welcome' && showSuggestions && (
                            <motion.div 
                              className="self-center flex flex-wrap gap-2 justify-center mt-4 w-full"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5, duration: 0.3 }}
                            >
                              <div className="w-full mb-1 text-center">
                                <div className="flex items-center justify-center mb-2">
                                  <span className="h-[1px] bg-gray-200 dark:bg-gray-700 w-16"></span>
                                  <span className="mx-2 text-xs text-gray-400 uppercase font-semibold">Quick Questions</span>
                                  <span className="h-[1px] bg-gray-200 dark:bg-gray-700 w-16"></span>
                                </div>
                              </div>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 text-xs px-3 py-1 h-auto border-purple-200 dark:border-purple-700"
                                onClick={() => {
                                  setInputValue("Tell me about your merchandise");
                                  setShowSuggestions(false);
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
                                  setShowSuggestions(false);
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
                                  setShowSuggestions(false);
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
                                  setShowSuggestions(false);
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
                                  setShowSuggestions(false);
                                  handleSend();
                                }}
                              >
                                <Wrench className="h-3 w-3 mr-1" />
                                Maintenance Tips
                              </Button>
                              
                              <div className="w-full flex justify-center mt-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs text-gray-500"
                                  onClick={() => setShowSuggestions(false)}
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Dismiss Suggestions
                                </Button>
                              </div>
                            </motion.div>
                          )}
                          
                          {isLoading && (
                            <div className="self-start flex items-center space-x-2 max-w-[85%]">
                              <Avatar className="h-6 w-6 shadow-sm">
                                <AvatarImage src="https://i.imgur.com/2kGDzJO.png" alt="Ghosty" />
                                <AvatarFallback className="bg-purple-800 text-white text-xs">GH</AvatarFallback>
                              </Avatar>
                              <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg p-3 shadow-sm">
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
                            className="flex-1 shadow-sm focus-visible:ring-purple-500"
                            disabled={isLoading}
                          />
                          <Button 
                            size="icon" 
                            onClick={handleSend} 
                            disabled={inputValue.trim() === '' || isLoading}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </>
                  )}
                </Card>
              </ResizableBox>
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
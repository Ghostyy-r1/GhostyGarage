import { useState, useCallback, useEffect } from 'react';
import { useWebSocket } from './use-websocket';
import { apiRequest } from '@/lib/queryClient';

export type ChatMessageType = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  type: ChatMessageType;
  content: string;
  timestamp: string;
}

export interface AIChatOptions {
  useWebSocket?: boolean;
  onError?: (error: Error) => void;
}

export function useAIChat(options: AIChatOptions = {}) {
  const { useWebSocket: useWs = true, onError } = options;
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Set up WebSocket if enabled
  const { 
    status: wsStatus, 
    sendJsonMessage,
    messages: wsMessages
  } = useWs ? useWebSocket('/ws') : { status: 'closed', sendJsonMessage: null, messages: [] };
  
  // Process incoming WebSocket messages
  useEffect(() => {
    if (useWs && wsMessages.length > 0) {
      try {
        const lastMessage = JSON.parse(wsMessages[wsMessages.length - 1]);
        
        if (lastMessage.type === 'ai_chat') {
          const aiMessage: ChatMessage = {
            id: lastMessage.messageId.toString(),
            type: 'ai',
            content: lastMessage.content,
            timestamp: lastMessage.timestamp,
          };
          
          setMessages(prev => [...prev, aiMessage]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [useWs, wsMessages]);
  
  // Function to send a message via WebSocket
  const sendMessageWs = useCallback((content: string) => {
    if (useWs && sendJsonMessage && wsStatus === 'open') {
      // Add user message to state
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      
      // Send message via WebSocket
      sendJsonMessage({
        type: 'ai_chat',
        content,
      });
      
      return true;
    }
    
    return false;
  }, [useWs, sendJsonMessage, wsStatus]);
  
  // Function to send a message via HTTP API
  const sendMessageHttp = useCallback(async (content: string) => {
    try {
      // Add user message to state
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      
      // Get conversation history for context
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));
      
      // Send request to API
      const response = await apiRequest(
        'POST',
        '/api/ai-chat',
        {
          message: content,
          conversationHistory,
        }
      );
      
      // Parse response
      const responseData = await response.json();
      
      // Handle response
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: responseData.message,
        timestamp: responseData.timestamp,
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      return true;
    } catch (error) {
      setIsLoading(false);
      if (onError && error instanceof Error) {
        onError(error);
      }
      return false;
    }
  }, [messages, onError]);
  
  // Send a message using the preferred method (WebSocket or HTTP)
  const sendMessage = useCallback((content: string) => {
    if (content.trim() === '') {
      return false;
    }
    
    if (useWs && wsStatus === 'open') {
      return sendMessageWs(content);
    } else {
      return sendMessageHttp(content);
    }
  }, [useWs, wsStatus, sendMessageWs, sendMessageHttp]);
  
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);
  
  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    connectionStatus: useWs ? wsStatus : 'http',
  };
}
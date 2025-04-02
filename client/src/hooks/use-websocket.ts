import { useState, useEffect, useRef, useCallback } from 'react';

interface WebSocketOptions {
  onOpen?: (event: WebSocketEventMap['open']) => void;
  onMessage?: (event: WebSocketEventMap['message']) => void;
  onClose?: (event: WebSocketEventMap['close']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
  reconnectInterval?: number;
  reconnectAttempts?: number;
  shouldReconnect?: boolean;
}

type WebSocketStatus = 'connecting' | 'open' | 'closing' | 'closed';

export function useWebSocket(url: string, options: WebSocketOptions = {}) {
  const {
    onOpen,
    onMessage,
    onClose,
    onError,
    reconnectInterval = 3000,
    reconnectAttempts = 5,
    shouldReconnect = true,
  } = options;

  const [status, setStatus] = useState<WebSocketStatus>('connecting');
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const shouldReconnectRef = useRef(shouldReconnect);

  // Update the ref when the prop changes
  useEffect(() => {
    shouldReconnectRef.current = shouldReconnect;
  }, [shouldReconnect]);

  const connectWebSocket = useCallback(() => {
    // Close existing socket if it exists
    if (socketRef.current) {
      socketRef.current.close();
    }

    // Create the WebSocket connection
    socketRef.current = new WebSocket(url);
    setStatus('connecting');

    // Setup event handlers
    socketRef.current.onopen = (event) => {
      setStatus('open');
      reconnectCountRef.current = 0;
      if (onOpen) onOpen(event);
    };

    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
      if (onMessage) onMessage(event);
    };

    socketRef.current.onclose = (event) => {
      setStatus('closed');
      if (onClose) onClose(event);

      // Attempt to reconnect if enabled and not exceeding max attempts
      if (
        shouldReconnectRef.current &&
        (reconnectAttempts === -1 || reconnectCountRef.current < reconnectAttempts)
      ) {
        reconnectCountRef.current++;
        setTimeout(connectWebSocket, reconnectInterval);
      }
    };

    socketRef.current.onerror = (event) => {
      if (onError) onError(event);
    };
  }, [url, onOpen, onMessage, onClose, onError, reconnectInterval, reconnectAttempts]);

  // Initial connection
  useEffect(() => {
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectWebSocket]);

  // Send a message through the WebSocket
  const sendMessage = useCallback((data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    if (socketRef.current && status === 'open') {
      socketRef.current.send(data);
      return true;
    }
    return false;
  }, [status]);

  // Send a JSON message through the WebSocket
  const sendJsonMessage = useCallback((data: any) => {
    return sendMessage(JSON.stringify(data));
  }, [sendMessage]);

  // Close the connection
  const closeConnection = useCallback(() => {
    shouldReconnectRef.current = false;
    if (socketRef.current) {
      socketRef.current.close();
    }
  }, []);

  // Reconnect
  const reconnect = useCallback(() => {
    shouldReconnectRef.current = true;
    reconnectCountRef.current = 0;
    connectWebSocket();
  }, [connectWebSocket]);

  return {
    status,
    messages,
    sendMessage,
    sendJsonMessage,
    closeConnection,
    reconnect,
  };
}

export function useChatWebSocket(userId?: number, username?: string) {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${protocol}//${window.location.host}/ws`;
  
  // Configure and connect to WebSocket
  const { status, sendJsonMessage, messages } = useWebSocket(wsUrl, {
    shouldReconnect: true,
    reconnectInterval: 3000,
    reconnectAttempts: -1, // Unlimited attempts
  });
  
  // Store parsed chat messages
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  
  // Parse incoming messages
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      try {
        const parsedMessage = JSON.parse(latestMessage);
        if (parsedMessage.type === 'chat') {
          setChatMessages((prev) => [...prev, parsedMessage]);
        }
      } catch (error) {
        console.error('Error parsing chat message:', error);
      }
    }
  }, [messages]);
  
  // Authenticate with WebSocket when connected and user info is available
  useEffect(() => {
    if (status === 'open' && userId && username) {
      sendJsonMessage({
        type: 'auth',
        userId,
        username,
      });
    }
  }, [status, userId, username, sendJsonMessage]);

  // Send a chat message
  const sendChatMessage = useCallback((roomId: number, content: string) => {
    if (status === 'open' && userId) {
      return sendJsonMessage({
        type: 'chat',
        roomId,
        content,
      });
    }
    return false;
  }, [status, userId, sendJsonMessage]);

  return {
    isConnected: status === 'open',
    isAuthenticated: !!userId,
    chatMessages,
    sendChatMessage,
  };
}
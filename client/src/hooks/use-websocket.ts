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
  const [reconnectCount, setReconnectCount] = useState(0);

  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Connect to WebSocket
  const connect = useCallback(() => {
    // Close existing connection if any
    if (ws.current) {
      ws.current.close();
    }

    // Determine full WebSocket URL
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const fullUrl = url.startsWith('ws') ? url : `${protocol}//${window.location.host}${url}`;

    // Create new WebSocket connection
    const socket = new WebSocket(fullUrl);
    ws.current = socket;
    setStatus('connecting');

    // Handle WebSocket events
    socket.onopen = (event) => {
      setStatus('open');
      setReconnectCount(0);
      if (onOpen) onOpen(event);
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
      if (onMessage) onMessage(event);
    };

    socket.onclose = (event) => {
      setStatus('closed');
      if (onClose) onClose(event);

      // Attempt to reconnect if enabled
      if (shouldReconnect && reconnectCount < reconnectAttempts) {
        reconnectTimeoutRef.current = setTimeout(() => {
          setReconnectCount((prev) => prev + 1);
          connect();
        }, reconnectInterval);
      }
    };

    socket.onerror = (event) => {
      if (onError) onError(event);
      socket.close();
    };
  }, [
    url,
    onOpen,
    onMessage,
    onClose,
    onError,
    reconnectInterval,
    reconnectAttempts,
    shouldReconnect,
    reconnectCount,
  ]);

  // Initialize connection
  useEffect(() => {
    connect();

    // Cleanup function
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  // Send message function
  const sendMessage = useCallback(
    (message: string) => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(message);
        return true;
      }
      return false;
    },
    []
  );

  // Send JSON message function
  const sendJsonMessage = useCallback(
    (data: any) => {
      return sendMessage(JSON.stringify(data));
    },
    [sendMessage]
  );

  return {
    status,
    messages,
    sendMessage,
    sendJsonMessage,
    reconnectCount,
  };
}

/**
 * Hook specifically designed for chat functionality
 */
export function useChatWebSocket(userId?: number, username?: string) {
  const { 
    status, 
    messages, 
    sendJsonMessage 
  } = useWebSocket('/ws', {
    onOpen: () => {
      // Authenticate if user info is available
      if (userId && username) {
        sendJsonMessage({
          type: 'auth',
          userId,
          username,
        });
      }
    },
  });

  const sendChatMessage = useCallback(
    (roomId: number, content: string) => {
      if (status === 'open') {
        return sendJsonMessage({
          type: 'chat',
          roomId,
          content,
        });
      }
      return false;
    },
    [status, sendJsonMessage]
  );

  return {
    status,
    messages,
    sendChatMessage,
  };
}
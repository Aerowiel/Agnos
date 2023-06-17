interface ChatMessage {
  type: string;
  timestamp: string;
  username: string;
  message?: string;
}

export type { ChatMessage };

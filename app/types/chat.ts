interface ChatMessageBase {
  type: string;
  timestamp: string;
  message: string;
}

interface SystemMessage extends ChatMessageBase {}

interface UserMessage extends ChatMessageBase {
  username: string;
}

export type { SystemMessage, UserMessage };

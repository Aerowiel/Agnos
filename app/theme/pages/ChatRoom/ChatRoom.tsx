import classNames from "classnames";
import {
  KeyboardEvent,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChatMessage } from "~/types/chat";
import { wsContext } from "~/ws-context";

const MESSAGE_MAX_LENGTH = 300;

const timesampToHumanTime = (timestamp: string): string => {
  const date = new Date(Number(timestamp));
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const humanTime = `${hours}:${minutes}`;

  return humanTime;
};

const ChatMessagePrefix = ({
  isSystem,
  username,
  timestamp,
}: {
  isSystem?: boolean;
  username: string;
  timestamp?: string;
}) => {
  return (
    <>
      {timestamp && (
        <>
          {"["}
          <span className="chat-message-prefix__time">
            {timesampToHumanTime(timestamp)}
          </span>
          {"]"}&nbsp;
        </>
      )}
      <span
        className={classNames("chat-message-prefix__username", {
          "chat-message-prefix__username--system": isSystem,
        })}
      >
        {username}
      </span>
      <span className="chat-message-prefix__chars">&nbsp;$&nbsp;</span>
    </>
  );
};

const SendMessageAction = ({
  inputRef,
  username,
  sendMessage,
}: {
  inputRef: RefObject<HTMLTextAreaElement>;
  username: string;
  sendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="send-message-action">
      <ChatMessagePrefix username={username} />
      <textarea
        onKeyDown={handleKeyDown}
        ref={inputRef}
        rows={1}
        required
        autoFocus
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        maxLength={MESSAGE_MAX_LENGTH}
      />
    </div>
  );
};

const ChatMessage = ({
  isSystem,
  timestamp,
  username,
  message,
}: {
  isSystem?: boolean;
  timestamp: string;
  username: string;
  message?: string;
}) => {
  return (
    <div className="chat-message">
      <ChatMessagePrefix
        isSystem={isSystem}
        username={username}
        timestamp={timestamp}
      />
      <span className="chat-message__message">{message}</span>
    </div>
  );
};

const useChatRoom = ({
  chatId,
  username,
}: {
  chatId: string;
  username: string;
}) => {
  let socket = useContext(wsContext);

  const messagesBottomAnchor = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = (message: string) => {
    if (!socket || !message) {
      return;
    }

    socket.emit("message", { message, chatId });
  };

  const handleUpdateMessages = (newChatMessage: ChatMessage) => {
    setMessages((messages) => [...messages, ...[newChatMessage]]);
  };

  useEffect(() => {
    if (!socket || !chatId) return;
    socket.emit("user-joined", { chatId, username });

    socket.on("user-joined", ({ timestamp, username }) => {
      handleUpdateMessages({ type: "user-joined", timestamp, username });
    });

    socket.on("user-left", ({ timestamp, username }) => {
      handleUpdateMessages({ type: "user-left", timestamp, username });
    });

    socket.on("message", ({ timestamp, username, message }) => {
      handleUpdateMessages({ type: "message", timestamp, username, message });
    });
  }, [socket, chatId]);

  useEffect(() => {
    if (messagesBottomAnchor.current) {
      messagesBottomAnchor.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [messages]);

  return { messagesBottomAnchor, messages, handleSendMessage };
};

const ChatRoom = ({
  chatId,
  username,
}: {
  chatId: string;
  username: string;
}) => {
  const { messagesBottomAnchor, messages, handleSendMessage } = useChatRoom({
    chatId,
    username,
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="chat-room" onClick={handleFocusInput}>
      <div className="chat-room__messages">
        {messages.map((message) => {
          if (message.type === "user-joined") {
            return (
              <ChatMessage
                isSystem
                timestamp={message.timestamp}
                username="System"
                message={`${message.username} joined the room`}
              />
            );
          }

          if (message.type === "user-left") {
            return (
              <ChatMessage
                isSystem
                timestamp={message.timestamp}
                username="System"
                message={`${message.username} left the room`}
              />
            );
          }

          if (message.type === "message") {
            return (
              <ChatMessage
                timestamp={message.timestamp}
                username={message.username}
                message={message.message}
              />
            );
          }
        })}
        <div ref={messagesBottomAnchor} />
      </div>
      <SendMessageAction
        inputRef={inputRef}
        username={username}
        sendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatRoom;

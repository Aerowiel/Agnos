import classNames from "classnames";
import {
  KeyboardEvent,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserMessage, SystemMessage } from "~/types/chat";
import sanitizeHtml from "~/utils/sanitizeHtml";
import { wsContext } from "~/ws-context";

const NOELSHACK_URL = "https://image.noelshack.com/";

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
        rows={2}
        required
        autoFocus
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        maxLength={300}
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
  message: string;
}) => {
  return (
    <div className="chat-message">
      <ChatMessagePrefix
        isSystem
        username={isSystem ? "System" : username}
        timestamp={timestamp}
      />
      <span
        className="chat-message__message"
        dangerouslySetInnerHTML={sanitizeHtml(message)}
      />
    </div>
  );
};

const ChatSystemMessage = ({
  timestamp,
  message,
}: Omit<SystemMessage, "type">) => {
  return (
    <ChatMessage
      isSystem
      timestamp={timestamp}
      username="System"
      message={message}
    />
  );
};

const ChatUserMessage = ({
  timestamp,
  message,
  username,
}: Omit<UserMessage, "type">) => {
  const applyFormatting = (message: string): string | any => {
    const noelshackRegex = new RegExp(
      "(https://(image|www).noelshack.com/(fichiers|minis)/[0-9]*/[0-9]*/[0-9]*/[a-zA-Z0-9-]*.(png|jpg))",
      "gm"
    );

    if (message.match(noelshackRegex)) {
      message = message.replaceAll(
        noelshackRegex,
        '<img class="noelshack-image" src=$1 />'
      );
    }

    return message;
  };

  return (
    <ChatMessage
      timestamp={timestamp}
      username={username}
      message={applyFormatting(message)}
    />
  );
};

const UsersTooltip = ({ users }: { users?: string[] }) => {
  if (!users?.length) {
    return null;
  }

  return (
    <div className="users-tooltip">
      {users.map((user) => (
        <div>{user}</div>
      ))}
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
  const [messages, setMessages] = useState<(SystemMessage | UserMessage)[]>([]);
  const [users, setUsers] = useState([]);

  const handleSendMessage = (message: string) => {
    if (!socket || !message) {
      return;
    }

    socket.emit("message", { message, chatId });
  };

  const handleUpdateMessages = (
    newChatMessage: SystemMessage | UserMessage
  ) => {
    setMessages((messages) => [...messages, ...[newChatMessage]]);
  };

  useEffect(() => {
    if (!socket || !chatId) return;
    socket.emit("user-joined", { chatId, username });

    socket.on("user-joined", ({ timestamp, message, connectedUsers }) => {
      handleUpdateMessages({ type: "system", timestamp, message });
      setUsers(connectedUsers);
    });

    socket.on("user-left", ({ timestamp, message, connectedUsers }) => {
      handleUpdateMessages({ type: "system", timestamp, message });
      setUsers(connectedUsers);
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

  return { messagesBottomAnchor, messages, handleSendMessage, users };
};

const ChatRoom = ({
  chatId,
  username,
}: {
  chatId: string;
  username: string;
}) => {
  const { messagesBottomAnchor, messages, handleSendMessage, users } =
    useChatRoom({
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
          if (message.type === "system") {
            return (
              <ChatSystemMessage
                timestamp={message.timestamp}
                message={message.message}
              />
            );
          }

          /* Way to discriminate an UserMessage from a SystemMessage */
          if ("username" in message) {
            return (
              <ChatUserMessage
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
      <UsersTooltip users={users} />
    </div>
  );
};

export default ChatRoom;

import { Form, useSearchParams } from "@remix-run/react";
import Button from "~/theme/components/Button";
import Input from "~/theme/components/Form/Input";
import Logo from "~/theme/components/Logo";

const JoinChat = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  return (
    <div className="join-chat">
      <Logo />
      <div className="join-chat__title">
        {chatId && (
          <>
            Join&nbsp;<b>{chatId}</b>
          </>
        )}
      </div>
      <Form method="post">
        <Input
          required
          autoFocus
          id="username"
          name="username"
          type="text"
          defaultValue="Anonymous"
          label="Username"
          maxLength={20}
        />

        {chatId ? (
          <>
            <input type="hidden" name="chat-id" value={chatId} />
            <input type="hidden" name="_action" value="join-existing-chat" />
          </>
        ) : (
          <input type="hidden" name="_action" value="create-new-chat" />
        )}
        <Button type="submit">
          {chatId ? "Join" : "Create new chat room"}
        </Button>
      </Form>
    </div>
  );
};

export default JoinChat;

import { ActionArgs, V2_MetaFunction, redirect } from "@remix-run/node";
import { json } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { createUserSession } from "~/session.server";
import JoinChat from "~/theme/pages/JoinChat";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Agnos" },
    { name: "description", content: "Agnos, anonymous chat" },
  ];
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const action = formData.get("_action") as string;
  const username = formData.get("username") as string;
  const trimmedUsername = username.substring(20, 0);

  switch (action) {
    case "create-new-chat":
      const randomChatId = uuidv4();
      return createUserSession({
        request,
        chatId: randomChatId,
        username: trimmedUsername,
      });
    case "join-existing-chat":
      const chatId = formData.get("chat-id") as string;
      if (!chatId) {
        return redirect("/");
      }
      return createUserSession({ request, chatId, username: trimmedUsername });
    default:
      return json("unrecognized action: ", { status: 400 });
  }
};

const IndexRoute = () => {
  return <JoinChat />;
};

export default IndexRoute;

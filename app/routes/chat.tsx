import { LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSessionUsername } from "~/session.server";
import ChatRoom from "~/theme/pages/ChatRoom";
import uuidValidateV4 from "~/utils/uuidValidateV4";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get("id");

  if (!chatId) {
    return redirect("/");
  }

  const isValidUuidV4 = uuidValidateV4(chatId);

  if (!isValidUuidV4) {
    return redirect("/");
  }

  const username = await getSessionUsername(request, chatId);

  if (!username) {
    return redirect(`/?chatId=${chatId}`);
  }

  return { chatId, username };
}

const ChatRoomRoute = () => {
  const { chatId, username } = useLoaderData<{
    chatId: string;
    username: string;
  }>();

  return <ChatRoom chatId={chatId} username={username} />;
};

export default ChatRoomRoute;

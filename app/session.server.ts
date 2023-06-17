import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function createUserSession({
  request,
  chatId,
  username,
}: {
  request: Request;
  chatId: string;
  username: String;
}) {
  const session = await getSession(request);
  session.set(chatId, username);
  return redirect(`/chat?id=${chatId}`, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }),
    },
  });
}

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");

  const session = await sessionStorage.getSession(cookie);

  return session;
}

export async function getSessionUsername(request: Request, chatId: string) {
  const session = await getSession(request);

  return session.get(chatId);
}

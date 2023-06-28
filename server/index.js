const path = require("path");

const { createRequestHandler } = require("@remix-run/express");
const { installGlobals } = require("@remix-run/node");
const { createServer } = require("http");
const { Server } = require("socket.io");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");

installGlobals();

const BUILD_DIR = path.join(process.cwd(), "build");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

const chatRooms = {};

// then list to the connection event and get a socket object
io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.on("user-joined", ({ chatId, username }) => {
    console.log(`[${socket.id}] ${username} joined ${chatId}`);
    socket.join(chatId);
    socket.username = username;
    socket.chatId = chatId;

    if (!chatRooms[chatId]) {
      chatRooms[chatId] = { users: { [socket.id]: username } };
    } else {
      chatRooms[chatId].users[socket.id] = username;
    }

    io.to(chatId).emit("user-joined", {
      timestamp: Date.now(),
      message: `${username} joined the room.`,
      connectedUsers: Object.keys(chatRooms[chatId].users).map(
        (userId) => chatRooms[chatId].users[userId]
      ),
    });
  });

  socket.on("message", ({ message }) => {
    console.log(
      `[${socket.id}]${socket.username} sent "${message}" to ${socket.chatId}`
    );

    const trimmedMessage = message.substring(0, 300);
    io.to(socket.chatId).emit("message", {
      timestamp: Date.now(),
      username: socket.username,
      message: trimmedMessage,
    });
  });

  socket.on("disconnect", () => {
    console.log(
      `${socket.id} disconnected ${
        socket.chatId ? `from ${socket.chatId}` : ""
      }`
    );

    if (socket.chatId) {
      if (chatRooms[socket.chatId]) {
        delete chatRooms[socket.chatId].users[socket.id];

        if (Object.keys(chatRooms[socket.chatId].users).length === 0) {
          delete chatRooms[socket.chatId];
        }
      }

      io.to(socket.chatId).emit("user-left", {
        timestamp: Date.now(),
        message: `${socket.username} left the room.`,
        connectedUsers: chatRooms[socket.chatId]
          ? Object.keys(chatRooms[socket.chatId].users).map(
              (userId) => chatRooms[socket.chatId].users[userId]
            )
          : [],
      });
    }
  });
});

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? (req, res, next) => {
        purgeRequireCache();

        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        })(req, res, next);
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV,
      })
);
const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}

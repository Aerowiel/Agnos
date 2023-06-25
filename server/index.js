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

// then list to the connection event and get a socket object
io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.on("user-joined", ({ chatId, username }) => {
    console.log(`${socket.id} joined ${chatId}`);
    socket.join(chatId);
    socket.username = username;
    socket.chatId = chatId;

    io.to(chatId).emit("user-joined", { timestamp: Date.now(), username });
  });

  socket.on("message", ({ message }) => {
    console.log(`${socket.id} sent a new message to ${socket.chatId}`);
    io.to(socket.chatId).emit("message", {
      timestamp: Date.now(),
      username: socket.username,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected from ${socket.chatId}`);
    io.to(socket.chatId).emit("user-left", {
      timestamp: Date.now(),
      username: socket.username,
    });
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

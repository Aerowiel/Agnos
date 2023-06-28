var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("node:stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 48,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 97,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
var import_react3 = require("@remix-run/react"), import_react4 = require("react"), import_socket = require("socket.io-client");

// app/styles/main.css
var main_default = "/build/_assets/main-DROGQ2BH.css";

// app/theme/layouts/GenericLayout/GenericLayout.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), GenericLayout = ({ children }) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "generic-layout", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "generic-layout__content", children }, void 0, !1, {
  fileName: "app/theme/layouts/GenericLayout/GenericLayout.tsx",
  lineNumber: 6,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/theme/layouts/GenericLayout/GenericLayout.tsx",
  lineNumber: 5,
  columnNumber: 5
}, this), GenericLayout_default = GenericLayout;

// app/ws-context.tsx
var import_react2 = require("react"), wsContext = (0, import_react2.createContext)(void 0);

// app/root.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), links = () => [
  {
    rel: "stylesheet",
    href: main_default
  }
];
function App() {
  let [socket, setSocket] = (0, import_react4.useState)();
  return (0, import_react4.useEffect)(() => {
    let connection = (0, import_socket.connect)();
    return setSocket(connection), () => {
      connection.close();
    };
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(wsContext.Provider, { value: socket, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(GenericLayout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action,
  default: () => index_default,
  meta: () => meta
});
var import_node3 = require("@remix-run/node"), import_react_router = require("react-router"), import_uuid = require("uuid");

// app/session.server.ts
var import_node2 = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
});
async function createUserSession({
  request,
  chatId,
  username
}) {
  let session = await getSession(request);
  return session.set(chatId, username), (0, import_node2.redirect)(`/chat?id=${chatId}`, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7
        // 7 days
      })
    }
  });
}
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return await sessionStorage.getSession(cookie);
}
async function getSessionUsername(request, chatId) {
  return (await getSession(request)).get(chatId);
}

// app/theme/pages/JoinChat/JoinChat.tsx
var import_react5 = require("@remix-run/react");

// app/theme/components/Button/Button.tsx
var import_classnames = __toESM(require("classnames")), import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function Button({
  children,
  appearance,
  className,
  ...buttonProps
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    "button",
    {
      ...buttonProps,
      className: (0, import_classnames.default)("button", {
        ...appearance ? { [`button--${appearance}`]: !0 } : null,
        ...className ? { [className]: !0 } : {}
      }),
      children
    },
    void 0,
    !1,
    {
      fileName: "app/theme/components/Button/Button.tsx",
      lineNumber: 17,
      columnNumber: 5
    },
    this
  );
}

// app/theme/components/Form/InputWrapper/InputWrapper.tsx
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), InputWrapper = ({ label, error, children }) => /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "input-wrapper", children: [
  label ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("label", { className: "input-wrapper__label", children: label }, void 0, !1, {
    fileName: "app/theme/components/Form/InputWrapper/InputWrapper.tsx",
    lineNumber: 10,
    columnNumber: 16
  }, this) : null,
  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "input-wrapper__input", children }, void 0, !1, {
    fileName: "app/theme/components/Form/InputWrapper/InputWrapper.tsx",
    lineNumber: 11,
    columnNumber: 7
  }, this),
  error ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "input-wrapper__error", children: error }, void 0, !1, {
    fileName: "app/theme/components/Form/InputWrapper/InputWrapper.tsx",
    lineNumber: 12,
    columnNumber: 16
  }, this) : null
] }, void 0, !0, {
  fileName: "app/theme/components/Form/InputWrapper/InputWrapper.tsx",
  lineNumber: 9,
  columnNumber: 5
}, this), InputWrapper_default = InputWrapper;

// app/theme/components/Form/Input/Input.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), Input = ({ label, error, ...inputProps }) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(InputWrapper_default, { label, error, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", { ...inputProps, className: "input", spellCheck: !1 }, void 0, !1, {
  fileName: "app/theme/components/Form/Input/Input.tsx",
  lineNumber: 12,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/theme/components/Form/Input/Input.tsx",
  lineNumber: 11,
  columnNumber: 5
}, this), Input_default = Input;

// app/theme/components/Logo/Logo.tsx
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), Logo = () => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "logo", children: `
  \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2557   \u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557
 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D \u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D
 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2588\u2557\u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557
 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551
 \u2588\u2588\u2551  \u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551
           ` }, void 0, !1, {
  fileName: "app/theme/components/Logo/Logo.tsx",
  lineNumber: 3,
  columnNumber: 5
}, this), Logo_default = Logo;

// app/theme/pages/JoinChat/JoinChat.tsx
var import_jsx_dev_runtime8 = require("react/jsx-dev-runtime"), JoinChat = () => {
  let [searchParams] = (0, import_react5.useSearchParams)(), chatId = searchParams.get("chatId");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "join-chat", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Logo_default, {}, void 0, !1, {
      fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "join-chat__title", children: chatId && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_jsx_dev_runtime8.Fragment, { children: [
      "Join\xA0",
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("b", { children: chatId }, void 0, !1, {
        fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
        lineNumber: 16,
        columnNumber: 23
      }, this)
    ] }, void 0, !0, {
      fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
      lineNumber: 15,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react5.Form, { method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
        Input_default,
        {
          required: !0,
          autoFocus: !0,
          id: "username",
          name: "username",
          type: "text",
          label: "Username",
          maxLength: 20
        },
        void 0,
        !1,
        {
          fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
          lineNumber: 21,
          columnNumber: 9
        },
        this
      ),
      chatId ? /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_jsx_dev_runtime8.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("input", { type: "hidden", name: "chat-id", value: chatId }, void 0, !1, {
          fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
          lineNumber: 33,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("input", { type: "hidden", name: "_action", value: "join-existing-chat" }, void 0, !1, {
          fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
          lineNumber: 34,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("input", { type: "hidden", name: "_action", value: "create-new-chat" }, void 0, !1, {
        fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
        lineNumber: 37,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Button, { type: "submit", children: chatId ? "Join" : "Create new chat room" }, void 0, !1, {
        fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/theme/pages/JoinChat/JoinChat.tsx",
    lineNumber: 11,
    columnNumber: 5
  }, this);
}, JoinChat_default = JoinChat;

// app/routes/_index.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), meta = () => [
  { title: "Agnos" },
  { name: "description", content: "Agnos, anonymous chat" }
], action = async ({ request }) => {
  let formData = await request.formData(), action2 = formData.get("_action"), trimmedUsername = formData.get("username").substring(0, 20);
  switch (action2) {
    case "create-new-chat":
      let randomChatId = (0, import_uuid.v4)();
      return createUserSession({
        request,
        chatId: randomChatId,
        username: trimmedUsername
      });
    case "join-existing-chat":
      let chatId = formData.get("chat-id");
      return chatId ? createUserSession({ request, chatId, username: trimmedUsername }) : (0, import_node3.redirect)("/");
    default:
      return (0, import_react_router.json)("unrecognized action: ", { status: 400 });
  }
}, IndexRoute = () => /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(JoinChat_default, {}, void 0, !1, {
  fileName: "app/routes/_index.tsx",
  lineNumber: 40,
  columnNumber: 10
}, this), index_default = IndexRoute;

// app/routes/chat.tsx
var chat_exports = {};
__export(chat_exports, {
  default: () => chat_default,
  loader: () => loader
});
var import_node4 = require("@remix-run/node"), import_react7 = require("@remix-run/react");

// app/theme/pages/ChatRoom/ChatRoom.tsx
var import_classnames2 = __toESM(require("classnames")), import_react6 = require("react");

// app/utils/sanitizeHtml.ts
var import_sanitize_html = __toESM(require("sanitize-html")), sanitizeHtmlOptions = {
  allowedTags: ["img"],
  allowedAttributes: {
    img: ["src", "class"]
  },
  allowedIframeHostnames: ["noelshack.com"]
}, sanitizeHtml = (html) => ({ __html: (0, import_sanitize_html.default)(html, sanitizeHtmlOptions) }), sanitizeHtml_default = sanitizeHtml;

// app/theme/pages/ChatRoom/ChatRoom.tsx
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime");
var timesampToHumanTime = (timestamp) => {
  let date = new Date(Number(timestamp)), hours = String(date.getHours()).padStart(2, "0"), minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}, ChatMessagePrefix = ({
  isSystem,
  username,
  timestamp
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_jsx_dev_runtime10.Fragment, { children: [
  timestamp && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_jsx_dev_runtime10.Fragment, { children: [
    "[",
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { className: "chat-message-prefix__time", children: timesampToHumanTime(timestamp) }, void 0, !1, {
      fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
      lineNumber: 41,
      columnNumber: 11
    }, this),
    "]",
    "\xA0"
  ] }, void 0, !0, {
    fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
    lineNumber: 39,
    columnNumber: 9
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
    "span",
    {
      className: (0, import_classnames2.default)("chat-message-prefix__username", {
        "chat-message-prefix__username--system": isSystem
      }),
      children: username
    },
    void 0,
    !1,
    {
      fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
      lineNumber: 47,
      columnNumber: 7
    },
    this
  ),
  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { className: "chat-message-prefix__chars", children: "\xA0$\xA0" }, void 0, !1, {
    fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
    lineNumber: 54,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
  lineNumber: 37,
  columnNumber: 5
}, this), SendMessageAction = ({
  inputRef,
  username,
  sendMessage
}) => {
  let [message, setMessage] = (0, import_react6.useState)("");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "send-message-action", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(ChatMessagePrefix, { username }, void 0, !1, {
      fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
      lineNumber: 80,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
      "textarea",
      {
        onKeyDown: (event) => {
          event.key === "Enter" && (event.preventDefault(), sendMessage(message), setMessage(""));
        },
        ref: inputRef,
        rows: 2,
        required: !0,
        autoFocus: !0,
        value: message,
        onChange: (event) => {
          setMessage(event.target.value);
        },
        maxLength: 300
      },
      void 0,
      !1,
      {
        fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
        lineNumber: 81,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
    lineNumber: 79,
    columnNumber: 5
  }, this);
}, ChatMessage = ({
  isSystem,
  timestamp,
  username,
  message
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "chat-message", children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
    ChatMessagePrefix,
    {
      isSystem: !0,
      username: isSystem ? "System" : username,
      timestamp
    },
    void 0,
    !1,
    {
      fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
      lineNumber: 110,
      columnNumber: 7
    },
    this
  ),
  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
    "span",
    {
      className: "chat-message__message",
      dangerouslySetInnerHTML: sanitizeHtml_default(message)
    },
    void 0,
    !1,
    {
      fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
      lineNumber: 115,
      columnNumber: 7
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
  lineNumber: 109,
  columnNumber: 5
}, this), ChatSystemMessage = ({
  timestamp,
  message
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
  ChatMessage,
  {
    isSystem: !0,
    timestamp,
    username: "System",
    message
  },
  void 0,
  !1,
  {
    fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
    lineNumber: 128,
    columnNumber: 5
  },
  this
), ChatUserMessage = ({
  timestamp,
  message,
  username
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
  ChatMessage,
  {
    timestamp,
    username,
    message: ((message2) => {
      let noelshackRegex = new RegExp(
        "(https://(image|www).noelshack.com/(fichiers|minis)/[0-9]*/[0-9]*/[0-9]*/[a-zA-Z0-9-]*.(png|jpg))",
        "gm"
      );
      return message2.match(noelshackRegex) && (message2 = message2.replaceAll(
        noelshackRegex,
        '<img class="noelshack-image" src=$1 />'
      )), message2;
    })(message)
  },
  void 0,
  !1,
  {
    fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
    lineNumber: 159,
    columnNumber: 5
  },
  this
), UsersTooltip = ({ users }) => users != null && users.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "users-tooltip", children: users.map((user) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: user }, void 0, !1, {
  fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
  lineNumber: 175,
  columnNumber: 9
}, this)) }, void 0, !1, {
  fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
  lineNumber: 173,
  columnNumber: 5
}, this) : null, useChatRoom = ({
  chatId,
  username
}) => {
  let socket = (0, import_react6.useContext)(wsContext), messagesBottomAnchor = (0, import_react6.useRef)(null), [messages, setMessages] = (0, import_react6.useState)([]), [users, setUsers] = (0, import_react6.useState)([]), handleSendMessage = (message) => {
    !socket || !message || socket.emit("message", { message, chatId });
  }, handleUpdateMessages = (newChatMessage) => {
    setMessages((messages2) => [...messages2, newChatMessage]);
  };
  return (0, import_react6.useEffect)(() => {
    !socket || !chatId || (socket.emit("user-joined", { chatId, username }), socket.on("user-joined", ({ timestamp, message, connectedUsers }) => {
      handleUpdateMessages({ type: "system", timestamp, message }), setUsers(connectedUsers);
    }), socket.on("user-left", ({ timestamp, message, connectedUsers }) => {
      handleUpdateMessages({ type: "system", timestamp, message }), setUsers(connectedUsers);
    }), socket.on("message", ({ timestamp, username: username2, message }) => {
      handleUpdateMessages({ type: "message", timestamp, username: username2, message });
    }));
  }, [socket, chatId]), (0, import_react6.useEffect)(() => {
    messagesBottomAnchor.current && messagesBottomAnchor.current.scrollIntoView({
      block: "nearest",
      behavior: "smooth"
    });
  }, [messages]), { messagesBottomAnchor, messages, handleSendMessage, users };
}, ChatRoom = ({
  chatId,
  username
}) => {
  let { messagesBottomAnchor, messages, handleSendMessage, users } = useChatRoom({
    chatId,
    username
  }), inputRef = (0, import_react6.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "chat-room", onClick: () => {
    inputRef.current && inputRef.current.focus();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "chat-room__messages", children: [
      messages.map((message) => {
        if (message.type === "system")
          return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
            ChatSystemMessage,
            {
              timestamp: message.timestamp,
              message: message.message
            },
            void 0,
            !1,
            {
              fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
              lineNumber: 266,
              columnNumber: 15
            },
            this
          );
        if ("username" in message)
          return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
            ChatUserMessage,
            {
              timestamp: message.timestamp,
              username: message.username,
              message: message.message
            },
            void 0,
            !1,
            {
              fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
              lineNumber: 276,
              columnNumber: 15
            },
            this
          );
      }),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { ref: messagesBottomAnchor }, void 0, !1, {
        fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
        lineNumber: 284,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
      lineNumber: 262,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
      SendMessageAction,
      {
        inputRef,
        username,
        sendMessage: handleSendMessage
      },
      void 0,
      !1,
      {
        fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
        lineNumber: 286,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(UsersTooltip, { users }, void 0, !1, {
      fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
      lineNumber: 291,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/theme/pages/ChatRoom/ChatRoom.tsx",
    lineNumber: 261,
    columnNumber: 5
  }, this);
}, ChatRoom_default = ChatRoom;

// app/utils/uuidValidateV4.ts
var import_uuid2 = require("uuid"), import_uuid3 = require("uuid"), uuidValidateV4 = (uuid) => (0, import_uuid3.validate)(uuid) && (0, import_uuid2.version)(uuid) === 4, uuidValidateV4_default = uuidValidateV4;

// app/routes/chat.tsx
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime");
async function loader({ request }) {
  let chatId = new URL(request.url).searchParams.get("id");
  if (!chatId)
    return (0, import_node4.redirect)("/");
  if (!uuidValidateV4_default(chatId))
    return (0, import_node4.redirect)("/");
  let username = await getSessionUsername(request, chatId);
  return username ? { chatId, username } : (0, import_node4.redirect)(`/?chatId=${chatId}`);
}
var ChatRoomRoute = () => {
  let { chatId, username } = (0, import_react7.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(ChatRoom_default, { chatId, username }, void 0, !1, {
    fileName: "app/routes/chat.tsx",
    lineNumber: 36,
    columnNumber: 10
  }, this);
}, chat_default = ChatRoomRoute;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-5EMJK6RE.js", imports: ["/build/_shared/chunk-LHCNBYRQ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-XZVSN76O.js", imports: ["/build/_shared/chunk-3EUIMNC5.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-JBFHHLZM.js", imports: ["/build/_shared/chunk-I5Y6BFS2.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/chat": { id: "routes/chat", parentId: "root", path: "chat", index: void 0, caseSensitive: void 0, module: "/build/routes/chat-UX2MDXET.js", imports: ["/build/_shared/chunk-I5Y6BFS2.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "98fe7bf5", hmr: void 0, url: "/build/manifest-98FE7BF5.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_headers: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/chat": {
    id: "routes/chat",
    parentId: "root",
    path: "chat",
    index: void 0,
    caseSensitive: void 0,
    module: chat_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map

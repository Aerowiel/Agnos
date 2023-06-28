import originalSanitizeHtml from "sanitize-html";

const sanitizeHtmlOptions = {
  allowedTags: ["img"],
  allowedAttributes: {
    img: ["src", "class"],
  },
  allowedIframeHostnames: ["noelshack.com"],
};

const sanitizeHtml = (html: string): { __html: string } => {
  return { __html: originalSanitizeHtml(html, sanitizeHtmlOptions) };
};

export default sanitizeHtml;

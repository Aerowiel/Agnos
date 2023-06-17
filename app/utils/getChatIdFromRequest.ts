const getChatIdFromRequest = (request: Request) => {
  return request?.url?.split("/")?.at(-1);
};

export default getChatIdFromRequest;

export const uuid = () => {
  const today = new Date();
  const head = today.getTime().toString(36);
  const tail = Math.random().toString(36);

  return head + tail;
};

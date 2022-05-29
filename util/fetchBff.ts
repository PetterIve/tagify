export const fetchBff = (url: string) => {
  return fetch(url).then((res) => res.json());
};

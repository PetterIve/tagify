import { localStorageAccessToken } from "./localStorage";

export const fetchBff = ({ url }: { url: string }) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorageAccessToken.get()}`,
    },
  }).then((res) => res.json());
};

export const postBff = ({ url, data }: { url: string; data: any }) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${localStorageAccessToken.get()}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

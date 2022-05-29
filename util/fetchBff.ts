export const fetchBff = (url: string) => {
  return fetch(url).then((res) => res.json());
};

export const postBff = ({
  url,
  data,
  accessToken,
}: {
  url: string;
  data: any;
  accessToken: string;
}) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

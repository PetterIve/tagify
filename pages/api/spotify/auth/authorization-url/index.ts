import type { NextApiRequest, NextApiResponse } from "next";

import { spotifyApi } from "../../../../../services/SpotifyApi";

type Data = {
  authorizationUrl: string;
};

const scopes = ["user-read-private"],
  state = "some-state-of-my-choice";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authorizationUrl = spotifyApi.createAuthorizeURL(scopes, state);

  res.status(200).json({ authorizationUrl });
}

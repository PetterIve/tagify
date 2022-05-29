import type { NextApiRequest, NextApiResponse } from "next";

import SpotifyWebApi from "spotify-web-api-node";

const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const clientId = process.env.SPOTIFY_CLIENT_ID;

const spotifyApi = new SpotifyWebApi({
  redirectUri,
  clientId,
});

type Data = {
  authorizationUrl: string;
};

const scopes = ["user-read-private", "user-read-email"],
  state = "some-state-of-my-choice";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authorizationUrl = spotifyApi.createAuthorizeURL(scopes, state);

  res.status(200).json({ authorizationUrl });
}

import type { NextApiRequest, NextApiResponse } from "next";

import SpotifyWebApi from "spotify-web-api-node";

type Data = {
  accessToken: string;
};

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const url = "localhost:3000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code, state } = req.query;

  const result = await spotifyApi.authorizationCodeGrant(code as string);

  const tokens = {
    refreshToken: result.body.refresh_token,
    accessToken: result.body.access_token,
  };

  res.redirect(`http://${url}?accessToken=${tokens.accessToken}`);
}

import type { NextApiRequest, NextApiResponse } from "next";

import { spotifyApi } from "../../../../../services/SpotifyApi";

type Data = {
  accessToken: string;
};

const url = "localhost:3000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code, state } = req.query;

  const result = await spotifyApi.authorizationCodeGrant(code as string);

  console.log({ result });

  const tokens = {
    refreshToken: result.body.refresh_token,
    accessToken: result.body.access_token,
  };

  res.redirect(`http://${url}?accessToken=${tokens.accessToken}`);
}

import type { NextApiRequest, NextApiResponse } from "next";

var SpotifyWebApi = require("spotify-web-api-node");

type Data = {
  name: string;
};

var scopes = ["user-read-private", "user-read-email"],
  redirectUri = "https://example.com/callback",
  clientId = "5fe01282e44241328a84e7c5cc169165",
  state = "some-state-of-my-choice";

console.log({ clientId: process.env.SPOTIFY_CLIENT_ID });

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

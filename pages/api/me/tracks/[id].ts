import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

import { getDb } from "../../../../services/Db";

type ResponseType = {};

const ALLOWED_METHODS = ["GET"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  res.setHeader("Allow", ALLOWED_METHODS);

  const { method, headers } = req;

  if (method !== "GET") {
    return res.status(405).end();
  }

  const authHeader = headers["authorization"] as string;
  if (!authHeader) {
    return res
      .status(401)
      .send(
        "Authentication must be provider on the format 'Bearer ${token}' in the Authorization header"
      );
  }
  const [_, accessToken] = authHeader.split(" ");

  try {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
    const userResult = await spotifyApi.getMe();
    const userId = userResult.body.id;
    const trackId = req.query.id as string;

    const dbResult = await (
      await getDb()
    ).readTagsForTrackForUser({ userId, trackId });

    if (dbResult.type === "TRACK_FOUND") {
      return res.status(200).json({ track: dbResult.track });
    }

    return res.status(404).json({ reason: dbResult.type });
  } catch (err) {
    console.log({ err });

    return res.status(500).end();
  }
}

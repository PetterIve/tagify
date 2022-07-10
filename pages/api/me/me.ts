import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

import { Collection, Document, MongoClient } from "mongodb";

type Data = {};

const ALLOWED_METHODS = ["POST"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Allow", ALLOWED_METHODS);

  const { method, headers, body } = req;

  if (method !== "POST") {
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
  const [format, accessToken] = authHeader.split(" ");

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  const userResult = await spotifyApi.getMe();
  const userId = userResult.body.id;

  const { trackId, tag } = req.body;

  if (trackId === undefined || tag === undefined) {
    return res.status(400).send("'trackId' and 'tag' must be strings");
  }

  try {
    const userData = await readUserData({ userId });

    return res.status(200).json({ yahoo: "MARIO" });
  } catch (err) {
    return res.status(500).end();
  }
}

const client = new MongoClient(process.env.MONGO_CONNECTION_URL as string);
let hasConnected = false;
type MongoTrack = {};
type MongoUser = { userId: string; tracks: MongoTrack[] };
type MongoUserDocument = Document & MongoUser;
let userCollection: Collection<MongoUserDocument> | undefined;

const readUserData = async ({ userId }: { userId: string }) => {
  if (!userCollection) {
    await client.connect();
    hasConnected = true;
    const db = client.db("tagify");
    userCollection = db.collection("tags");
  }

  const result = await userCollection.findOne({ userId });
};

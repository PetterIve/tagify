import { Collection, MongoClient, Document } from "mongodb";

const client = new MongoClient(process.env.MONGO_CONNECTION_URL as string);
let hasConnected = false;

type MongoTrack = {
  trackId: string;
  tags: string[];
};
type MongoUser = { userId: string; tracks: MongoTrack[] };
type MongoUserDocument = Document & MongoUser;
type TagCollection = Collection<MongoUserDocument>;
let tagCollection: TagCollection | undefined;

const Db = (tagCollection: TagCollection) => ({
  readTagsForTrackForUser: async ({
    userId,
    trackId,
  }: {
    userId: string;
    trackId: string;
  }) => {
    const userData = await tagCollection.findOne({ userId });
    if (!userData) {
      return { type: "USER_NOT_FOUND" };
    }

    const track = userData.tracks.find((track) => track.trackId === trackId);
    if (!track) {
      return { type: "TRACK_NOT_FOUND" };
    }

    return { type: "TRACK_FOUND", track };
  },
});

export const getDb = async () => {
  if (!tagCollection) {
    await client.connect();
    hasConnected = true;
    const db = client.db("tagify");
    tagCollection = db.collection("tags");
  }

  return Db(tagCollection);
};

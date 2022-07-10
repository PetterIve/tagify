import Image from "next/image";
import { useEffect, useState } from "react";
import { useSpotify } from "../../spotify/SpotifyProvider";
import { fetchBff, postBff } from "../../util/fetchBff";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { Input } from "../atoms/Input";
import { Tag } from "../atoms/Tag";

interface Props {
  imageSrc: string;
  trackName: string;
  artistName: string;
  trackId: string;
}

export const SpotifyTrack = ({
  imageSrc,
  trackName,
  artistName,
  trackId,
}: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>("");

  useEffect(() => {
    async function fetchTrack() {
      const result = await fetchBff({
        url: `/api/me/tracks/${trackId}`,
      });

      setTags(result.track.tags);
    }

    fetchTrack();
  }, [trackId]);

  const submitTag = async () => {
    await postBff({
      url: `api/tracks/${trackId}/tags`,
      data: { tag: tagValue, trackId },
    });
    setTags([...tags, tagValue]);
    setTagValue("");
  };

  return (
    <div className="flex">
      <div>
        <Image src={imageSrc} alt="Track image" height={300} width={300} />
        <p>
          <b>{artistName}</b>
        </p>
        <p>{trackName}</p>
      </div>
      <ol className="space-y-1">
        {tags.map((tag) => (
          <li key={tag}>
            <Tag text={tag} />
          </li>
        ))}
      </ol>
      <Form className="flex flex-col" onSubmit={submitTag}>
        <Input
          value={tagValue}
          onValueChanged={setTagValue}
          placeholder="Enter tag"
        />
        <Button className="mt-2" type="submit" text="Save tag" />
      </Form>
    </div>
  );
};

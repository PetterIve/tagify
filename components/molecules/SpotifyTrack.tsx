import Image from "next/image";
import { useState } from "react";
import { Row } from "../atoms";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

interface Props {
  imageSrc: string;
  trackName: string;
  artistName: string;
}

export const SpotifyTrack = ({ imageSrc, trackName, artistName }: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>("");

  const submitTag = async () => {
    setTags([...tags, tagValue]);
    setTagValue("");
  };

  return (
    <Row>
      <Image src={imageSrc} alt="Track image" height={300} width={300} />
      <p>
        <b>{artistName}</b>
      </p>
      <p>{trackName}</p>
      {tags.map((tag) => (
        <p style={{ borderRadius: 1337, background: "pink" }} key={tag}>
          {tag}
        </p>
      ))}
      <Input value={tagValue} onValueChanged={setTagValue} label="Add tag" />
      <Button text="Add tag" onClick={submitTag} />
    </Row>
  );
};

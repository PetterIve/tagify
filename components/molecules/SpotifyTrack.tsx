import Image from "next/image";

interface Props {
  imageSrc: string;
  trackName: string;
  artistName: string;
}

export const SpotifyTrack = ({ imageSrc, trackName, artistName }: Props) => {
  return (
    <div>
      <Image src={imageSrc} alt="Track image" height={300} width={300} />
      <p>
        <b>{artistName}</b>
      </p>
      <p>{trackName}</p>
    </div>
  );
};

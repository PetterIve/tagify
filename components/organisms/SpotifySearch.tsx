import { useState, useEffect } from "react";
import { useSpotify } from "../../spotify/SpotifyProvider";
import { Col, Loader } from "../atoms";
import { Input } from "../atoms/Input";
import { SpotifyTrack } from "../molecules/SpotifyTrack";

export const SpotifySearch = () => {
  const { spotifyApi } = useSpotify();

  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] =
    useState<SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>>();

  const [searchValue, setSearchValue] = useState("john mayer");
  useEffect(() => {
    const fetchSongs = async () => {
      if (!searchValue) {
        return;
      }

      setLoading(true);
      const result = await spotifyApi.searchTracks(searchValue);
      setLoading(false);

      setTracks(result.body.tracks);
    };

    const timeout = setTimeout(fetchSongs, 300);
    return () => clearTimeout(timeout);
  }, [searchValue, spotifyApi]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Col>
      <Input value={searchValue} onValueChanged={setSearchValue} label="Søk" />
      {tracks?.items.map((track) => (
        <SpotifyTrack
          trackId={track.id}
          key={track.id}
          imageSrc={track.album.images[0].url}
          trackName={track.name}
          artistName={track.artists[0].name}
        />
      ))}
    </Col>
  );
};

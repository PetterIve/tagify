import { useState, useEffect } from "react";
import { useSpotify } from "../../spotify/SpotifyProvider";
import { Loader } from "../atoms";
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
    <div className="flex-1">
      <Input
        value={searchValue}
        onValueChanged={setSearchValue}
        placeholder="Search"
      />
      {tracks && (
        <div>
          {tracks.items.slice(0, 1).map((track) => (
            <SpotifyTrack
              trackId={track.id}
              key={track.id}
              imageSrc={track.album.images[0].url}
              trackName={track.name}
              artistName={track.artists[0].name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

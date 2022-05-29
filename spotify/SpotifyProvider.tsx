import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { SpotifyLoginContainer } from "./SpotifyLoginContainer";

type SpotifyContextState = {
  accessToken: string;
  spotifyApi: SpotifyWebApi;
};

const SpotifyContext = createContext<SpotifyContextState | null>(null);

export const SpotifyProvider = ({ children }: PropsWithChildren<{}>) => {
  const { query } = useRouter();
  const accessTokenFromQuery = query.accessToken as string | undefined;

  const [accessToken, setAccessToken] = useState<string | undefined>(
    accessTokenFromQuery
  );
  useEffect(() => {
    setAccessToken(accessTokenFromQuery);
  }, [accessTokenFromQuery]);

  const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi>();

  useEffect(() => {
    const initSpotifyApi = async () => {
      if (!accessToken) {
        return setSpotifyApi(undefined);
      }

      const spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(accessToken);

      setSpotifyApi(spotifyApi);
    };
    initSpotifyApi();
  }, [accessToken]);

  if (!spotifyApi || !accessToken) {
    return <SpotifyLoginContainer />;
  }

  return (
    <SpotifyContext.Provider value={{ spotifyApi, accessToken }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = (): SpotifyContextState => {
  const context = useContext(SpotifyContext);

  if (!context) {
    throw new Error("useSpotify must be called within a SpotifyProvider");
  }

  return context;
};

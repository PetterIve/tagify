import { useEffect, useState } from "react";
import { Loader } from "../components";
import { fetchBff } from "../util/fetchBff";
import { SpotifyLoginComponent } from "./SpotifyLoginComponent";

export const SpotifyLoginContainer = () => {
  const [authorizationUrl, setAuthorizationUrl] = useState<string>();
  useEffect(() => {
    const fetchAuthUrl = async () => {
      const result = await fetchBff("api/spotify/auth/authorization-url");
      setAuthorizationUrl(result.authorizationUrl);
    };

    fetchAuthUrl();
  }, []);

  if (!authorizationUrl) {
    return <Loader />;
  }

  return <SpotifyLoginComponent authorizationUrl={authorizationUrl} />;
};

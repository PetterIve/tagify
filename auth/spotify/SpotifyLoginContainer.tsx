import { useEffect, useState } from "react";
import { Loader } from "../../components";
import { fetchBff } from "../../util/fetchbff";
import { SpotifyLoginComponent } from "./SpotifyLoginComponent";

export type OnLoginCallback = () => {
  accessToken: string;
  refreshToken: string;
};

interface Props {
  onLogin: OnLoginCallback;
}

export const SpotifyLoginContainer = ({ onLogin }: Props) => {
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

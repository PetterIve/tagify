import { createContext, PropsWithChildren, useState } from "react";
import {
  OnLoginCallback,
  SpotifyLoginContainer,
} from "./spotify/SpotifyLoginContainer";

type AuthContextState = {
  accessToken: string;
};

const AuthContext = createContext<AuthContextState | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [accessToken, setAccessToken] = useState<string>();

  const setTokens = ({ accessToken, refreshToken }: OnLoginCallback) => {
    setAccessToken(accessToken);
    console.log({ refreshToken });
  };

  if (!accessToken) {
    return <SpotifyLoginContainer onLogin={setTokens} />;
  }

  return (
    <AuthContext.Provider value={{ accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

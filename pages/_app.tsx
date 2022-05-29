import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SpotifyProvider } from "../spotify/SpotifyProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SpotifyProvider>
      <Component {...pageProps} />
    </SpotifyProvider>
  );
}

export default MyApp;

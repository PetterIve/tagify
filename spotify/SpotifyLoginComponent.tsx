interface Props {
  authorizationUrl: string;
}

export const SpotifyLoginComponent = ({ authorizationUrl }: Props) => {
  return (
    <a
      href={authorizationUrl}
      style={{
        borderRadius: 1337,
        background: "#1DB954",
        padding: 20,
        color: "white",
      }}
    >
      Logg inn med Spotify
    </a>
  );
};

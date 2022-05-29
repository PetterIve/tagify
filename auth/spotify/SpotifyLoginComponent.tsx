interface Props {
  authorizationUrl: string;
}

export const SpotifyLoginComponent = ({ authorizationUrl }: Props) => {
  return <a href={authorizationUrl}>Logg inn med Spotify</a>;
};

import { Loader } from "./Loader";

interface Props {
  loading?: boolean;
  text: string;
  onClick: () => void;
}

export const Button = ({ loading, text, onClick }: Props) => {
  return (
    <button onClick={() => onClick()}>{loading ? <Loader /> : text}</button>
  );
};

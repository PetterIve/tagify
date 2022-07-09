import { v4 } from "uuid";

interface Props {
  value: string;
  onValueChanged: (newValue: string) => void;
  placeholder: string;
}

export const Input = ({ value, onValueChanged, placeholder }: Props) => {
  const id = v4();

  return (
    <div className="flex-col flex">
      <input
        placeholder={placeholder}
        className="border-black-500 border-2 rounded-full p-2 pl-4"
        id={id}
        value={value}
        onChange={(e) => {
          onValueChanged(e.target.value);
        }}
      />
    </div>
  );
};

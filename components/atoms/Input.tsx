import { randomUUID } from "crypto";
import { v4 } from "uuid";
import { Col } from "./Col";

interface Props {
  value: string;
  onValueChanged: (newValue: string) => void;
  label: string;
}

export const Input = ({ value, onValueChanged, label }: Props) => {
  const id = v4();

  return (
    <Col>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => {
          onValueChanged(e.target.value);
        }}
      />
    </Col>
  );
};

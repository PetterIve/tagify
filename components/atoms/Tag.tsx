interface TagProps {
  text: string;
}

export const Tag = ({ text }: TagProps) => {
  return (
    <div className="rounded-lg bg-background text-white p-2 text-sm">
      {text}
    </div>
  );
};

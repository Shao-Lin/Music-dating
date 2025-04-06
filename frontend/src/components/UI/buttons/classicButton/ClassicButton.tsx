interface ClassicButtonProps {
  name: string;
  type: "button" | "submit" | "reset" | undefined;
}

export const ClassicButton = ({
  name,
  type = "button",
}: ClassicButtonProps) => {
  return (
    <button className="button" type={type}>
      {name}
    </button>
  );
};

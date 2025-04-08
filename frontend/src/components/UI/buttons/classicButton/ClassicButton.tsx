interface ClassicButtonProps {
  name: string;
  type: "button" | "submit" | "reset" | undefined;
  isLoading: boolean;
}

export const ClassicButton = ({
  name,
  type = "button",
  isLoading,
}: ClassicButtonProps) => {
  return (
    <button className="button" type={type} disabled={isLoading}>
      {name}
    </button>
  );
};

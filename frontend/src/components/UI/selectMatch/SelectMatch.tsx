import dislike from "../../../assets/cancle.svg";
import like from "../../../assets/heart.svg";
import "./_selectMatch.scss";

export const SelectMatch = ({
  onAction,
}: {
  onAction: (action: "like" | "dislike") => void;
}) => {
  return (
    <div className="spacer-container">
      <div className="centered-buttons">
        <button onClick={() => onAction("dislike")} className="image-button">
          <img src={dislike} alt="Dislike" />
        </button>
        <button onClick={() => onAction("like")} className="image-button">
          <img src={like} alt="Like" />
        </button>
      </div>
    </div>
  );
};

import dislike from "../../../assets/dislike.png";
import like from "../../../assets/like.png";
import "./_selectMatch.scss";

export const SelectMatch = () => {
  return (
    <div className="spacer-container">
      <div className="centered-buttons">
        <button className="image-button">
          <img src={dislike} alt="Button 1" />
        </button>
        <button className="image-button">
          <img src={like} alt="Button 2" />
        </button>
      </div>
    </div>
  );
};

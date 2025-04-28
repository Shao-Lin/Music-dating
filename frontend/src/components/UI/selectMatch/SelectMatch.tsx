import dislike from "../../../assets/cancle.svg";
import like from "../../../assets/heart.svg";
import "./_selectMatch.scss";
import { SelectMatchType, SelectMatchProps } from "./selectMatchTypes";
import { useSelectMatchMutation } from "../../../api/matchesApi";

export const SelectMatch = ({ meId, feedId }: SelectMatchProps) => {
  const [selectMatchAction] = useSelectMatchMutation();

  const test1: SelectMatchType = {
    userMe: {
      MeId: meId,
      meMatch: false,
    },
    userFeed: {
      userFeedId: feedId,
    },
  };

<<<<<<< HEAD
  const handleClickLike = async () => {
    test1.userMe.meMatch = true;
    try {
      await selectMatchAction(test1).unwrap();
    } catch (error) {
      console.error("Match selection failed:", error);
    }
  };
  const handleClickDislike = async () => {
=======
  const handleSwipe = async (action: "like" | "dislike") => {
    if (action === "like") {
      test1.userMe.meMatch = true;
    }

>>>>>>> 47c2cb4ade45b2dd244898924fe7d8e90a6a0159
    try {
      await selectMatchAction(test1).unwrap();
    } catch (error) {
      console.error("Match selection failed:", error);
    }
  };
  return (
    <div className="spacer-container">
      <div className="centered-buttons">
<<<<<<< HEAD
        <button onClick={handleClickDislike} className="image-button">
          <img src={dislike} alt="Button 1" />
        </button>
        <button onClick={handleClickLike} className="image-button">
=======
        <button onClick={() => handleSwipe("dislike")} className="image-button">
          <img src={dislike} alt="Button 1" />
        </button>
        <button onClick={() => handleSwipe("like")} className="image-button">
>>>>>>> 47c2cb4ade45b2dd244898924fe7d8e90a6a0159
          <img src={like} alt="Button 2" />
        </button>
      </div>
    </div>
  );
};

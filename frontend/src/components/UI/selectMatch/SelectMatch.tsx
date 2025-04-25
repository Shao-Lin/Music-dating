import dislike from "../../../assets/dislike.png";
import like from "../../../assets/like.png";
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

  const handleSwipe = async (action: "like" | "dislike") => {
    if (action === "like") {
      test1.userMe.meMatch = true;
    }

    try {
      await selectMatchAction(test1).unwrap();
    } catch (error) {
      console.error("Match selection failed:", error);
    }
  };
  return (
    <div className="spacer-container">
      <div className="centered-buttons">
        <button onClick={() => handleSwipe("dislike")} className="image-button">
          <img src={dislike} alt="Button 1" />
        </button>
        <button onClick={() => handleSwipe("like")} className="image-button">
          <img src={like} alt="Button 2" />
        </button>
      </div>
    </div>
  );
};

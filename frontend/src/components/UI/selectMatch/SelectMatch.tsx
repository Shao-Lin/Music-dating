import dislike from "../../../assets/cancle.svg";
import like from "../../../assets/heart.svg";
import "./_selectMatch.scss";
import { SelectMatchType, SelectMatchProps } from "./selectMatchTypes";
//import { useSelectMatchMutation } from "../../../api/matchesApi";

export const SelectMatch = ({
  meId,
  feedId,
  onSwipe,
}: SelectMatchProps & { onSwipe: (action: "like" | "dislike") => void }) => {
  //const [selectMatchAction] = useSelectMatchMutation();

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
      //await selectMatchAction(test1).unwrap();
      onSwipe(action); // <-- вызов обработчика из родителя
    } catch (error) {
      console.error("Match selection failed:", error);
    }
  };

  return (
    <div className="spacer-container">
      <div className="centered-buttons">
        <button onClick={() => handleSwipe("dislike")} className="image-button">
          <img src={dislike} alt="Dislike" />
        </button>
        <button onClick={() => handleSwipe("like")} className="image-button">
          <img src={like} alt="Like" />
        </button>
      </div>
    </div>
  );
};

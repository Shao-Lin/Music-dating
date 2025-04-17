import { CustomAvatar } from "../UI/avatar/CustomAvatar";
import { AudioButton } from "../UI/buttons/audioButtonMatchItem/AudioButtonMatchItem";
import dislike from "../../assets/dislike.png";
import { RemoveMatch } from "../modals/RemoveMatch";
import { useState } from "react";
export const MatchItem = () => {
  const onClick = () => {
    console.log("111");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRejectClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Удалить");
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="match-item">
        <div className="match-item__name">Анастасия</div>

        <div className="match-item__content">
          <div className="match-item__avatar" onClick={onClick}>
            <CustomAvatar size={70} />
          </div>

          <AudioButton />

          <div className="match-item__reject">
            <button onClick={handleRejectClick}>
              <img src={dislike} alt="Reject match" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RemoveMatch onClose={handleClose} onDelete={handleDelete} />
      )}
    </>
  );
};

import { CustomAvatar } from "../UI/avatar/CustomAvatar";
import { AudioButton } from "../UI/buttons/audioButtonMatchItem/AudioButtonMatchItem";
import dislike from "../../assets/cancleListMatch.png";
import { RemoveMatch } from "../modals/RemoveMatch";
import { useState } from "react";
import { MatchItemType } from "./matchItemType";
import { useDeleteMatchMutation } from "../../api/matchesApi";
import { useNavigate } from "react-router";

type Props = {
  item: MatchItemType; // Явно указываем, что ожидаем пропс `item`
};
export const MatchItem = ({ item }: Props) => {
  const { id, name, avatar, online, music } = item;
  const navigate = useNavigate();
  const [deleteMatch] = useDeleteMatchMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRejectClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteMatch(id).unwrap();
      console.log("Удалить");
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleClick = () => {
    navigate("/chat");
  };
  return (
    <>
      <div className="match-item">
        <div className="match-item__name">{name}</div>

        <div className="match-item__content">
          <div className="match-item__avatar" onClick={handleClick}>
            <CustomAvatar avatar={avatar} online={online} size={60} />
          </div>

          <AudioButton {...music} />

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

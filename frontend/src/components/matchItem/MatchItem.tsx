import { CustomAvatar } from "../UI/avatar/CustomAvatar";
import { AudioButton } from "../UI/buttons/audioButtonMatchItem/AudioButtonMatchItem";
import dislike from "../../assets/cancleListMatch.png";
import { CustomModal } from "../modals/questionModal/CustomModal";
import { useState } from "react";
import { MatchItemType } from "./matchItemType";
import { useDislikeTargetMutation } from "../../api/usersApi";
import { useNavigate } from "react-router";
//import { MusicData } from "../userCard/userType";
import { useGetChatForMatchItemQuery } from "../../api/chatApi";
import { useAppDispatch } from "../../hooks/reduxHook";
import { setPartnerId } from "../../slices/userData";

type Props = {
  item: MatchItemType; // Явно указываем, что ожидаем пропс `item`
};
export const MatchItem = ({ item }: Props) => {
  const { userId, name, avatarUrl, online = true, tracks } = item;
  const { data: chatItem } = useGetChatForMatchItemQuery(userId);
  const navigate = useNavigate();
  const [deleteMatch] = useDislikeTargetMutation();
  const activeTrack = tracks.find((track) => track.isMain === true);
  if (!activeTrack) {
    throw new Error("Main track not found");
  }

  const dispatch = useAppDispatch();

  const partnerId = userId;

  console.log(activeTrack);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRejectClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteMatch(userId).unwrap();
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
    localStorage.setItem("partnerId", partnerId);
    dispatch(setPartnerId({ partnerId }));
    navigate(`/chat/${chatItem?.id}`);
  };
  return (
    <>
      <div className="match-item">
        <div className="match-item__name">{name}</div>

        <div className="match-item__content">
          <div className="match-item__avatar" onClick={handleClick}>
            <CustomAvatar avatar={avatarUrl} online={online} size={60} />
          </div>

          <AudioButton {...activeTrack} userId={userId} />

          <div className="match-item__reject">
            <button onClick={handleRejectClick}>
              <img src={dislike} alt="Reject match" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CustomModal
          onClose={handleClose}
          onDelete={handleDelete}
          description="Удалить свой мэтч?"
          back="Назад"
          action="Удалить"
        />
      )}
    </>
  );
};

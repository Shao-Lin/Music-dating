import { Carousel } from "../UI/carousel/Carousel";
import {
  AudioButton,
  AudioButtonHandle,
} from "../UI/buttons/audioButton/AudioButton";
import { useAppDispatch } from "../../hooks/reduxHook";
import { calculateAge } from "../../utils/calculateAge";
import { UserData } from "./userType";
import { setId } from "../../slices/userData";
import { useEffect, useRef } from "react";

export const UserCard = ({
  userId,
  avatarUrl,
  photos,
  name,
  birthDate,
  city,
  tracks,
  isAutoplay,
  isProfile = false,
}: UserData & { isAutoplay: boolean; isProfile?: boolean }) => {
  const dispatch = useAppDispatch();
  const parseToDate = new Date(birthDate);
  const age = calculateAge(parseToDate);
  const audioButtonRef = useRef<AudioButtonHandle | null>(null);

  useEffect(() => {
    dispatch(setId({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (isAutoplay && audioButtonRef.current) {
      audioButtonRef.current.playTrack();
    }
  }, [isAutoplay, userId]);

  return (
    <>
      <div className="carousel-isolation-layer">
        <Carousel
          key={userId}
          avatarUrl={avatarUrl}
          photos={photos}
          showMenuButton={isProfile}
        />
      </div>

      <div className="human-data">
        <div className="name-age">
          {name} {age}
        </div>
        <div className="city">г.{city}</div>
      </div>

      <AudioButton ref={audioButtonRef} {...tracks[0]} />
    </>
  );
};

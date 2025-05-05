import { Carousel } from "../UI/carousel/Carousel";
import { AudioButton } from "../UI/buttons/audioButton/AudioButton";
import { useAppDispatch } from "../../hooks/reduxHook";

import { calculateAge } from "../../utils/calculateAge";

import { UserData } from "./userType";
import { setId } from "../../slices/userData";
import { useEffect } from "react";
export const UserCard = ({
  id,
  photos,
  name,
  birthDate,
  city,
  tracks,
}: UserData) => {
  const dispatch = useAppDispatch();
  const parseToDate = new Date(birthDate);
  const age = calculateAge(parseToDate);

  useEffect(() => {
    dispatch(setId({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Carousel key={id} images={photos} />
      <div className="human-data">
        <div className="name-age">
          {name} {age}
        </div>
        <div className="city">г.{city}</div>
      </div>
      <AudioButton {...tracks[0]} />
    </>
  );
};

import { Carousel } from "../UI/carousel/Carousel";
import { AudioButton } from "../UI/buttons/audioButton/AudioButton";
import { useAppDispatch } from "../../hooks/reduxHook";

import { calculateAge } from "../../utils/calculateAge";

import { UserData } from "./userType";
import { setId } from "../../slices/userData";
export const UserCard = ({
  id,
  photos,
  name,
  birthday,
  city,
  music,
}: UserData) => {
  const dispatch = useAppDispatch();
  const age = calculateAge(birthday);
  dispatch(setId({ id }));

  return (
    <>
      <Carousel images={photos} />
      <div className="human-data">
        <div className="name-age">
          {name} {age}
        </div>
        <div className="city">{city}</div>
      </div>
      <AudioButton {...music} />
    </>
  );
};

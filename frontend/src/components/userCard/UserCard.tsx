import { Carousel } from "../UI/carousel/Carousel";
import { AudioButton } from "../UI/buttons/audioButton/AudioButton";
import { useAppDispatch } from "../../hooks/reduxHook";

import { calculateAge } from "../../utils/calculateAge";

import { UserData } from "./userType";
<<<<<<< HEAD
export const UserCard = ({ photos, name, birthday, city, music }: UserData) => {
  const age = calculateAge(birthday);
=======
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
>>>>>>> 47c2cb4ade45b2dd244898924fe7d8e90a6a0159

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

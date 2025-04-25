import { Carousel } from "../UI/carousel/Carousel";
import { AudioButton } from "../UI/buttons/audioButton/AudioButton";

import { calculateAge } from "../../utils/calculateAge";

import { UserData } from "./userType";
export const UserCard = ({ photos, name, birthday, city, music }: UserData) => {
  const age = calculateAge(birthday);

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

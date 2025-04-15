import { Carousel } from "../UI/carousel/Carousel";
import one from "../../assets/testCarousel/one.png";
import two from "../../assets/testCarousel/two.png";
import three from "../../assets/testCarousel/three.png";
import { AudioButton } from "../UI/buttons/audioButton/AudioButton";

export const UserCard = () => {
  const photos = [one, two, three];

  return (
    <>
      <Carousel images={photos} />
      <div className="human-data">
        <div className="name-age"> Хлоя 26</div>
        <div className="city">г.Сан-Диего</div>
      </div>
      <AudioButton />
    </>
  );
};

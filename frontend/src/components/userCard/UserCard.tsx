import { Carousel } from "../UI/carousel/Carousel";
import one from "../../assets/one.png";
import two from "../../assets/two.png";
import three from "../../assets/three.png";
import four from "../../assets/four.png";
import five from "../../assets/five.png";

export const UserCard = () => {
  const photos = [one, two, three, four, five];
  return <Carousel images={photos} />;
};

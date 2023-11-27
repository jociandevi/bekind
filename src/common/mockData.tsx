import { ReactComponent as Pants } from "../img/badges/pants.svg";
import { ReactComponent as Hotel } from "../img/badges/hotel.svg";
import { ReactComponent as DivingGoggles } from "../img/badges/diving-goggles.svg";
import { ReactComponent as Food } from "../img/badges/food.svg";
import { ReactComponent as Tree } from "../img/badges/tree.svg";
import { ReactComponent as Balloon } from "../img/badges/hot-air-balloon.svg";
import { ReactComponent as Camera } from "../img/badges/camera.svg";
import { ReactComponent as Tent } from "../img/badges/tent.svg";
import { Category, CategoryNames } from "./interfaces";
import {
  badge1,
  badge2,
  badge3,
  badge4,
  badge5,
  badge6,
  badge7,
  badge8,
  darkGray,
} from "./variables";

export const badgeIcons: {
  id: number;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    id: 1,
    icon: <Pants width={80} height={80} stroke={darkGray} />,
    color: badge1,
  },
  {
    id: 2,
    icon: <Hotel width={80} height={80} />,
    color: badge2,
  },
  {
    id: 3,
    icon: <DivingGoggles width={80} height={80} />,
    color: badge3,
  },
  {
    id: 4,
    icon: <Tree width={80} height={80} />,
    color: badge4,
  },
  {
    id: 5,
    icon: <Food width={80} height={80} />,
    color: badge5,
  },
  {
    id: 6,
    icon: <Balloon width={80} height={80} />,
    color: badge6,
  },
  {
    id: 7,
    icon: <Camera width={80} height={80} />,
    color: badge7,
  },
  {
    id: 8,
    icon: <Tent width={80} height={80} />,
    color: badge8,
  },
];

export const categories: Category[] = [
  { id: 0, name: CategoryNames.YOU },
  { id: 1, name: CategoryNames.RELATIONSHIPS },
  { id: 2, name: CategoryNames.SOCIAL },
  { id: 3, name: CategoryNames.ENVIRONMENT },
];

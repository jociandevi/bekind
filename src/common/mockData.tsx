import { ReactComponent as Pants } from "../img/badges/pants.svg";
import { ReactComponent as Hotel } from "../img/badges/hotel.svg";
import { ReactComponent as DivingGoggles } from "../img/badges/diving-goggles.svg";
import { ReactComponent as Food } from "../img/badges/food.svg";
import { ReactComponent as Tree } from "../img/badges/tree.svg";
import { ReactComponent as Balloon } from "../img/badges/hot-air-balloon.svg";
import { ReactComponent as Camera } from "../img/badges/camera.svg";
import { ReactComponent as Tent } from "../img/badges/tent.svg";
import { ReactComponent as Sailboat } from "../img/badges/sailboat.svg";
import { ReactComponent as Lighthouse } from "../img/badges/lighthouse.svg";
import { Category, CategoryNames } from "./interfaces";
import {
  badge1,
  badge10,
  badge2,
  badge3,
  badge4,
  badge5,
  badge6,
  badge7,
  badge8,
  badge9,
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
  {
    id: 9,
    icon: <Sailboat width={80} height={80} />,
    color: badge9,
  },
  {
    id: 10,
    icon: <Lighthouse width={80} height={80} />,
    color: badge10,
  },
];

export const categories: Category[] = [
  { id: 0, name: CategoryNames.YOU },
  { id: 1, name: CategoryNames.RELATIONSHIPS },
  { id: 2, name: CategoryNames.SOCIAL },
  { id: 3, name: CategoryNames.ENVIRONMENT },
];

export const starterActions = [
  {
    day: 0,
    actionId: 47,
  },
  {
    day: 1,
    actionId: 35,
  },
  {
    day: 2,
    actionId: 20,
  },
  {
    day: 3,
    actionId: 25,
  },
  {
    day: 4,
    actionId: 5,
  },
  {
    day: 5,
    actionId: 11,
  },
  {
    day: 6,
    actionId: 57,
  },
  {
    day: 7,
    actionId: 55,
  },
  {
    day: 8,
    actionId: 53,
  },
  {
    day: 9,
    actionId: 41,
  },
];

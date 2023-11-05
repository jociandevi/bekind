import { variables } from "./variables";
import { ReactComponent as Pants } from "../img/badges/pants.svg";
import { ReactComponent as Hotel } from "../img/badges/hotel.svg";
import { ReactComponent as DivingGoggles } from "../img/badges/diving-goggles.svg";
import { ReactComponent as Tree } from "../img/badges/tree.svg";
import { Category, CategoryNames } from "./interfaces";

export const badgeIcons: { id: number; icon: React.ReactNode }[] = [
  {
    id: 1,
    icon: <Pants width={80} height={80} stroke={variables.darkGray} />,
  },
  {
    id: 2,
    icon: <Hotel width={80} height={80} />,
  },
  {
    id: 3,
    icon: <DivingGoggles width={80} height={80} />,
  },
  {
    id: 4,
    icon: <Tree width={80} height={80} />,
  },
];

export const categories: Category[] = [
  { id: 0, name: CategoryNames.YOU },
  { id: 1, name: CategoryNames.RELATIONSHIPS },
  { id: 2, name: CategoryNames.SOCIAL },
  { id: 3, name: CategoryNames.PURPOSE },
];

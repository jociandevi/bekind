import { variables } from "./variables";
import { ReactComponent as Pants } from "../img/badges/pants.svg";
import { ReactComponent as Hotel } from "../img/badges/hotel.svg";
import { ReactComponent as DivingGoggles } from "../img/badges/diving-goggles.svg";
import { BadgeProps, Category, CategoryNames, UserStats } from "./interfaces";

export const badges: BadgeProps[] = [
  {
    icon: <Pants width={80} height={80} stroke={variables.darkGray} />,
    enabled: true,
    id: 1,
    name: "Outfit Champ",
    necessaryActions: [],
    description:
      "You helped with clothing necessities at least 3 times! Cheers!",
    tooltip: "Help out with clothing related issues to unlock rhis badge.",
  },
  {
    icon: <DivingGoggles width={80} height={80} />,
    enabled: false,
    id: 2,
    name: "Going Deep",
    necessaryActions: [],
    description:
      "You did 5 things that require deep dedication and have huge efforts!",
    tooltip:
      "This is a tough one! You can reach it going above and beyond a couple times.",
  },
  {
    icon: <Hotel width={80} height={80} />,
    enabled: true,
    id: 3,
    name: "Mayor!",
    necessaryActions: [
      {
        id: 10,
        title: "Drive nicely!",
        description: "Let someone merge in front of you today!",
        category: CategoryNames.ENVIRONMENT,
        imageUrl:
          "https://images.unsplash.com/photo-1533408874882-397bf377a8c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
      {
        id: 4,
        title: "Decorate with post its",
        category: CategoryNames.NEIGHBORHOOD,
        description:
          "Post inspirational sticky notes around your neighborhood, office, school, etc.",
        imageUrl:
          "https://images.unsplash.com/photo-1541960071727-c531398e7494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
      },
      {
        id: 12,
        title: "Just A Piece",
        description:
          "Pick up and throw out a piece of trash you see lying on the street today.",
        category: CategoryNames.ENVIRONMENT,
        imageUrl:
          "https://images.unsplash.com/photo-1586041828039-b8d193d6d1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      },
    ],
    description:
      "You are an amazing neighbour! I'd love to live in your street!",
    tooltip: "Help out in our neighbourhood to achieve this",
  },
];

export const categories: Category[] = [
  { id: 0, name: CategoryNames.YOU },
  { id: 1, name: CategoryNames.RELATIONSHIPS },
  { id: 2, name: CategoryNames.SOCIAL },
  { id: 3, name: CategoryNames.PURPOSE },
];

export const userStats: UserStats = {
  id: 1,
  firstName: "Liza",
  lastName: "Bailey",
  historicalData: [
    {
      month: "June",
      label: "You",
      value: 3,
    },
    {
      month: "June",
      label: "Average",
      value: 5,
    },
    {
      month: "July",
      label: "You",
      value: 12,
    },
    {
      month: "July",
      label: "Average",
      value: 12,
    },
    {
      month: "August",
      label: "You",
      value: 9,
    },
    {
      month: "August",
      label: "Average",
      value: 18,
    },
    {
      month: "September",
      label: "You",
      value: 10,
    },
    {
      month: "September",
      label: "Average",
      value: 11,
    },
  ],
  totalNumberOfKindnesses: 53,
  topCategory: CategoryNames.NEIGHBORHOOD,
};

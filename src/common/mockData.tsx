import { variables } from "./variables";
import { ReactComponent as Pants } from "../img/badges/pants.svg";
import { ReactComponent as Hotel } from "../img/badges/hotel.svg";
import { ReactComponent as DivingGoggles } from "../img/badges/diving-goggles.svg";
import {
  BadgeProps,
  Category,
  CategoryNames,
  KindnessAction,
  UserStats,
} from "./interfaces";

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
    necessaryActions: [],
    description: "You are an amazing mayor! I'd love to live in your street!",
    tooltip: "Help out in our neighbourhood to achieve this",
  },
];

export const categories: Category[] = [
  { id: 100, name: CategoryNames.SOCIAL },
  { id: 200, name: CategoryNames.ANIMAL },
  { id: 300, name: CategoryNames.ENVIRONMENT },
  { id: 400, name: CategoryNames.NEIGHBORHOOD },
];

export const raoks: KindnessAction[] = [
  {
    id: 1,
    title: "Pay it Backward",
    description: "Buy coffee for the person behind you in line",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
  },
  {
    id: 2,
    title: "Give compliments",
    description: "Compliment the first three people you talk to today.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1662496619829-fcfa29c2d718?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
  },
  {
    id: 3,
    title: "Send good vibes",
    description:
      "Send a positive text message to five different people right now.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1493401415972-d4001c9fa2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
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
    id: 5,
    title: "Donate old towels or blankets to an animal shelter.",
    category: CategoryNames.ANIMAL,
    imageUrl:
      "https://images.unsplash.com/photo-1553688738-a278b9f063e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 6,
    title: "Surprise notes",
    description:
      "Place a positive body image notes in jean pockets at a department store",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 7,
    title: "Donate",
    description: "Give away stuff for free on Craig’s List.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1505455184862-554165e5f6ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
  },
  {
    id: 8,
    title: "Clean it",
    description: "Have a clean up party at a beach or park.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1676642061313-320659a528ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 9,
    title: "Treat the doggies",
    description:
      "Purchase extra dog or cat food and bring it to an animal shelter.",
    category: CategoryNames.ANIMAL,
    imageUrl:
      "https://images.unsplash.com/photo-1508609540374-67d1601ba520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwdHJlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
];

export const user = {
  id: 1,
  firstName: "Liza",
  lastName: "Bailey",
  photoUrl:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  liked: [...raoks],
  history: [...raoks],
};

export const userToPraise = {
  id: 1,
  firstName: "Shaun",
  lastName: "Mendley",
  photoUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  recent: [...raoks][0],
};

export const userStats: UserStats = {
  id: 1,
  firstName: "Liza",
  lastName: "Bailey",
  numberOfKindnessLast30Days: 14,
  averageNumberOfKindnessLast30Days: 12,
  userMonthlyStatsLast6Months: [3, 12, 18, 10, 4, 15],
  avgMonthlyStatsLast6Months: [5, 12, 9, 11, 8, 10],
  totalNumberOfKindnesses: 53,
  topCategory: CategoryNames.NEIGHBORHOOD,
};

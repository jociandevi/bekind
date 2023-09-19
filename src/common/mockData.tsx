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

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id volutpat lacus laoreet non curabitur. Neque gravida in fermentum et sollicitudin ac orci phasellus. Id cursus metus aliquam eleifend mi in. Suspendisse in est ante in nibh. Nascetur ridiculus mus mauris vitae. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Lacinia at quis risus sed vulputate odio. Blandit libero volutpat sed cras ornare arcu dui vivamus arcu.\nId nibh tortor id aliquet. Natoque penatibus et magnis dis parturient montes. Venenatis tellus in metus vulputate eu scelerisque. Lectus nulla at volutpat diam ut venenatis. Eget arcu dictum varius duis at consectetur lorem donec. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Mauris cursus mattis molestie a iaculis. Massa enim nec dui nunc mattis enim. Elementum nisi quis eleifend quam adipiscing vitae proin. Iaculis nunc sed augue lacus viverra vitae congue. Cursus eget nunc scelerisque viverra.\nMattis aliquam faucibus purus in massa tempor. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Non arcu risus quis varius quam. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Purus ut faucibus pulvinar elementum integer enim neque volutpat ac. Eget gravida cum sociis natoque penatibus et magnis dis. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Neque aliquam vestibulum morbi blandit. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Bibendum arcu vitae elementum curabitur. Ut ornare lectus sit amet est placerat in egestas. Venenatis urna cursus eget nunc scelerisque viverra. Massa tincidunt dui ut ornare. Imperdiet massa tincidunt nunc pulvinar sapien et ligula. Non diam phasellus vestibulum lorem. Donec et odio pellentesque diam volutpat commodo sed egestas.\nEgestas quis ipsum suspendisse ultrices gravida dictum fusce. Cursus mattis molestie a iaculis. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Cras adipiscing enim eu turpis egestas pretium. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Nulla malesuada pellentesque elit eget gravida cum sociis. At erat pellentesque adipiscing commodo elit at imperdiet dui. Hendrerit dolor magna eget est. Est velit egestas dui id ornare arcu odio ut sem. Elementum eu facilisis sed odio morbi quis commodo. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Condimentum mattis pellentesque id nibh tortor id aliquet.\nSuspendisse faucibus interdum posuere lorem ipsum dolor sit. Massa eget egestas purus viverra. Lorem ipsum dolor sit amet consectetur adipiscing. Purus non enim praesent elementum facilisis leo vel. Condimentum id venenatis a condimentum. Ipsum dolor sit amet consectetur. Libero volutpat sed cras ornare arcu. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a. Euismod in pellentesque massa placerat duis. Duis convallis convallis tellus id interdum. Cursus sit amet dictum sit. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Non odio euismod lacinia at quis risus sed vulputate. Dictum non consectetur a erat nam at lectus urna. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Vulputate ut pharetra sit amet aliquam id. Massa eget egestas purus viverra accumsan in nisl nisi. Magna sit amet purus gravida quis blandit turpis cursus in.";

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
    longDescription: loremIpsum,
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
  },
  {
    id: 2,
    title: "Give compliments",
    description: "Compliment the first three people you talk to today.",
    longDescription: loremIpsum,
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1662496619829-fcfa29c2d718?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
  },
  {
    id: 3,
    title: "Send good vibes",
    description:
      "Send a positive text message to five different people right now.",
    longDescription: loremIpsum,
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1493401415972-d4001c9fa2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 4,
    title: "Decorate with post its",
    category: CategoryNames.NEIGHBORHOOD,
    longDescription: loremIpsum,
    description:
      "Post inspirational sticky notes around your neighborhood, office, school, etc.",
    imageUrl:
      "https://images.unsplash.com/photo-1541960071727-c531398e7494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
  },
  {
    id: 5,
    title: "Donate old towels or blankets to an animal shelter.",
    category: CategoryNames.ANIMAL,
    longDescription: loremIpsum,
    imageUrl:
      "https://images.unsplash.com/photo-1553688738-a278b9f063e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 6,
    title: "Surprise notes",
    description:
      "Place a positive body image notes in jean pockets at a department store",
    category: CategoryNames.ENVIRONMENT,
    longDescription: loremIpsum,
    imageUrl:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 7,
    title: "Donate",
    description: "Give away stuff for free on Craig’s List.",
    category: CategoryNames.ENVIRONMENT,
    longDescription: loremIpsum,
    imageUrl:
      "https://images.unsplash.com/photo-1505455184862-554165e5f6ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
  },
  {
    id: 8,
    title: "Clean it",
    description: "Have a clean up party at a beach or park.",
    category: CategoryNames.ENVIRONMENT,
    longDescription: loremIpsum,
    imageUrl:
      "https://images.unsplash.com/photo-1676642061313-320659a528ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 9,
    title: "Treat the doggies",
    description:
      "Purchase extra dog or cat food and bring it to an animal shelter.",
    category: CategoryNames.ANIMAL,
    longDescription: loremIpsum,
    imageUrl:
      "https://images.unsplash.com/photo-1508609540374-67d1601ba520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwdHJlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 10,
    title: "Drive nicely!",
    description: "Let someone merge in front of you today!",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1533408874882-397bf377a8c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 11,
    title: "Reach Out To An Old Friend",
    description:
      "Think of someone you really like but haven't talked to in a long while.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1660733344431-f6a440cb7c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
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
  {
    id: 13,
    title: "They can go first",
    description:
      "Let someone in front of you. It can be in the shop at checkout or in traffic.",
    category: CategoryNames.NEIGHBORHOOD,
    imageUrl:
      "https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 14,
    title: "Suppose good intention",
    description:
      "Anything happens today, assume that it is coming from a positive place.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1515144225933-899dcb0ca32e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
  },
  {
    id: 15,
    title: "Set a date for quality time",
    description:
      "Think of a new activity to do with your spouse, friend or family member.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1569965335962-2317ff2a7658?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1338&q=80",
  },
  {
    id: 16,
    title: "Something small",
    description:
      "Give a small gift to someone you meet today. It can be a chocolate, a note, a drink, a flower.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1582176604856-e824b4736522?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80",
  },
  {
    id: 17,
    title: "Birthday wish",
    description: "Send a personal note to someone who has a birthday today.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 18,
    title: "Share your apprecition",
    description:
      "Think about someone who you appreciate / are grateful for. Tell them.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1579208570378-8c970854bc23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1522&q=80",
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

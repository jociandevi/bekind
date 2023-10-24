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
  { id: 200, name: CategoryNames.YOU },
  { id: 300, name: CategoryNames.ENVIRONMENT },
  { id: 400, name: CategoryNames.NEIGHBORHOOD },
];

export const raoks: KindnessAction[] = [
  {
    id: 1,
    title: "Surprise Someone With a Coffee",
    description: "Or tea. Bring a cup of joy.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
  },
  {
    id: 19,
    title: "Walk In Nature",
    description: "And appreciate its beauty.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
  },
  {
    id: 20,
    title: "Smile At A Stranger",
    description: "Make their days and yours!",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Lesly Juarez",
  },
  {
    id: 21,
    title: "Declutter",
    description: "Clear up your shelf, books or clothes.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1529957018945-07aed3538ad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Edgar Chaparro",
  },
  {
    id: 22,
    title: "Buy a Gift",
    description: "Early for Christmas or just because!",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Kira auf der Heide",
  },
  {
    id: 23,
    title: "Cook A Meal",
    description: "Make the favorite dish of your child, spouse or friend!",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1616169776580-c86189ee67b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Micheile Henderson",
  },
  {
    id: 24,
    title: "Say No",
    description: "To Something You Don't Want To Do.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1518305846259-a810cb6afa1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Jonathan Mast",
  },
  {
    id: 25,
    title: "Give Away Something You Love",
    description: "Share an item of your favorites.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1638740395403-39494228e8a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    credit: "Unsplash - Aleksei Ezhkov",
  },
  {
    id: 26,
    title: "Make a DIY Gift",
    description: "Anything from a card to pottery.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1488806374796-a4071c52353b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Myrlene NUMA",
  },
  {
    id: 27,
    title: "Don't Eat Meat Today",
    description: "Save 4.9kg of CO2 consumption as opposed to a chicken meal.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1519996409144-56c88c9aa612?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Jo Sonn",
  },
  {
    id: 28,
    title: "Post It",
    description: "Leave a post-it with your favorite quote",
    category: CategoryNames.NEIGHBORHOOD,
    imageUrl:
      "https://images.unsplash.com/photo-1501747315-124a0eaca060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Brigitte Tohm",
  },
  {
    id: 29,
    title: "Forget Someone Who Hurt You",
    description: "And let yourself free.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1517728848779-e95acb6ac40f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Ankush Minda",
  },
  {
    id: 30,
    title: "Apologize",
    description: "Clear the air and your mind.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1531951657915-02db328ae9d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    credit: "Unsplash - Paul Pastourmatzis",
  },
  {
    id: 31,
    title: "Plant A Flower Bees Like",
    description: "And support the Earth",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1504392022767-a8fc0771f239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
    credit: "Unsplash - Aaron Burden",
    duration: 30,
  },
  {
    id: 32,
    title: "Do Someone Else's Chores",
    description: "Surprise your partner or roommate.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Maria Lin Kim",
    duration: 20,
  },
  {
    id: 33,
    title: "Offer Your Seat",
    description: "On public transport.",
    category: CategoryNames.NEIGHBORHOOD,
    imageUrl:
      "https://images.unsplash.com/photo-1605367177286-f3d4789c47a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    credit: "Unsplash - Dennis Siqueira",
    duration: 5,
  },
  {
    id: 34,
    title: "Write a good review for a small business",
    description:
      "A coffee, restaurant, gardening service etc. you genuinely like.",
    category: CategoryNames.NEIGHBORHOOD,
    imageUrl:
      "https://images.unsplash.com/photo-1573612664822-d7d347da7b80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - S O C I A L . C U T",
    duration: 10,
  },
  {
    id: 35,
    title: "Support A Charity",
    description: "One that tries to improve the world.",
    category: CategoryNames.NEIGHBORHOOD,
    imageUrl:
      "https://images.unsplash.com/photo-1621272156568-7306716648df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - ",
    duration: 10,
  },
  {
    id: 36,
    title: "Buy Local Food",
    description: "Choose locally produced fruits, veggies and bread.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1444459094717-a39f1e3e0903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    credit: "Unsplash - Will",
    duration: 30,
  },
  {
    id: 37,
    title: "Write A Card To Sick Children",
    description: "Send it to a hospital.",
    category: CategoryNames.NEIGHBORHOOD,
    imageUrl:
      "https://images.unsplash.com/photo-1637597384611-0c33cef6ec03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    credit: "Unsplash - rc.xyz NFT gallery",
    duration: 30,
  },
  {
    id: 38,
    title: "Write a List Of Things You Love About Someone",
    description: "You do't need to share it with them - but you can.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
    credit: "Unsplash - Elevate",
    duration: 10,
  },
  {
    id: 39,
    title: "Brag About An Employee To Their Manager",
    description: "If you enjoy working them, don't miss the chance.",
    category: CategoryNames.NEIGHBORHOOD,
    imageUrl:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    credit: "Unsplash - Tedd F",
    duration: 5,
  },
  {
    id: 40,
    title: "Share your favorite book with someone",
    description: "Buy or lend it for them.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1599733442143-127f1f5540f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Richa Sharma",
    duration: 10,
  },
  {
    id: 41,
    title: "Go By Bicycle Today",
    description: "Instead of driving",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1501147830916-ce44a6359892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Murillo de Paula",
    duration: 30,
  },
  {
    id: 42,
    title: "Plant a Tree",
    description: "The second best time to plant a tree is today!",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1564860924912-f27764fd2ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Richard Loader",
    duration: 45,
  },
  {
    id: 43,
    title: "Fill A Shoebox With gifts",
    description: "Save it for Christmas or donate it now.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - freestocks",
    duration: 30,
  },
  {
    id: 44,
    title: "Take Your Own Bag To The Shop",
    description: "Instead of buying a plastic bag there.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1576695139696-e053aae84148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
    credit: "Unsplash - Guido Coppa",
    duration: 5,
  },
  {
    id: 45,
    title: "Sell An Item Online",
    description: "Help yourself, the earth and the buyer.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Brooke Lark",
    duration: 20,
  },
  {
    id: 46,
    title: "Don't buy anything today",
    description: "Save some money and the earth.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - michelle henderson",
    duration: 5,
  },
  {
    id: 47,
    title: "Make A List Of Goals",
    description: "Write It Somewhere.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Cathryn Lavery",
    duration: 20,
  },
  {
    id: 48,
    title: "Don't Buy Any Clothes Today",
    description: "Or challenge yourself for a month!",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Alyssa Strohmann",
    duration: 5,
  },
  {
    id: 49,
    title: "List Your Top 10 Values",
    description: "And see your mindset change.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1606363968796-14be04915c81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Nareeta Martin",
    duration: 20,
  },
  {
    id: 50,
    title: "Set An Intention",
    description: "Start your day with focusing your mind.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1592895792095-85fa785192a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Katerina May",
    duration: 5,
  },
  {
    id: 51,
    title: "Evaluate Your Day",
    description: "What went well and where can you improve?",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1521851562770-de70f34424b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Jeff Dunham",
    duration: 10,
  },
  {
    id: 52,
    title: "Practice Active Listening",
    description: "Understand the world and others better.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1592885066810-83740c1c7795?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Ricardas Brogys",
    duration: 10,
  },
  {
    id: 53,
    title: "Take Responsibility",
    description: "Empower yourself by conscious reactions",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1529079018732-bdb88456f8c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    credit: "Unsplash - Vladislav Babienko",
    duration: 10,
  },
  {
    id: 54,
    title: "Pick a Positive Affirmation",
    description: "Check out our favorite ones.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1507835661088-ac1e84fe645f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1562&q=80",
    credit: "Unsplash - ",
    duration: 10,
  },
  {
    id: 55,
    title: "Spend Money On An Experience",
    description: "Instead of physical objects",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1506370785029-c6f41774f390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    credit: "Unsplash - Frantisek Duris",
    duration: 25,
  },
  {
    id: 56,
    title: "Create a Sharing Table",
    description: "In your apartment building",
    category: CategoryNames.NEIGHBORHOOD,
    imageUrl:
      "https://images.unsplash.com/photo-1502791497946-19c03bc58e77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1419&q=80",
    credit: "Unsplash - Nik",
    duration: 60,
  },
  {
    id: 57,
    title: "Exercise",
    description: "And feel better instantly",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1583873743670-6d60e445a7e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    credit: "Unsplash - Anton Mislawsky",
    duration: 60,
  },
  {
    id: 58,
    title: "Try a New Habit",
    description: "And improve your lifestyle systems.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1525715843408-5c6ec44503b1?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1470",
    credit: "Unsplash - Seven Shooter",
    duration: 60,
  },
  {
    id: 59,
    title: "Make a Small Gesture To Someone You Always See",
    description: "But doesn't really know.",
    category: CategoryNames.NEIGHBORHOOD,
    imageUrl:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&q=80&w=1472&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    credit: "Unsplash - Wonderlane",
    duration: 5,
  },
  {
    id: 60,
    title: "Gift An Experience",
    description: "Instead of objects.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1557151498-af2467d6f7f4?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    credit: "Unsplash - Krzysztof Kowalik",
    duration: 20,
  },
  {
    id: 61,
    title: "Start a New Tradition With a Loved One",
    description: "Enjoy the bonding.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1677658288021-a0aec2c40deb?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    credit: "Unsplash - Kristyna Squared.one",
    duration: 20,
  },
  {
    id: 62,
    title: "Say Yes To Your Child",
    description: "Next time when they come up with an idea.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1591514604904-04365fdb799e?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    credit: "Unsplash - Jo Jo",
    duration: 20,
  },
  {
    id: 63,
    title: "Watch a Standup Comedy",
    description: "And lift your mood instantly.",
    category: CategoryNames.YOU,
    imageUrl:
      "https://images.unsplash.com/photo-1611956425642-d5a8169abd63?auto=format&fit=crop&q=80&w=1511&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    credit: "Unsplash - Michel Grolet",
    duration: 20,
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

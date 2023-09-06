import React from "react";
import { CenterAlignedFlexbox } from "../shared/sharedLayouts";
import { variables } from "../../common/variables";
import Badge from "../shared/badge";
import { ReactComponent as Pants } from "../../img/badges/pants.svg";
import { ReactComponent as Hotel } from "../../img/badges/hotel.svg";
import { ReactComponent as DivingGoggles } from "../../img/badges/diving-goggles.svg";
import { BadgeProps } from "../../common/interfaces";

const BadgeList: React.FC = () => {
  // 1. lets make more + meaningful badges
  // 2. lets create rules for them - add the necessary actions
  // 3. when designing push notifications, let's offer actions that take the user to the next badge
  // 4. lets put the badge on the profile
  // 5. tooltip: on disabled item,s lets show what they need to achieve
  // received ones are clickable and bring up a modal

  const badges: BadgeProps[] = [
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

  return (
    <CenterAlignedFlexbox>
      {badges.map((item) => (
        <Badge key={item.id} {...item} />
      ))}
    </CenterAlignedFlexbox>
  );
};

export default BadgeList;

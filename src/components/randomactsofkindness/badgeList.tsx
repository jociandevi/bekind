import React from "react";
import { CenterAlignedFlexbox } from "../shared/sharedLayouts";
import Badge from "../shared/badge";
import { badges } from "../../common/mockData";

const BadgeList: React.FC = () => {
  // 1. lets make more + meaningful badges
  // 2. lets create rules for them - add the necessary actions
  // 3. when designing push notifications, let's offer actions that take the user to the next badge
  // 4. lets put the badge on the profile
  // 5. tooltip: on disabled item,s lets show what they need to achieve
  // received ones are clickable and bring up a modal

  return (
    <CenterAlignedFlexbox>
      {badges.map((item) => (
        <Badge key={item.id} {...item} />
      ))}
    </CenterAlignedFlexbox>
  );
};

export default BadgeList;

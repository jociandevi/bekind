import React from "react";
import { CenterAlignedFlexbox } from "../shared/sharedLayouts";
import Badge from "../shared/badge";
import { badges } from "../../common/mockData";

const BadgeList: React.FC = () => {
  return (
    <CenterAlignedFlexbox>
      {badges.map((item) => (
        <Badge key={item.id} {...item} />
      ))}
    </CenterAlignedFlexbox>
  );
};

export default BadgeList;

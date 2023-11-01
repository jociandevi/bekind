import React, { useEffect, useState } from "react";
import { CenterAlignedFlexbox } from "../shared/sharedLayouts";
import Badge from "../shared/badge";
import { useGetApi } from "../../common/apiCalls";
import { BadgeProps } from "../../common/interfaces";
import Loading from "../shared/loading";

const BadgeList: React.FC = () => {
  const { callGetApi, loading } = useGetApi(`api/Badge`);
  const [badges, setBadges] = useState<BadgeProps[]>([]);

  useEffect(() => {
    callGetApi().then((res: any) => {
      setBadges(res?.data);
    });
  }, [callGetApi]);

  if (loading) {
    return <Loading />;
  }

  return (
    <CenterAlignedFlexbox style={{ flexWrap: "wrap" }}>
      {badges?.map((item) => (
        <Badge key={item.id} {...item} />
      ))}
    </CenterAlignedFlexbox>
  );
};

export default BadgeList;

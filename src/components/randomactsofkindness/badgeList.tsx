import React, { useEffect, useState } from "react";
import { CenterAlignedFlexbox } from "../shared/sharedLayouts";
import Badge from "../shared/badge";
import { useGetApi } from "../../common/apiCalls";
import { BadgeProps } from "../../common/interfaces";
import Loading from "../shared/loading";
import { spacingXs } from "../../common/variables";

const BadgeList: React.FC = () => {
  const { callGetApi, loading } = useGetApi(`api/Badge`);
  const { callGetApi: getAchievedBadges } = useGetApi(`api/Badge/MemberBadges`);
  const [badges, setBadges] = useState<BadgeProps[]>([]);
  const [achievedBadges, setAchievedBadges] = useState<number[]>([]);

  useEffect(() => {
    callGetApi().then((res: any) => {
      setBadges(res?.data);
    });
  }, [callGetApi]);

  useEffect(() => {
    getAchievedBadges().then((res: { data: BadgeProps[] }) => {
      const achievedBadgeIds = res?.data?.map(({ id }) => id);
      setAchievedBadges(achievedBadgeIds);
    });
  }, [getAchievedBadges]);

  if (loading) {
    return <Loading />;
  }

  return (
    <CenterAlignedFlexbox
      style={{ flexWrap: "wrap", gap: "2vw", padding: spacingXs }}
    >
      {badges?.map((item) => (
        <Badge
          key={item.id}
          item={item}
          achieved={achievedBadges?.includes(item.id)}
        />
      ))}
    </CenterAlignedFlexbox>
  );
};

export default BadgeList;

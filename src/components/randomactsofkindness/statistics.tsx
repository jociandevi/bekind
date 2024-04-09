import React, { useEffect, useState } from "react";
import { ListLayout } from "../shared/sharedLayouts";
import GroupedBarChart from "../shared/groupedBarChart";
import ProfileStatistics from "./profileStatistics";
import { useGetApi } from "../../common/apiCalls";
import { MemberStatistics } from "../../common/interfaces";
import Loading from "../shared/loading";

const Statistics: React.FC = () => {
  const { callGetApi: getMyStats, loading } = useGetApi(
    `api/Member/MemberStatistics`
  );
  const { callGetApi: getAverageStats, loading: avgDataLoading } = useGetApi(
    `api/Member/AverageNumbers`
  );
  const [myStats, setMyStats] = useState<MemberStatistics>();
  const [avgStats, setAvgStats] = useState<number | undefined>();

  useEffect(() => {
    getMyStats().then((res: any) => {
      setMyStats(res?.data);
    });
  }, [getMyStats]);

  useEffect(() => {
    getAverageStats().then((res: any) => {
      if (res && res.data) {
        setAvgStats(res?.data);
      } else if (res === undefined) {
        setAvgStats(0);
      }
    });
  }, [getAverageStats]);

  if (loading || avgDataLoading) {
    return <Loading />;
  }

  return (
    <ListLayout>
      <GroupedBarChart myStats={myStats} />
      <ProfileStatistics myStats={myStats} avgStats={avgStats} />
    </ListLayout>
  );
};

export default Statistics;

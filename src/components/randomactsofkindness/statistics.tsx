import React, { useContext, useEffect, useState } from "react";
import { ListLayout } from "../shared/sharedLayouts";
import GroupedBarChart from "../shared/groupedBarChart";
import { AuthContext } from "../../common/authProvider";
import { useNavigate } from "react-router-dom";
import ProfileStatistics from "./profileStatistics";
import { useGetApi } from "../../common/apiCalls";
import { MemberStatistics } from "../../common/interfaces";
import Loading from "../shared/loading";

const Statistics: React.FC = () => {
  const { user: googleUser } = useContext(AuthContext);
  const navigate = useNavigate();
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
      console.log(res);
      setMyStats(res?.data);
    });
  }, [getMyStats]);

  useEffect(() => {
    getAverageStats().then((res: any) => {
      console.log(res);
      setAvgStats(res?.data);
    });
  }, [getAverageStats]);

  useEffect(() => {
    if (!googleUser) {
      navigate("/");
    }
  }, [navigate, googleUser]);

  if (!googleUser) {
    return null;
  }

  if (loading || avgDataLoading) {
    return <Loading />;
  }

  return (
    <ListLayout>
      <GroupedBarChart myStats={myStats} avgStats={avgStats} />
      <ProfileStatistics myStats={myStats} avgStats={avgStats} />
    </ListLayout>
  );
};

export default Statistics;

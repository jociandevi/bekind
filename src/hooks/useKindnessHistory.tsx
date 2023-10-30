import { useState, useEffect } from "react";
import { useGetApi } from "../common/apiCalls";
import { calculateStreak, getIsPickEnabled } from "../common/util";
import { KindnessHistory } from "../common/interfaces";

function useKindnessHistory(
  callPostKindnessHistory: (data?: any) => Promise<any>,
  isPickEnabled: boolean,
  setIsPickEnabled: (isPickEnabled: boolean) => void,
  user: any
) {
  const {
    callGetApi: getHistory,
    loading,
    error,
  } = useGetApi(`api/KindnessHistory`);
  const [userStreak, setUserStreak] = useState<number | undefined>();
  const [history, setHistory] = useState<KindnessHistory[] | []>([]);

  useEffect(() => {
    async function fetchData() {
      const history = await getHistory();
      setHistory(history?.data);
      const latestDaily = history?.data?.at(0);
      const dailyIsDone = getIsPickEnabled(latestDaily);
      setIsPickEnabled(dailyIsDone);
      const userStreak = calculateStreak(history?.data);
      setUserStreak(userStreak);
    }
    fetchData();
  }, [getHistory, callPostKindnessHistory, setIsPickEnabled, user]);

  return { isPickEnabled, userStreak, loading, error, history };
}

export default useKindnessHistory;

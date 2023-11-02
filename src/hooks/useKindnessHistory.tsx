import { useEffect } from "react";
import { useGetApi } from "../common/apiCalls";
import { calculateStreak, isDailyDone } from "../common/util";
import { useDispatch } from "react-redux";
import { setDailyDone, setUserStreak } from "../common/auth.reducer";

function useKindnessHistory() {
  const {
    callGetApi: getHistory,
    loading,
    error,
  } = useGetApi(`api/KindnessHistory`);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const history = await getHistory();
      const latestDaily = history?.data?.[0];
      const dailyIsDone = isDailyDone(latestDaily);
      dispatch(setDailyDone(dailyIsDone));
      const userStreak = calculateStreak(history?.data);
      dispatch(setUserStreak(userStreak));
    }
    fetchData();
  }, [getHistory, dispatch]);

  return { loading, error, getHistory };
}

export default useKindnessHistory;

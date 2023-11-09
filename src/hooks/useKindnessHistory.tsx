import { useEffect } from "react";
import { useGetApi } from "../common/apiCalls";
import { calculateStreak, isDailyDone } from "../common/util";
import { useDispatch, useSelector } from "react-redux";
import { setDailyDone, setUserStreak } from "../common/auth.reducer";
import { selectUser } from "../redux/selectors";

function useKindnessHistory() {
  const {
    callGetApi: getHistory,
    loading,
    error,
  } = useGetApi(`api/KindnessHistory`);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchData() {
      const history = await getHistory();
      const latestDaily = history?.data?.[0];
      const dailyIsDone = isDailyDone(latestDaily);
      dispatch(setDailyDone(dailyIsDone));
      const userStreak = calculateStreak(history?.data);
      dispatch(setUserStreak(userStreak));
    }
    fetchData();
  }, [getHistory, dispatch, user]);

  return { loading, error, getHistory };
}

export default useKindnessHistory;

import React, { Suspense, useEffect, useState } from "react";
import { ListLayout } from "../shared/sharedLayouts";
import { categories } from "../../common/mockData";
import { Category, KindnessAction } from "../../common/interfaces";
import { useSearchParams } from "react-router-dom";
import { useGetApi } from "../../common/apiCalls";
import { shuffleArray } from "../../common/util";
import useKindnessHistory from "../../hooks/useKindnessHistory";
import Loading from "../shared/loading";
import Header from "../shared/header";
import BackButton from "../shared/backButton";
import UserProfileIcon from "../shared/userProfileIcon";
import CardContainer from "../shared/cardContainer";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { spacingXs } from "../../common/variables";
import Tour from "../shared/tour";
import { showUserJourney } from "../shared/userJourney";
import CookieAlert from "../shared/cookieAlert";
import Blurred from "../shared/blurred";

const InstallModal = React.lazy(
  () => import("../shared/pwaCustomInstalls/installModal")
);
const InstallButton = React.lazy(
  () => import("../shared/pwaCustomInstalls/installButton")
);
const InstallAlert = React.lazy(
  () => import("../shared/pwaCustomInstalls/installAlert")
);
const InstallIosAlert = React.lazy(
  () => import("../shared/pwaCustomInstalls/installIosAlert")
);
const ActionSuggestionModal = React.lazy(
  () => import("./modals/actionSuggestionModal")
);
const PageError = React.lazy(() => import("../shared/pageError"));
const Search = React.lazy(() => import("../shared/search"));
const SignalRConnector = React.lazy(() => import("../shared/signalRConnector"));

const RandomActOfKindnessList: React.FC = () => {
  const user = useSelector(selectUser);
  const [actions, setActions] = useState<KindnessAction[] | []>([]);
  const [likedActions, setLikedActions] = useState<number[] | []>([]);
  const [filteredActions, setFilteredActions] = useState<KindnessAction[] | []>(
    []
  );
  let [searchParams, setSearchParams] = useSearchParams();
  const { callGetApi, loading, error } = useGetApi("api/Kindness");
  const { getHistory } = useKindnessHistory();
  const { callGetApi: getLikedActions } = useGetApi(`api/LikedKindness`);
  // track if API call was ever successful - needed because sometimes the first API call returns with ERR_UNREACHABLE but second is 200
  const [apiSuccess, setApiSuccess] = useState(false);
  const [tourIsVisible, setTourIsVisible] = useState(false);
  const [requireLogin, setRequireLogin] = useState(false);

  useEffect(() => {
    // lets implement A/B testing for this page
    const hostname = window.location.hostname;
    const requiresLogin = hostname.startsWith("app.");
    if (requiresLogin && user === null) {
      setRequireLogin(true);
    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      const actions = await callGetApi();
      const shuffled = shuffleArray(actions?.data);
      setActions(shuffled);
      setFilteredActions(shuffled);
      if (actions?.status === 200) {
        setApiSuccess(true);
      }
    }
    fetchData();
  }, [callGetApi]);

  useEffect(() => {
    const showTour = showUserJourney();
    setTourIsVisible(showTour);
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchData() {
      await getHistory();
    }
    fetchData();
  }, [getHistory, user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchData() {
      const actions = await getLikedActions();
      setLikedActions(actions?.data);
    }
    fetchData();
  }, [getLikedActions, user]);

  useEffect(() => {
    const category = searchParams.get("category");
    const categoryId = categories.find((item) => item.name === category)?.id;

    if (category) {
      const filteredRaoks = actions.filter((item) => {
        return item.category === categoryId;
      });
      setFilteredActions(filteredRaoks);
    } else if (searchParams.size === 0) {
      setFilteredActions(actions);
    }
  }, [searchParams, actions]);

  const filterByCategory = (category: Category) => {
    if (category.name === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: category.name });
    }
  };

  if (tourIsVisible) {
    return <Tour setTourIsVisible={setTourIsVisible} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {requireLogin && <Blurred />}
      <ListLayout>
        <Header
          left={searchParams.size === 0 ? undefined : <BackButton />}
          right={<UserProfileIcon user={user} />}
        />
        <Suspense fallback={<></>}>
          <Search actions={actions} setFilteredActions={setFilteredActions} />
        </Suspense>
        {error && !apiSuccess && (
          <Suspense fallback={<Loading />}>
            <PageError
              message="An error happened, sorry!"
              tryAgain
              style={{ margin: spacingXs }}
            />
          </Suspense>
        )}
        <CardContainer
          actions={filteredActions}
          likedActions={likedActions}
          filterByCategory={filterByCategory}
        />
        <Suspense fallback={<></>}>
          <InstallButton />
        </Suspense>
        <Suspense fallback={<></>}>
          <InstallAlert />
        </Suspense>
        <Suspense fallback={<></>}>
          <CookieAlert />
        </Suspense>
        <Suspense fallback={<></>}>
          <InstallIosAlert />
        </Suspense>
        <Suspense fallback={<></>}>
          <InstallModal />
        </Suspense>
        {user && (
          <Suspense fallback={<></>}>
            <SignalRConnector />
          </Suspense>
        )}
        {user && actions && (
          <Suspense fallback={<></>}>
            <ActionSuggestionModal user={user} actions={actions} />
          </Suspense>
        )}
      </ListLayout>
    </>
  );
};

export default RandomActOfKindnessList;

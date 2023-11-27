import React, { Fragment, useEffect, useState } from "react";
import {
  CenterAlignedFlexboxCol,
  CircleImage,
  StyledText,
} from "../shared/sharedLayouts";
import Tabs from "antd/es/tabs";
import styled from "styled-components";
import { Tooltip, type TabsProps } from "antd";
import ImageCardM from "../shared/imageCardM";
import Title from "antd/es/typography/Title";
import BadgeList from "./badgeList";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { useNavigate } from "react-router-dom";
import { KindnessHistory, BadgeProps } from "../../common/interfaces";
import InstallButton from "../shared/pwaCustomInstalls/installButton";
import Header from "../shared/header";
import BackButton from "../shared/backButton";
import { useGetApi } from "../../common/apiCalls";
import Loading from "../shared/loading";
import PageError from "../shared/pageError";
import useKindnessHistory from "../../hooks/useKindnessHistory";
import Statistics from "./statistics";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { middleGray, pink3, spacingS, spacingXs } from "../../common/variables";
import { badgeIcons } from "../../common/mockData";

const StyledTab = styled(Tabs)`
  margin-top: ${spacingXs};

  & div.ant-tabs-nav-list {
    margin-left: ${spacingXs};
  }

  & div.ant-tabs-tab.ant-tabs-tab-active {
    background-color: ${pink3};
    border-radius: 15px;

    & .ant-tabs-tab-btn {
      color: white;
      padding: 0 ${spacingXs};
    }
  }

  & div.ant-tabs-ink-bar {
    position: absolute;
    background: transparent;
    pointer-events: none;
  }
`;

const ProfileImageContainer = styled.div<{ md?: boolean }>`
  position: relative;
  height: ${(props) => (props.md ? "15vw" : "30vw")};
  width: ${(props) => (props.md ? "15vw" : "30vw")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeContainer = styled.div<{ color?: string }>`
  position: absolute;
  border-radius: 50%;
  height: 110%;
  width: 110%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) =>
    `inset 0 0 2px 2px ${props.color}, 0 0 4px 2px ${props.color}`};
  cursor: pointer;
`;

const Profile: React.FC = () => {
  const { md } = useMediaQueries();
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const { getHistory, loading, error } = useKindnessHistory();
  const { callGetApi: getLiked } = useGetApi(`api/LikedKindness`);
  const [pastActions, setPastActions] = useState<KindnessHistory[] | []>([]);
  const [likedActions, setLikedActions] = useState<number[] | []>([]);
  const { callGetApi: getAchievedBadges } = useGetApi(`api/Badge/MemberBadges`);
  const [badgeColor, setBadgeColor] = useState<string | undefined>();
  const [latestBadge, setLatestBadge] = useState<BadgeProps | undefined>();

  useEffect(() => {
    getHistory().then((res) => {
      setPastActions(res?.data);
    });
  }, [getHistory]);

  useEffect(() => {
    getLiked().then((res: any) => {
      setLikedActions(res?.data);
    });
  }, [getLiked]);

  useEffect(() => {
    getAchievedBadges().then((res: { data: BadgeProps[] }) => {
      const latest = res?.data?.[res?.data?.length - 1];
      setLatestBadge(latest);
      const color = badgeIcons.find((item) => item.id === latest.id)?.color;
      setBadgeColor(color);
    });
  }, [getAchievedBadges]);

  const getDate = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Likes`,
      children: (
        <>
          {likedActions.map((actionId, index) => (
            <ImageCardM item={actionId} key={index} />
          ))}
        </>
      ),
    },
    {
      key: "2",
      label: `History`,
      children: (
        <>
          {pastActions.map((item) => (
            <Fragment key={item.id}>
              <StyledText
                color={middleGray}
                fontSize="12px"
                style={{ marginLeft: spacingXs }}
              >
                {getDate(item.createdDate)}
              </StyledText>

              <ImageCardM item={item} />
            </Fragment>
          ))}
        </>
      ),
    },
    {
      key: "3",
      label: `Badges`,
      children: <BadgeList />,
    },
    {
      key: "4",
      label: `Statistics`,
      children: <Statistics />,
    },
  ];

  const [activeKey, setActiveKey] = useState(items[0].key);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (!user) {
    return null;
  }

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const renderLatestAchievedBadge = () => {
    return (
      <BadgeContainer color={badgeColor} onClick={() => setActiveKey("3")} />
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header left={<BackButton />} />
      <CenterAlignedFlexboxCol style={{ marginTop: `-${spacingS}` }}>
        <Tooltip title={latestBadge?.description}>
          <ProfileImageContainer md={md}>
            <CircleImage
              src={user.picture}
              alt={`Profile picture of ${user.firstName}`}
              md={md}
              style={{ position: "absolute", top: "0", left: "0", zIndex: 1 }}
            />
            {renderLatestAchievedBadge()}
          </ProfileImageContainer>
        </Tooltip>

        <Title level={4} style={{ marginTop: spacingS }}>
          {user.firstName} {user.lastName}
        </Title>
      </CenterAlignedFlexboxCol>

      <StyledTab
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        activeKey={activeKey}
      />
      {error && (
        <PageError
          message="An error happened, sorry!"
          style={{ margin: spacingXs }}
        />
      )}
      <InstallButton />
    </>
  );
};

export default Profile;

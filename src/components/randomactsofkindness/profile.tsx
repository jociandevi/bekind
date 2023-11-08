import React, { Fragment, useEffect, useState } from "react";
import {
  CenterAlignedFlexboxCol,
  CircleImage,
  StyledText,
} from "../shared/sharedLayouts";
import { Tabs } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import type { TabsProps } from "antd";
import ImageCardM from "../shared/imageCardM";
import Title from "antd/es/typography/Title";
import BadgeList from "./badgeList";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Pants } from "../../img/badges/pants.svg";
import { KindnessHistory } from "../../common/interfaces";
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

const StyledTab = styled(Tabs)`
  margin-top: ${variables.spacingXs};

  & div.ant-tabs-nav-list {
    margin-left: ${variables.spacingXs};
  }

  & div.ant-tabs-tab.ant-tabs-tab-active {
    background-color: ${variables.pink3};
    border-radius: 15px;

    & .ant-tabs-tab-btn {
      color: white;
      padding: 0 ${variables.spacingXs};
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
`;

const BadgeContainer = styled.div<{ md?: boolean }>`
  position: absolute;
  bottom: 2vw;
  border-radius: 50%;
  background-color: ${variables.pink1};
  height: ${(props) => (props.md ? "5vw" : "10vw")};
  width: ${(props) => (props.md ? "5vw" : "10vw")};
  left: ${(props) => (props.md ? "13vw" : "25vw")};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Profile: React.FC = () => {
  const { md } = useMediaQueries();
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const { getHistory, loading, error } = useKindnessHistory();
  const { callGetApi: getLiked } = useGetApi(`api/LikedKindness`);
  const [pastActions, setPastActions] = useState<KindnessHistory[] | []>([]);
  const [likedActions, setLikedActions] = useState<number[] | []>([]);

  useEffect(() => {
    getHistory().then((res) => {
      setPastActions(res.data);
    });
  }, [getHistory]);

  useEffect(() => {
    getLiked().then((res: any) => {
      setLikedActions(res?.data);
    });
  }, [getLiked]);

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
                color={variables.middleGray}
                fontSize="12px"
                style={{ marginLeft: variables.spacingXs }}
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
    // API: get from last achieved badge from backend and show that
    return (
      <BadgeContainer md={md} onClick={() => setActiveKey("3")}>
        <Pants
          width={md ? 50 : 25}
          height={md ? 50 : 25}
          stroke={variables.darkGray}
        />
      </BadgeContainer>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header left={<BackButton />} />
      <CenterAlignedFlexboxCol style={{ marginTop: `-${variables.spacingS}` }}>
        <ProfileImageContainer md={md}>
          <CircleImage
            src={user.picture}
            alt={`Profile picture of ${user.firstName}`}
            md={md}
            style={{ position: "absolute", top: "0", left: "0" }}
          />
          {renderLatestAchievedBadge()}
        </ProfileImageContainer>
        <Title level={4} style={{ marginTop: variables.spacingS }}>
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
          style={{ margin: variables.spacingXs }}
        />
      )}
      <InstallButton />
    </>
  );
};

export default Profile;

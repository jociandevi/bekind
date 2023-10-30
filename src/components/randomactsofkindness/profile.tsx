import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  CenterAlignedFlexboxCol,
  CircleImage,
  StyledText,
} from "../shared/sharedLayouts";
import { Button, Tabs } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import type { TabsProps } from "antd";
import ImageCardM from "../shared/imageCardM";
import Title from "antd/es/typography/Title";
import BadgeList from "./badgeList";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { AuthContext } from "../../common/authProvider";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Pants } from "../../img/badges/pants.svg";
import { BarChartOutlined } from "@ant-design/icons";
import ConfirmModal from "./modals/confirmModal";
import FeedbackModal from "./modals/feedbackModal";
import { KindnessAction, KindnessHistory } from "../../common/interfaces";
import InstallButton from "../shared/pwaCustomInstalls/installButton";
import Header from "../shared/header";
import BackButton from "../shared/backButton";
import { usePostApi } from "../../common/apiCalls";
import Loading from "../shared/loading";
import PageError from "../shared/pageError";
import useKindnessHistory from "../../hooks/useKindnessHistory";

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
  const { user: googleUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isPickEnabled, setIsPickEnabled] = useState(true);
  const [daily, setDaily] = useState<KindnessAction | undefined>();
  const { callPostApi: callPostKindnessHistory } = usePostApi(
    `api/KindnessHistory/${daily?.id}`
  );
  const { userStreak, loading, error, history } = useKindnessHistory(
    callPostKindnessHistory,
    isPickEnabled,
    setIsPickEnabled,
    googleUser
  );

  const [dailies, setDailies] = useState<KindnessHistory[] | []>([]);

  useEffect(() => {
    setDailies(history);
  }, [history]);

  const onPick = (
    event: React.MouseEvent<HTMLElement>,
    item: KindnessAction
  ) => {
    event.stopPropagation();
    setDaily(item);
    setIsConfirmModalOpen(true);
  };

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
          {/* {user.liked.map((item) => (
            <ImageCardM
              item={item}
              key={item.id}
              onPick={onPick}
              isPickEnabled={isPickEnabled}
            />
          ))} */}
        </>
      ),
    },
    {
      key: "2",
      label: `History`,
      children: (
        <>
          {dailies.map((item) => (
            <Fragment key={item.id}>
              <StyledText
                color={variables.middleGray}
                fontSize="12px"
                style={{ marginLeft: variables.spacingXs }}
              >
                {getDate(item.createdDate)}
              </StyledText>

              <ImageCardM
                item={item}
                onPick={onPick}
                isPickEnabled={isPickEnabled}
              />
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
  ];

  const [activeKey, setActiveKey] = useState(items[0].key);

  useEffect(() => {
    if (!googleUser) {
      navigate("/");
    }
  }, [navigate, googleUser]);

  if (!googleUser) {
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

  const onConfirmOk = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsConfirmModalOpen(false);
    callPostKindnessHistory().then((res: any) => {
      console.log(res);
    });
    setIsFeedbackModalOpen(true);
    setIsPickEnabled(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            icon={<BarChartOutlined />}
            style={{ border: "none" }}
            size="large"
            onClick={() => navigate("/statistics")}
          />
        }
      />
      <ConfirmModal
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
        onOk={onConfirmOk}
      />
      <FeedbackModal
        isModalOpen={isFeedbackModalOpen}
        setIsModalOpen={setIsFeedbackModalOpen}
        userName={googleUser?.firstName ?? undefined}
        userStreak={userStreak}
      />

      <CenterAlignedFlexboxCol style={{ marginTop: `-${variables.spacingS}` }}>
        <ProfileImageContainer md={md}>
          <CircleImage
            src={googleUser.picture}
            alt={`Profile picture of ${googleUser.name}`}
            md={md}
            style={{ position: "absolute", top: "0", left: "0" }}
          />
          {renderLatestAchievedBadge()}
        </ProfileImageContainer>
        <Title level={4} style={{ marginTop: variables.spacingS }}>
          {googleUser.firstName} {googleUser.lastName}
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

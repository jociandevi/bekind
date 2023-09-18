import React, { useContext, useEffect, useState } from "react";
import { CircleImage, Flexbox, StyledGrid } from "../shared/sharedLayouts";
import { Button, Tabs } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import type { TabsProps } from "antd";
import ImageCardM from "../shared/imageCardM";
import Title from "antd/es/typography/Title";
import BadgeList from "./badgeList";
import { user } from "../../common/mockData";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { AuthContext } from "../../common/authProvider";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Pants } from "../../img/badges/pants.svg";
import { BarChartOutlined } from "@ant-design/icons";

const StyledTab = styled(Tabs)`
  margin-top: ${variables.spacingS};

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

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Likes`,
      children: (
        <>
          {user.liked.map((item) => (
            <ImageCardM item={item} key={item.id} />
          ))}
        </>
      ),
    },
    {
      key: "2",
      label: `History`,
      children: (
        <>
          {user.history.map((item) => (
            <ImageCardM item={item} key={item.id} />
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
      navigate("/kindness");
    }
  }, [navigate, googleUser]);

  if (!googleUser) {
    return null;
  }

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const renderLatestAchievedBadge = () => {
    // get from last achieved badge from backend and show that
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

  return (
    <StyledGrid>
      <Flexbox
        style={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <ProfileImageContainer md={md}>
          <CircleImage
            src={googleUser.picture}
            alt={`Profile picture of ${googleUser.name}`}
            md={md}
            style={{ position: "absolute", top: "0", left: "0" }}
          />
          {renderLatestAchievedBadge()}
        </ProfileImageContainer>
        <Button
          icon={<BarChartOutlined />}
          style={{ border: "none" }}
          size="large"
          onClick={() => navigate("/statistics")}
        />
      </Flexbox>

      <Title level={4}>
        {googleUser.given_name} {googleUser.family_name}
      </Title>
      <StyledTab
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        activeKey={activeKey}
      />
    </StyledGrid>
  );
};

export default Profile;

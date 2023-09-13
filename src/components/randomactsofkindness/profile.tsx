import React, { useContext, useEffect } from "react";
import { CircleImage, StyledGrid } from "../shared/sharedLayouts";
import { Tabs } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import type { TabsProps } from "antd";
import ImageCardM from "../shared/imageCardM";
import Title from "antd/es/typography/Title";
import BadgeList from "./badgeList";
import { user } from "../../common/mockData";
import GroupedBarChart from "../shared/groupedBarChart";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { AuthContext } from "../../common/authProvider";
import { useNavigate } from "react-router-dom";

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

const Profile: React.FC = () => {
  const { md } = useMediaQueries();
  const { user: googleUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!googleUser) {
      navigate("/random-act-of-kindness");
    }
  }, [navigate, googleUser]);

  if (!googleUser) {
    return null;
  }

  const onChange = (key: string) => {
    console.log(key);
  };

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
          <GroupedBarChart />
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

  return (
    <StyledGrid>
      <CircleImage
        src={googleUser.picture}
        alt={`Profile picture of ${googleUser.name}`}
        md={md}
      />
      <Title level={4}>
        {googleUser.given_name} {googleUser.family_name}
      </Title>
      <StyledTab defaultActiveKey="1" items={items} onChange={onChange} />
    </StyledGrid>
  );
};

export default Profile;

import React from "react";
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
      <CircleImage src={user.photoUrl} alt={user.firstName} md={md} />
      <Title level={4}>
        {user.firstName} {user.lastName}
      </Title>
      <StyledTab defaultActiveKey="1" items={items} onChange={onChange} />
    </StyledGrid>
  );
};

export default Profile;

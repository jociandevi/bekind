import React from "react";
import { StyledGrid } from "../shared/sharedLayouts";
import { Tabs } from "antd";
import { devices } from "../shared/imageCardL";
import { variables } from "../../common/variables";
import styled from "styled-components";
import type { TabsProps } from "antd";
import { raoks } from "./randomActsOfKindnessList";
import ImageCardM from "../shared/imageCardM";
import ProfileStatistics from "./profileStatistics";
import Title from "antd/es/typography/Title";
import BadgeList from "./badgeList";

const Image = styled.img`
  width: 30vw;
  height: 30vw;
  @media only screen and ${devices.md} {
    width: 15vw;
    height: 15vw;
  }
  object-fit: cover;
  border-radius: 50%;
`;

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
  const user = {
    id: 1,
    firstName: "Liza",
    lastName: "Bailey",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    liked: [...raoks],
    history: [...raoks],
  };

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
      <Title level={3}>Profile</Title>
      <Image src={user.photoUrl} alt={user.firstName} />
      <Title level={4}>
        {user.firstName} {user.lastName}
      </Title>
      <ProfileStatistics />
      <StyledTab defaultActiveKey="1" items={items} onChange={onChange} />
    </StyledGrid>
  );
};

export default Profile;

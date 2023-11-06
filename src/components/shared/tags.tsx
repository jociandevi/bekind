import React from "react";
import { Flexbox, TagButton } from "./sharedLayouts";
import { Button, Tooltip } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { lgBreakPoint, mdBreakPoint } from "../../common/mediaQueryHook";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { KindnessAction } from "../../common/interfaces";

const TagContainer = styled(Flexbox)`
  gap: ${variables.spacingXs};
  justify-content: flex-start;
`;

const StyledButtonText = styled.span`
  overflow: hidden;
  white-space: nowrap;
  display: block !important;
  text-overflow: ellipsis;
`;

export const ArticleImage = styled.img`
  width: 100vw;
  @media only screen and ${mdBreakPoint} {
    width: 75vw;
  }
  @media only screen and ${lgBreakPoint} {
    width: 50vw;
  }
  height: ${50 / 1.618}vw;
  border-radius: 0;
  object-fit: cover;
`;

interface Props {
  item: KindnessAction;
}

const Tags: React.FC<Props> = ({ item }) => {
  // API: GET /kindnessHistory/:id/count >> get total number of times this kindness has been done
  const totalTimesDone = 110;

  return (
    <TagContainer>
      <Tooltip title={item.title}>
        <Button
          type="primary"
          size="small"
          style={{
            borderRadius: "15px",
            maxWidth: "50vw",
          }}
        >
          <StyledButtonText>{item.title}</StyledButtonText>
        </Button>
      </Tooltip>
      <TagButton
        size="small"
        icon={<UserOutlined />}
        style={{ borderRadius: "15px" }}
      >
        {totalTimesDone}
      </TagButton>
      <TagButton
        size="small"
        icon={<ClockCircleOutlined />}
        style={{ borderRadius: "15px" }}
      >
        {item.duration ?? 20}min
      </TagButton>
    </TagContainer>
  );
};

export default Tags;

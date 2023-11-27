import React from "react";
import { Flexbox, TagButton } from "./sharedLayouts";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";
import styled from "styled-components";
import { KindnessAction } from "../../common/interfaces";
import { spacingXs } from "../../common/variables";
import { useNavigate } from "react-router-dom";

const TagContainer = styled(Flexbox)`
  gap: ${spacingXs};
  justify-content: space-between;
`;

const StyledButtonText = styled.span`
  overflow: hidden;
  white-space: nowrap;
  display: block !important;
  text-overflow: ellipsis;
`;

interface Props {
  item: KindnessAction;
}

const Tags: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <TagContainer>
      <Tooltip title="How about trying this today?">
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
        style={{ borderRadius: "15px" }}
        onClick={() => navigate("/")}
      >
        by Eva
      </TagButton>
    </TagContainer>
  );
};

export default Tags;

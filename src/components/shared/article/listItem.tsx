import React from "react";
import { StyledText } from "../sharedLayouts";
import { variables } from "../../../common/variables";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";

interface Props {
  text: string;
}

const ListItemContainer = styled.div`
  margin-bottom: ${variables.spacingXs};
`;

const ListItem: React.FC<Props> = ({ text }) => {
  const cleanedText = text.replace(/^\s*-?\s*/, "");
  const [title, description] = cleanedText
    .split(":")
    .map((part) => part.trim());
  return (
    <ListItemContainer>
      <RightOutlined
        style={{
          fontSize: "12px",
          color: variables.pink3,
          margin: `auto ${variables.spacingXs}`,
        }}
      />
      <StyledText color={variables.middleGray} fontSize="14px" fontWeight="800">
        {title}
        {description && ": "}
      </StyledText>
      <StyledText color={variables.middleGray} fontSize="14px">
        {description}
      </StyledText>
    </ListItemContainer>
  );
};

export default ListItem;

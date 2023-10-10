import React from "react";
import { variables } from "../../../common/variables";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import ArticleText from "./articleText";

interface Props {
  text: string;
}

const ListItemContainer = styled.div`
  margin-bottom: ${variables.spacingXs};
`;

const ListItem: React.FC<Props> = ({ text }) => {
  const cleanedText = text.replace(/^\s*-?\s*/, "");

  const index = cleanedText.indexOf(":");
  const title = cleanedText.substring(0, index).trim();
  const description = cleanedText.substring(index + 1).trim();

  return (
    <ListItemContainer>
      <RightOutlined
        style={{
          fontSize: "12px",
          color: variables.pink3,
          margin: `auto ${variables.spacingXs}`,
        }}
      />
      <ArticleText text={title} fontWeight={800} />
      {description && <ArticleText text=": " fontWeight={800} />}
      <ArticleText text={description} />
    </ListItemContainer>
  );
};

export default ListItem;

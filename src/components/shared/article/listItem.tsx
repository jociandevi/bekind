import React from "react";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import ArticleText from "./articleText";
import { spacingXs, pink3 } from "../../../common/variables";

interface Props {
  text: string;
}

const ListItemContainer = styled.div`
  margin-bottom: ${spacingXs};
  margin-left: ${spacingXs};
`;

const ListItem: React.FC<Props> = ({ text }) => {
  const cleanedText = text.replace(/^\s*-?\s*/, "");

  let title = cleanedText;
  let description = "";

  // Find the position of the first colon that is not part of a URL and not inside a markdown link
  const regex = /(?<!https?):(?![^[]*\])/;
  const match = cleanedText.match(regex);
  if (match) {
    const index = match.index;
    title = cleanedText.substring(0, index).trim();
    description = index ? cleanedText.substring(index + 1).trim() : "";
  }
  return (
    <ListItemContainer>
      <RightOutlined
        style={{
          fontSize: "12px",
          color: pink3,
          margin: `auto ${spacingXs} 0 0`,
        }}
      />
      <ArticleText text={title} fontWeight={800} />
      {description && title && <ArticleText text=": " fontWeight={800} />}
      <ArticleText text={description} />
    </ListItemContainer>
  );
};

export default ListItem;

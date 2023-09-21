import React, { Fragment } from "react";
import { FlexboxCol, StyledText } from "./sharedLayouts";
import { ArticleElement, ArticlePart } from "../../common/interfaces";
import { variables } from "../../common/variables";
import Title from "antd/es/typography/Title";

interface Props {
  article?: ArticlePart[];
}

const Article: React.FC<Props> = ({ article }) => {
  return (
    <FlexboxCol>
      {article?.map((item, index) => (
        <Fragment key={index}>
          {item.type === ArticleElement.TEXT && (
            <StyledText color={variables.middleGray} fontSize="14px">
              {item.text}
            </StyledText>
          )}
          {item.type === ArticleElement.HEADER_LARGE && (
            <Title level={4}>{item.text}</Title>
          )}
          {item.type === ArticleElement.HEADER_MEDIUM && (
            <Title level={5}>{item.text}</Title>
          )}
        </Fragment>
      ))}
    </FlexboxCol>
  );
};

export default Article;

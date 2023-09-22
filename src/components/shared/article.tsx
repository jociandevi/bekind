import React, { Fragment } from "react";
import { FlexboxCol, StyledText } from "./sharedLayouts";
import { ArticleElement, ArticlePart } from "../../common/interfaces";
import { variables } from "../../common/variables";
import Title from "antd/es/typography/Title";
import styled from "styled-components";
import { lgBreakPoint, mdBreakPoint } from "../../common/mediaQueryHook";

interface Props {
  article?: ArticlePart[];
}

export const ArticleContainer = styled(FlexboxCol)`
  width: 90vw;
  @media only screen and ${mdBreakPoint} {
    width: 75vw;
  }
  @media only screen and ${lgBreakPoint} {
    width: 50vw;
  }
`;

const Article: React.FC<Props> = ({ article }) => {
  return (
    <ArticleContainer>
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
    </ArticleContainer>
  );
};

export default Article;

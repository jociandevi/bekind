import React, { Fragment, useEffect, useState } from "react";
import {
  CenterAlignedFlexboxCol,
  FlexboxCol,
  StyledText,
} from "./sharedLayouts";
import {
  ArticleElement,
  ArticlePart,
  KindnessAction,
} from "../../common/interfaces";
import { variables } from "../../common/variables";
import Title from "antd/es/typography/Title";
import styled from "styled-components";
import { lgBreakPoint, mdBreakPoint } from "../../common/mediaQueryHook";
import axios from "axios";
import { ArticleImage } from "../randomactsofkindness/kindnessDetails";

interface Props {
  item: KindnessAction;
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

const Article: React.FC<Props> = ({ item }) => {
  const [article, setArticle] = useState<ArticlePart[]>([]);

  useEffect(() => {
    axios
      .get(`/articles/article_${item.id}.json`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the article data:", error);
      });
  }, [item.id]);

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
          {item.type === ArticleElement.IMAGE && (
            <CenterAlignedFlexboxCol>
              <ArticleImage
                style={{ margin: `${variables.spacingS} 0 0` }}
                src={item.text}
                alt="Image of related to subheader"
              />
              <StyledText color={variables.middleGray} fontSize="10px">
                {item.credit}
              </StyledText>
            </CenterAlignedFlexboxCol>
          )}
        </Fragment>
      ))}
    </ArticleContainer>
  );
};

export default Article;

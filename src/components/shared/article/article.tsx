import React, { Fragment, useEffect, useState } from "react";
import {
  CenterAlignedFlexboxCol,
  FlexboxCol,
  StyledText,
} from "../sharedLayouts";
import {
  ArticleElement,
  ArticlePart,
  KindnessAction,
} from "../../../common/interfaces";
import { variables } from "../../../common/variables";
import Title from "antd/es/typography/Title";
import styled from "styled-components";
import { lgBreakPoint, mdBreakPoint } from "../../../common/mediaQueryHook";
import axios from "axios";
import { ArticleImage } from "../../randomactsofkindness/kindnessDetails";
import ListItem from "./listItem";
import Text from "./text";
import { Button } from "antd";

interface Props {
  item: KindnessAction;
  onPick: (event: React.MouseEvent<HTMLElement>) => void;
  isPickEnabled: boolean;
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

const Article: React.FC<Props> = ({ item, onPick, isPickEnabled }) => {
  const [article, setArticle] = useState<ArticlePart[]>([]);

  useEffect(() => {
    const convertItemTitleToJsonName = () => {
      const title = item.title;
      return title
        .replace(/'/g, "")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
    };
    axios
      .get(`/articles/article_${convertItemTitleToJsonName()}.json`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the article data:", error);
      });
  }, [item.title]);

  return (
    <>
      <ArticleContainer>
        {article?.map((item, index) => (
          <Fragment key={index}>
            {item.type === ArticleElement.TEXT && (
              <StyledText
                color={variables.middleGray}
                fontSize="14px"
                style={{ marginBottom: variables.spacingXs }}
              >
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
                  alt="Image related to subheader"
                />
                <StyledText color={variables.middleGray} fontSize="10px">
                  {item.credit}
                </StyledText>
              </CenterAlignedFlexboxCol>
            )}
            {item.type === ArticleElement.LIST_ITEM && (
              <ListItem text={item.text} />
            )}
          </Fragment>
        ))}
        <Button
          type="primary"
          style={{ marginTop: variables.spacingS }}
          onClick={onPick}
          disabled={!isPickEnabled}
        >
          Pick
        </Button>
      </ArticleContainer>
      <ArticleContainer
        style={{ marginTop: variables.spacingL, display: "inline" }}
      >
        {article?.map((item, index) => (
          <Fragment key={index}>
            {item.type === ArticleElement.FOOTNOTE && (
              <Text fontSize="10px" text={item.text} />
            )}
          </Fragment>
        ))}
      </ArticleContainer>
    </>
  );
};

export default Article;

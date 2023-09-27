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
import { RightOutlined } from "@ant-design/icons";

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

const ListItemContainer = styled.div`
  margin-bottom: ${variables.spacingXs};
`;

const Article: React.FC<Props> = ({ item }) => {
  const [article, setArticle] = useState<ArticlePart[]>([]);

  useEffect(() => {
    const concvertItemTitleToJsonName = () => {
      const title = item.title;
      return title
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
    };
    axios
      .get(`/articles/article_${concvertItemTitleToJsonName()}.json`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the article data:", error);
      });
  }, [item.title]);

  const renderListItem = (text: string) => {
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
        <StyledText
          color={variables.middleGray}
          fontSize="14px"
          fontWeight="800"
        >
          {title}
          {": "}
        </StyledText>
        <StyledText color={variables.middleGray} fontSize="14px">
          {description}
        </StyledText>
      </ListItemContainer>
    );
  };

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
                  alt="Image of related to subheader"
                />
                <StyledText color={variables.middleGray} fontSize="10px">
                  {item.credit}
                </StyledText>
              </CenterAlignedFlexboxCol>
            )}
            {item.type === ArticleElement.LIST_ITEM &&
              renderListItem(item.text)}
          </Fragment>
        ))}
      </ArticleContainer>
      <ArticleContainer style={{ marginTop: variables.spacingL }}>
        {article?.map((item, index) => (
          <Fragment key={index}>
            {item.type === ArticleElement.FOOTNOTE && (
              <StyledText
                color={variables.middleGray}
                fontSize="10px"
                style={{ marginBottom: variables.spacingXs }}
              >
                {item.text}
              </StyledText>
            )}
          </Fragment>
        ))}
      </ArticleContainer>
    </>
  );
};

export default Article;

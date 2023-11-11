import React, { Fragment, Suspense, useEffect, useState } from "react";
import {
  CenterAlignedFlexboxCol,
  FlexboxCol,
  StyledText,
} from "../sharedLayouts";
import {
  ArticleElement,
  ArticlePart,
  KindnessAction,
  LegalArticle,
} from "../../../common/interfaces";
import Title from "antd/es/typography/Title";
import styled from "styled-components";
import { lgBreakPoint, mdBreakPoint } from "../../../common/mediaQueryHook";
import axios from "axios";
import { ArticleImage } from "../../randomactsofkindness/kindnessDetails";
import ListItem from "./listItem";
import ArticleText from "./articleText";
import GoogleMap from "./googleMap";
import PickButton from "../pickButton";
import Loading from "../loading";
import {
  darkGray,
  middleGray,
  spacingL,
  spacingS,
} from "../../../common/variables";

const Youtube = React.lazy(() => import("./youtube"));
const Canva = React.lazy(() => import("./canva"));

interface Props {
  kindness: KindnessAction | LegalArticle;
  isPureText?: boolean;
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

const Article: React.FC<Props> = ({ kindness, isPureText = false }) => {
  const [article, setArticle] = useState<ArticlePart[]>([]);

  useEffect(() => {
    const convertItemTitleToJsonName = () => {
      const title = kindness.title;
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
  }, [kindness.title]);

  return (
    <>
      <ArticleContainer>
        {article?.map((item, index) => (
          <Fragment key={index}>
            {item.type === ArticleElement.TEXT && (
              <ArticleText text={item.text} />
            )}
            {item.type === ArticleElement.HEADER_LARGE && (
              <Title level={4}>{item.text}</Title>
            )}
            {item.type === ArticleElement.HEADER_MEDIUM && (
              <Title level={5}>{item.text}</Title>
            )}
            {item.type === ArticleElement.HEADER_SMALL && (
              <StyledText color={darkGray} fontSize="14px" fontWeight="600">
                {item.text}
              </StyledText>
            )}
            {item.type === ArticleElement.IMAGE && (
              <CenterAlignedFlexboxCol>
                <ArticleImage
                  style={{
                    margin: `${spacingS} 0 0`,
                    objectFit: item.objectFit ?? "cover",
                  }}
                  src={item.text}
                  alt="Image related to subheader"
                />
                <StyledText color={middleGray} fontSize="10px">
                  {item.credit}
                </StyledText>
              </CenterAlignedFlexboxCol>
            )}
            {item.type === ArticleElement.LIST_ITEM && (
              <ListItem text={item.text} />
            )}
            {item.type === ArticleElement.CANVA && (
              <Suspense fallback={<Loading />}>
                <Canva canvaId={item.text} />
              </Suspense>
            )}
            {item.type === ArticleElement.GOOGLE_MAP && (
              <GoogleMap text={item.text} />
            )}
            {item.type === ArticleElement.YOUTUBE && (
              <Suspense fallback={<Loading />}>
                <Youtube src={item.text} />
              </Suspense>
            )}
          </Fragment>
        ))}
        {!isPureText && <PickButton item={kindness as KindnessAction} />}
      </ArticleContainer>
      <ArticleContainer style={{ marginTop: spacingL }}>
        {article?.map((item, index) => (
          <Fragment key={index}>
            {item.type === ArticleElement.FOOTNOTE && (
              <ArticleText fontSize="10px" text={item.text} isFootNote />
            )}
          </Fragment>
        ))}
      </ArticleContainer>
    </>
  );
};

export default Article;

import React, { Suspense } from "react";
import styled from "styled-components";
import Loading from "../loading";
import { spacingS, middleGray, pink6 } from "../../../common/variables";

const Link = React.lazy(() => import("antd/es/typography/Link"));
const Text = React.lazy(() => import("antd/es/typography/Text"));

interface Props {
  text: string;
  fontSize?: string;
  isFootNote?: boolean;
  fontWeight?: number;
}

const Sub = styled.span`
  color: ${middleGray};
  font-size: 10px;
  vertical-align: super;
`;

const BasicText = styled.span`
  color: ${middleGray};
`;

const ArticleText: React.FC<Props> = ({
  text,
  fontSize,
  isFootNote,
  fontWeight,
}) => {
  const squareBracketDigitPattern = /(\[\d+\])/;
  const caretBracketPattern = /(\[\^\d+\^\])/;
  const linkPattern = /(\[[^\]]+\])/g;
  const urlPattern = /(\(http[^)]+\))/g;

  const parts = text
    .split(squareBracketDigitPattern)
    .flatMap((part) => part.split(caretBracketPattern))
    .flatMap((part) => part.split(linkPattern))
    .flatMap((part) => part.split(urlPattern))
    .filter(Boolean);

  const textItemList = parts.map((item) => {
    if (
      item.match(squareBracketDigitPattern) ||
      item.match(caretBracketPattern)
    ) {
      return { type: "sub", text: item.slice(2, -2) };
    } else if (item.match(linkPattern)) {
      return { type: "link", text: item.slice(1, -1) };
    } else if (item.match(urlPattern)) {
      return { type: "url", text: item };
    } else {
      return { type: "text", text: item };
    }
  });

  return (
    <Suspense fallback={<Loading />}>
      <Text
        style={{
          marginBottom: isFootNote ? "inherit" : spacingS,
          fontWeight: fontWeight ?? "inherit",
          lineHeight: isFootNote ? 1 : 2,
        }}
      >
        {textItemList.map((item, index) => (
          <span key={index} style={{ fontSize: fontSize ?? "14px" }}>
            {item.type === "text" && <BasicText>{item.text}</BasicText>}
            {item.type === "link" && (
              <Link
                target="_blank"
                underline
                href={
                  textItemList[index + 1]
                    ? textItemList[index + 1].text.slice(1, -1)
                    : undefined
                }
                style={{ color: pink6, fontSize: fontSize ?? "14px" }}
              >
                {item.text}
              </Link>
            )}
            {item.type === "sub" && <Sub>{item.text}</Sub>}
          </span>
        ))}
      </Text>
    </Suspense>
  );
};

export default ArticleText;

import React from "react";
import { variables } from "../../../common/variables";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  text: string;
  fontSize?: string;
}

const Sub = styled.span`
  color: ${variables.middleGray};
  font-size: 10px;
`;

const BasicText = styled.span`
  color: ${variables.middleGray};
  font-size: 10px;
`;

const LinkText = styled(Link)`
  color: ${variables.pink6};
  font-size: 10px;
`;

const Text: React.FC<Props> = ({ text, fontSize }) => {
  const squareBracketDigitPattern = /(\[\d+\])/;
  const caretBracketPattern = /(\[\^\d+\^\])/;
  const linkPattern = /(\[[^\]]+\])/g;

  const parts = text
    .split(squareBracketDigitPattern)
    .flatMap((part) => part.split(caretBracketPattern))
    .flatMap((part) => part.split(linkPattern))
    .filter(Boolean);

  const textItemList = parts.map((item) => {
    if (
      item.match(squareBracketDigitPattern) ||
      item.match(caretBracketPattern)
    ) {
      return { type: "sub", text: item };
    } else if (item.match(linkPattern)) {
      return { type: "link", text: item };
    } else {
      return { type: "text", text: item };
    }
  });

  const isUrl = (text: string) => {
    return text.startsWith("(http://") || text.startsWith("(https://");
  };

  return (
    <p>
      {textItemList.map((item, index) => (
        <span key={index}>
          {item.type === "text" && !isUrl(item.text) && (
            <BasicText>{item.text}</BasicText>
          )}
          {item.type === "link" && (
            <LinkText
              target="_blank"
              to={textItemList[index + 1].text.slice(1, -1)}
            >
              {item.text}
            </LinkText>
          )}
          {item.type === "sub" && <Sub>{item.text.slice(2, -2)}</Sub>}
        </span>
      ))}
    </p>
  );
};

export default Text;

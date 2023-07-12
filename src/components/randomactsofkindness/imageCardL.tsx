import React from "react";
import { StyledText, StyledTitle } from "../shared/sharedLayouts";
import { variables } from "../shared/variables";
import styled from "styled-components";

const CardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  width: 40vw;
  flex-shrink: 0;
  border-radius: 15px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  padding: 15px;
`;

const Image = styled.img`
  width: 40vw;
  height: 40vw;
  object-fit: cover;
  border-radius: 15px;
`;

interface Props {
  item: { id: number; title: string; description?: string; imageUrl: string };
}

const ImageCardL: React.FC<Props> = ({ item }) => {
  return (
    <CardContainer>
      <Image src={item.imageUrl} alt={item.title} />
      <StyledTitle level={5} style={{ margin: "15px 0" }}>
        {item.title}
      </StyledTitle>
      <StyledText color={variables.middleGray} fontSize="14px">
        {item.description}
      </StyledText>
    </CardContainer>
  );
};

export default ImageCardL;

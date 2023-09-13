import React from "react";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { FlexboxCol } from "./sharedLayouts";

const Sun = styled.div`
  margin: 0 auto;
  background-color: ${variables.pink3};
  width: 10vw;
  height: 5vw;
  border-radius: 5vw 5vw 0 0;
  @media (max-width: 800px) {
    width: 30vw;
    height: 15vw;
    border-radius: 15vw 15vw 0 0;
  }
`;
const Shadow = styled.div`
  margin: 0 auto;
  background-color: ${variables.pink3};
  width: 10vw;
  height: 5vw;
  border-radius: 5vw 5vw 0 0;
  transform: rotate(180deg);
  filter: blur(8px);
  margin-top: -5px;
  opacity: 0.6;
  @media (max-width: 800px) {
    width: 34vw;
    height: 15vw;
    border-radius: 15vw 15vw 0 0;
  }
`;

const Top = styled.div`
  position: relative;
`;

const SunriseImage: React.FC = () => {
  return (
    <FlexboxCol>
      <Top>
        <Sun />
      </Top>
      <Shadow />
    </FlexboxCol>
  );
};

export default SunriseImage;

import React from "react";
import { variables } from "../../common/variables";
import styled from "styled-components";

const Sun = styled.div`
  margin: 1rem auto;
  background-color: ${variables.pink3};
  width: 30vw;
  height: 15vw;
  border-radius: 15vw 15vw 0 0;
`;

const SunriseImage: React.FC = () => {
  return <Sun />;
};

export default SunriseImage;

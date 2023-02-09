import { Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import styled from "styled-components";
import { variables } from "./variables";

export const StyledContainer = styled.div`
  display: grid;
  margin: 10%;
`;

export const StyledButton = styled(Button)`
  height: 50px;
  border-radius: 50px;
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
`;

export const StyledInput = styled(Input)`
  border: none;
  border-bottom: 1px solid ${variables.lightGray};
  border-radius: unset;
`;

export const StyledTitle = styled(Title)<{ color: string }>`
  font-weight: bold;
  color: ${variables.black};
`;

export const StyledText = styled(Text)<{
  color: string;
  fontSize: string;
  fontWeight: string;
}>`
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
`;

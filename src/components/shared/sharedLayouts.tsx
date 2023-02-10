import { Alert, Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import styled from "styled-components";
import { variables } from "./variables";

export const StyledContainer = styled.div`
  display: grid;
  margin: 10%;
`;

export const StyledButton = styled(Button)<{ backgroundcolor: string }>`
  height: 50px;
  border-radius: 50px;
  background-color: ${(props) => props.backgroundcolor};
  width: 100%;
`;

export const StyledInput = styled(Input)`
  border: none;
  border-bottom: 1px solid ${variables.lightGray};
  border-radius: unset;
`;

export const StyledTitle = styled(Title)`
  font-weight: bold;
  color: ${variables.black};
`;

export const StyledNotification = styled(Alert)`
  height: 50px;
  border-radius: 5px;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: inherit;
  border: none;
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

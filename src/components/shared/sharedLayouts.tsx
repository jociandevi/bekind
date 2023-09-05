import { Alert, Button, Input } from "antd";
import Text from "antd/es/typography/Text";
import styled from "styled-components";
import { variables } from "../../common/variables";

export const StyledGrid = styled.div`
  display: grid;
  margin: 10%;
`;

export const HorizontalScrollContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: scroll;
  scrollbar-width: none;
  padding: 12px 0 20px 5px;
  scroll-padding-left: 12px;
  scroll-snap-type: x mandatory;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Flexbox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const CenterAlignedFlexbox = styled(Flexbox)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: inherit;
`;

export const FlexboxCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledButton = styled(Button)`
  height: 40px;
`;

export const IconButton = styled(Button)<{ backgroundcolor?: string }>`
  color: white;
  background-color: ${(props) => props.backgroundcolor || "inherit"};
  border: none;
`;

export const StyledInput = styled(Input)`
  border: none;
  border-bottom: 1px solid ${variables.lightGray};
  border-radius: unset;
`;

export const StyledSearch = styled(Input)`
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  padding: 12px;
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
  fontWeight?: string;
}>`
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize ?? "inherit"};
`;

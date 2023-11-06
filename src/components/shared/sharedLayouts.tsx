import { Alert, Button, Input } from "antd";
import Text from "antd/es/typography/Text";
import styled from "styled-components";
import { variables } from "../../common/variables";

export const phoneCardWidth = "45vw";
export const tabletCardWidth = "30vw";
export const laptopCardWidth = "22vw";
export const monitorCardWidth = "15vw";

export const StyledGrid = styled.div`
  display: grid;
  margin: 10%;
`;

export const ListLayout = styled.div`
  display: grid;
  width: 100vw;
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

export const CenterAlignedFlexboxCol = styled(FlexboxCol)`
  align-items: center;
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

export const TextDisplayS = styled.div<{ color?: string }>`
  font-size: 10px;
  color: ${(props) => props.color ?? variables.black}};
`;

export const ResponsiveImageLarge = styled.img<{
  md?: boolean;
  lg?: boolean;
}>`
  width: ${(props) =>
    props.lg ? laptopCardWidth : props.md ? tabletCardWidth : phoneCardWidth};
  height: ${(props) =>
    props.lg ? laptopCardWidth : props.md ? tabletCardWidth : phoneCardWidth};

  object-fit: cover;
  border-radius: ${variables.borderRadius}px;
`;

export const ResponsiveImageMedium = styled.img<{
  md?: boolean;
  lg?: boolean;
}>`
  width: ${(props) => (props.md ? "20vw" : "30vw")};
  height: ${(props) => (props.md ? "20vw" : "30vw")};
  object-fit: cover;
  border-radius: ${variables.borderRadius}px;
`;

export const ImageSizeL = styled.img<{
  md?: boolean;
}>`
  width: ${(props) => (props.md ? "40vw" : "100vw")};
  height: ${(props) => (props.md ? "40vw" : "100vw")};
  object-fit: cover;
  border-radius: 0 0 0 ${variables.borderRadiusPercent}%;
`;

export const CircleImage = styled.img<{ md?: boolean }>`
  width: ${(props) => (props.md ? "15vw" : "30vw")};
  height: ${(props) => (props.md ? "15vw" : "30vw")};
  object-fit: cover;
  border-radius: 50%;
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const CategoryButton = styled(Button)`
  width: fit-content;
  margin-left: ${variables.spacingXs};
  font-weight: 600;
`;

import React from "react";
import { AlertProps } from "antd";
import { CenterAlignedFlexboxCol, StyledText } from "./sharedLayouts";
import Button from "antd/es/button";
import { useNavigate } from "react-router-dom";
import { middleGray, spacingS } from "../../common/variables";
import Title from "antd/es/typography/Title";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface Props extends AlertProps {
  title?: string;
  description?: string;
}

const BigIconButton = styled(Button)`
  border: none;
  height: 10vw;
  display: flex;
  align-items: center;
  margin-top: ${spacingS};
  & svg {
    width: 10vw;
    height: 10vw;
  }
`;

const EmptyState: React.FC<Props> = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <CenterAlignedFlexboxCol style={{ gap: spacingS }}>
      <BigIconButton icon={<InboxOutlined />} />
      <Title level={4} style={{ marginTop: 0 }}>
        {title}
      </Title>
      <StyledText color={middleGray} fontSize="14px">
        {description}
      </StyledText>
      <Button type="primary" onClick={() => navigate("/")}>
        Search
      </Button>
    </CenterAlignedFlexboxCol>
  );
};

export default EmptyState;

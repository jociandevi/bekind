import React, { ReactNode } from "react";
import { FlexboxCol } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { Modal, ModalProps, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useMediaQueries } from "../../common/mediaQueryHook";

const { Text } = Typography;

const StyledModal = styled(Modal)`
  margin: 0;

  @media only screen and (min-width: 600px) {
    margin: auto;
  }

  .ant-modal-content {
    width: 100vw;
    border-radius: 15px 15px 0 0;
    @media only screen and (min-width: 600px) {
      width: inherit;
      border-radius: 15px;
    }
  }

  .ant-modal-close-x {
    background-color: ${variables.lightGray};
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    border-radius: 8px;
  }
`;

const ModalContent = styled(FlexboxCol)<{ imageBackgroundColor?: string }>`
  align-items: center;
  gap: ${variables.spacingXxs};
  padding: ${variables.spacingS} ${variables.spacingXxs};
  text-align: center;

  & img,
  svg {
    object-fit: cover;
    border-radius: 50%;
    border: #ffffff solid 4px;
    margin-top: -20vw;
    width: 20vw;
    height: 20vw;
    @media only screen and (min-width: 600px) {
      margin-top: -10vw;
      width: 10vw;
      height: 10vw;
    }
    background-color: ${(props) => props.imageBackgroundColor};
  }
`;

interface Props extends ModalProps {
  children?: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  description?: string;
  imageUrl?: string;
  image?: React.ReactNode;
  isProfileImage?: boolean;
  imageBackgroundColor?: string;
  modalHeight: number;
}

const AntdModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  description,
  imageUrl,
  image,
  isProfileImage,
  imageBackgroundColor,
  children,
  modalHeight,
  ...props
}) => {
  const { md } = useMediaQueries();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        {...props}
        title=""
        style={md ? {} : { top: `calc(100vh - ${modalHeight}px)` }}
        zIndex={2147483641}
      >
        <ModalContent imageBackgroundColor={imageBackgroundColor}>
          {imageUrl && <img src={imageUrl} alt={imageUrl} />}
          {image && image}
          <Title level={3}>{props.title}</Title>
          <Text>{description}</Text>
        </ModalContent>
      </StyledModal>
    </>
  );
};

export default AntdModal;

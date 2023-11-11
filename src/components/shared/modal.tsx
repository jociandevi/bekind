import React, { ReactNode, Suspense } from "react";
import { FlexboxCol } from "./sharedLayouts";
import styled from "styled-components";
import type { ModalProps } from "antd";
import Modal from "antd/es/modal";
import { useMediaQueries } from "../../common/mediaQueryHook";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { lightGray, spacingS, spacingXxs } from "../../common/variables";

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
    background-color: ${lightGray};
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    border-radius: 8px;
  }
`;

const ModalContent = styled(FlexboxCol)<{ imageBackgroundColor?: string }>`
  align-items: center;
  gap: ${spacingXxs};
  padding: ${spacingS} ${spacingXxs};
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
        <Suspense fallback={<></>}>
          <Title level={3}>{props.title}</Title>
        </Suspense>
        <Suspense fallback={<></>}>
          <Text>{description}</Text>
        </Suspense>
      </ModalContent>
    </StyledModal>
  );
};

export default AntdModal;

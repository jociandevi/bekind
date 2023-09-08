import React, { ReactNode } from "react";
import { CircleImage, FlexboxCol, ResponsiveImage } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { Modal, ModalProps, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useMediaQueries } from "../../common/mediaQueryHook";

const { Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 15px;
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

const ModalContent = styled(FlexboxCol)`
  align-items: center;
  gap: ${variables.spacingXxs};
  padding: ${variables.spacingS} ${variables.spacingXxs};
  text-align: center;
`;

interface Props extends ModalProps {
  children?: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  description?: string;
  imageUrl?: string;
  image?: React.ReactNode;
  isProfileImage?: boolean;
}

const AntdModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  description,
  imageUrl,
  image,
  isProfileImage,
  children,
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
      >
        <ModalContent>
          {imageUrl && !isProfileImage && (
            <ResponsiveImage src={imageUrl} alt={imageUrl} md={md} />
          )}
          {imageUrl && isProfileImage && (
            <CircleImage src={imageUrl} alt={imageUrl} md={md} />
          )}
          {image && image}
          <Title level={3}>{props.title}</Title>
          <Text>{description}</Text>
        </ModalContent>
      </StyledModal>
    </>
  );
};

export default AntdModal;
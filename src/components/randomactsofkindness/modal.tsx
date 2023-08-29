import React, { ReactNode } from "react";
import { FlexboxCol, StyledTitle } from "../shared/sharedLayouts";
import { variables } from "../shared/variables";
import styled from "styled-components";
import { Modal, ModalProps, Typography } from "antd";

const { Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-btn-primary,
  .ant-btn-primary:not(:disabled):hover {
    background-color: ${variables.pink3};
  }

  .ant-btn {
    height: 40px;
  }

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

const StyledImage = styled.img`
  width: 50vw;
  height: 50vw;
  object-fit: cover;
`;

const StyledProfileImage = styled(StyledImage)`
  border-radius: 50%;
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
  image?: string;
  isProfileImage?: boolean;
}

const AntdModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  description,
  image,
  isProfileImage,
  children,
  ...props
}) => {
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
          {image && !isProfileImage && <StyledImage src={image} alt={image} />}
          {image && isProfileImage && (
            <StyledProfileImage src={image} alt={image} />
          )}
          <StyledTitle level={3}>{props.title}</StyledTitle>
          <Text>{description}</Text>
        </ModalContent>
      </StyledModal>
    </>
  );
};

export default AntdModal;

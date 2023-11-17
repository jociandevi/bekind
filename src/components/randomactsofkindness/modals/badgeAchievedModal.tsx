import React, { useEffect, useState } from "react";
import AntdModal from "../../shared/modal";
import { white } from "../../../common/variables";
import { BadgeProps, Notification } from "../../../common/interfaces";
import { useGetApi } from "../../../common/apiCalls";
import { badgeIcons } from "../../../common/mockData";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  notificationData?: Notification;
}

const BadgeAchievedModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  notificationData,
}) => {
  const [badge, setBadge] = useState<BadgeProps | undefined>(undefined);
  const { callGetApi } = useGetApi(`api/Badge/${notificationData?.badgeId}`);
  const icon = badgeIcons.find(
    (item) => item.id === notificationData?.badgeId
  )?.icon;

  useEffect(() => {
    async function fetchData() {
      const response = await callGetApi();
      setBadge(response?.data);
    }
    fetchData();
  }, [notificationData, callGetApi]);

  const onOk = () => {
    setIsModalOpen(false);
  };
  return (
    <AntdModal
      title={notificationData?.title}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={onOk}
      description={badge?.description}
      image={icon}
      okText="Cool!"
      imageBackgroundColor={white}
      modalHeight={260}
    />
  );
};

export default BadgeAchievedModal;

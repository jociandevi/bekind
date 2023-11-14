import React, { useState } from "react";
import Button from "antd/es/button";
import { HeartFilled, FireOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { KindnessAction } from "../../common/interfaces";
import { usePostApi } from "../../common/apiCalls";
import { useDelete } from "../../hooks/useDelete";
import {
  lightGray,
  pink3,
  shadow1,
  spacingM,
  spacingXs,
  white,
} from "../../common/variables";
import message from "antd/es/message";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";

interface Props {
  item: KindnessAction;
  isLiked?: boolean;
  type: "card" | "details";
}

const LikeButton: React.FC<Props> = ({ item, isLiked, type }) => {
  const navigate = useNavigate();
  const { callPostApi } = usePostApi(`api/LikedKindness/${item.id}`);
  const { callDelete } = useDelete(`api/LikedKindness/${item.id}`);
  const [isItLiked, setIsItLiked] = useState(isLiked);
  const user = useSelector(selectUser);
  const [messageApi, contextHolder] = message.useMessage();

  const onLike = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!user) {
      messageApi.open({
        content: "Login to save this idea for later!",
        type: "warning",
        icon: <FireOutlined />,
        onClick: (event) => {
          event.stopPropagation();
          navigate("/login");
        },
      });
    } else {
      setIsItLiked(!isItLiked);
      if (isItLiked) {
        callDelete();
      } else {
        callPostApi();
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        icon={<HeartFilled />}
        shape="circle"
        onClick={onLike}
        style={
          type === "card"
            ? {
                color: isItLiked ? pink3 : white,
                borderColor: isItLiked ? pink3 : white,
                top: "15px",
                right: "15px",
                backgroundColor: "#1816188c",
                position: "absolute",
              }
            : {
                borderColor: isItLiked ? pink3 : white,
                color: isItLiked ? pink3 : white,
                backgroundColor: isItLiked ? white : lightGray,
                position: "absolute",
                bottom: `-${spacingXs}`,
                right: spacingM,
                boxShadow: shadow1,
              }
        }
      />
    </>
  );
};

export default LikeButton;

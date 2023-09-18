import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import GoogleLoginButton from "./googleLoginButton";
import { useNavigate } from "react-router-dom";

export const ProfileImageSm = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

interface Props {
  user?: any;
}

const UserProfileIcon: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <>
      {user ? (
        <Button
          style={{ border: "none" }}
          icon={<ProfileImageSm src={user.picture} />}
          onClick={() => navigate("/profile")}
        />
      ) : (
        <GoogleLoginButton />
      )}
    </>
  );
};

export default UserProfileIcon;

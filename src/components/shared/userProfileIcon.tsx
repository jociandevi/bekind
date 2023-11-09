import React from "react";
import styled from "styled-components";
import Button from "antd/es/button";
import GoogleLoginButton from "./googleLoginButton";
import { useNavigate } from "react-router-dom";
import { Member } from "../../common/interfaces";

export const ProfileImageSm = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

interface Props {
  user: Member | null;
}

const UserProfileIcon: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <>
      {user ? (
        <Button
          style={{ border: "none" }}
          icon={
            <ProfileImageSm
              src={user.picture}
              alt={`Profile picture of ${user.firstName}`}
            />
          }
          onClick={() => navigate("/profile")}
          aria-label="User profile picture"
        />
      ) : (
        <GoogleLoginButton />
      )}
    </>
  );
};

export default UserProfileIcon;

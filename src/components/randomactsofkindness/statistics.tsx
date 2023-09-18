import React, { useContext, useEffect } from "react";
import { StyledGrid } from "../shared/sharedLayouts";
import Title from "antd/es/typography/Title";
import GroupedBarChart from "../shared/groupedBarChart";
import { AuthContext } from "../../common/authProvider";
import { useNavigate } from "react-router-dom";
import ProfileStatistics from "./profileStatistics";

const Statistics: React.FC = () => {
  const { user: googleUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!googleUser) {
      navigate("/kindness");
    }
  }, [navigate, googleUser]);

  if (!googleUser) {
    return null;
  }

  return (
    <StyledGrid>
      <Title level={4}>
        {googleUser.given_name} {googleUser.family_name}
      </Title>
      <GroupedBarChart />
      <ProfileStatistics />
    </StyledGrid>
  );
};

export default Statistics;

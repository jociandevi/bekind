import Title from "antd/es/typography/Title";
import { StyledButton, StyledContainer } from "../shared/sharedLayouts";

const Parent: React.FC = () => {
  // identify logged in user
  const user = {
    firstName: "Evi",
    lastName: "Kadar",
    canPickUp: [{ firstName: "Dani", lastName: "Hyross" }],
  };

  return (
    <StyledContainer>
      <Title>Hi {user.firstName}!</Title>
      <StyledButton>Pick up {user.canPickUp[0].firstName}</StyledButton>
    </StyledContainer>
  );
};

export default Parent;

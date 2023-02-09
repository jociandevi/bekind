import Title from "antd/es/typography/Title";
import { StyledButton, StyledContainer } from "../shared/sharedLayouts";
import { variables } from "../shared/variables";

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
      <StyledButton backgroundColor={variables.blue1}>
        Pick up {user.canPickUp[0].firstName}
      </StyledButton>
    </StyledContainer>
  );
};

export default Parent;

import {
  StyledButton,
  StyledContainer,
  StyledTitle,
} from "../shared/sharedLayouts";
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
      <StyledTitle level={3}>Hi {user.firstName}!</StyledTitle>
      <StyledButton backgroundcolor={variables.blue1} type="primary">
        PICK UP {user.canPickUp[0].firstName.toUpperCase()}
      </StyledButton>
    </StyledContainer>
  );
};

export default Parent;

import { Button } from "antd";
import Title from "antd/es/typography/Title";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: grid;
  margin: 10%;
`;

const StyledButton = styled(Button)`
  width: fit-content;
`;

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

import Title from "antd/es/typography/Title";
import {
  StyledButton,
  StyledGrid,
  StyledNotification,
} from "../shared/sharedLayouts";

const Teacher: React.FC = () => {
  // get user
  const user = {
    firstName: "Edit",
    lastName: "xy",
  };

  // listen to notifications

  const arrivedParents = [
    {
      firstName: "Evi",
      lastName: "Kadar",
      canPickUp: [{ firstName: "Dani", lastName: "Hyross" }],
    },
    {
      firstName: "Timea",
      lastName: "Kirady",
      canPickUp: [{ firstName: "Zalán", lastName: "Répási" }],
    },
  ];

  const sendKidHome = (parent: string) => {
    console.log("lets send someone home");
  };

  return (
    <StyledGrid>
      <Title level={3}>Hi {user.firstName}!</Title>
      {arrivedParents.map((item) => (
        <StyledNotification
          message={`${item.firstName} ${item.lastName} arrived for ${item.canPickUp[0].firstName} ${item.canPickUp[0].lastName}`}
          closable
          style={{ marginBottom: "12px" }}
          key={item.firstName}
          onClose={() => sendKidHome(item.firstName)}
        />
      ))}
      {arrivedParents.length > 1 && (
        <StyledButton type="primary">SEND THEM ALL</StyledButton>
      )}
    </StyledGrid>
  );
};

export default Teacher;

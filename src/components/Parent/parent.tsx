const Parent: React.FC = () => {
  // identify logged in user
  const user = {
    firstName: "Evi",
    lastName: "Kadar",
    canPickUp: [{ firstName: "Dani", lastName: "Hyross" }],
  };


  return (
    <>
      <p>Hi {user.firstName}!</p>
      <button>Pick up {user.canPickUp[0].firstName}</button>
    </>
  );
};

export default Parent;

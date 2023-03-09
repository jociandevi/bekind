import React from "react";
import { getAPI, postAPI } from "../../common/apiCommon";
import {
  StyledButton,
  StyledContainer,
  StyledTitle,
} from "../shared/sharedLayouts";
import { variables } from "../shared/variables";

const Parent: React.FC = () => {
  // identify logged in user
  const user = {
    id: "1",
    firstName: "Evi",
    lastName: "Kadar",
    canPickUp: [{ firstName: "Dani", lastName: "Hyross" }],
  };

  const [weather, setWeather] = React.useState([
    { temperatureC: 1, summary: "Questionable" },
  ]);

  //function below triggers the helper function
  const getData = () =>
    getAPI("weatherforecast").then((res) => {
      if (res.status === 200) {
        setWeather(res.data);
        console.log(weather);
      } else {
        console.log(res);
      }
    });

  //this runs the getData trigger function as useEffect
  React.useEffect(() => {
    getData();
  }, []);

  const sendHome = () => {
    const now = new Date();
    const pickupEvent = {
      parent: user.id,
      kid: user.canPickUp[0],
      arrivedAt: now.toISOString(),
    };
    postAPI("pickupEvents", pickupEvent).then((res) => {
      console.log(res);
    });
  };

  return (
    <StyledContainer>
      <StyledTitle level={3}>Hi {user.firstName}!</StyledTitle>
      <StyledButton
        backgroundcolor={variables.blue1}
        type="primary"
        onClick={sendHome}
      >
        PICK UP {user.canPickUp[0].firstName.toUpperCase()}
      </StyledButton>

      <StyledTitle level={4}>
        Today it is {weather[0].temperatureC} °C. What a {weather[0].summary}{" "}
        weather!
      </StyledTitle>
    </StyledContainer>
  );
};

export default Parent;

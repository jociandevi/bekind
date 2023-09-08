import React from "react";
import { getAPI } from "../../common/apiCommon";
import { StyledGrid } from "../shared/sharedLayouts";
import Title from "antd/es/typography/Title";
import { Button } from "antd";

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
      } else {
        console.log(res);
      }
    });

  //this runs the getData trigger function as useEffect
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <StyledGrid>
      <Title level={3}>Hi {user.firstName}!</Title>
      <Button type="primary" onClick={() => {}}>
        PICK UP {user.canPickUp[0].firstName.toUpperCase()}
      </Button>

      <Title level={4}>
        Today it is {weather[0].temperatureC} °C. What a {weather[0].summary}{" "}
        weather!
      </Title>
    </StyledGrid>
  );
};

export default Parent;

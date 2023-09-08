import React from "react";
import { FlexboxCol } from "../shared/sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import StatsCard from "../shared/statscard";
import { ReactComponent as LogoSvg } from "../../img/line-chart-svgrepo-com.svg";
import { ReactComponent as HeartSvg } from "../../img/heart-svgrepo-com.svg";
import { userStats } from "../../common/mockData";

const Flexbox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ProfileStatistics: React.FC = () => {
  const today = new Date();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const lastMontName = new Date(
    new Date().setDate(today.getDate() - 30)
  ).toLocaleString("default", { month: "long" });
  const thisMonth = userStats.historicalData.find(
    (item) => item.label === currentMonth && item.label === "You"
  );
  const lastMonth = userStats.historicalData.find(
    (item) => item.label === lastMontName && item.label === "You"
  );
  const comparedToOthers = (thisMonth!.value / thisMonth!.value - 1) * 100;
  const moreThanOthers = comparedToOthers > 0;
  const comparedToOthersText = moreThanOthers ? "More" : "Less";

  const comparedToYourself = (thisMonth!.value / lastMonth!.value - 1) * 100;
  const moreThanYou = comparedToYourself > 0;
  const moreOrLessThanYourself = moreThanYou ? "More" : "Less";

  return (
    <Flexbox>
      <FlexboxCol>
        <Flexbox>
          <StatsCard
            backgroundColor={variables.pink6}
            number={thisMonth!.value}
            text="Last 30 Days"
            color="white"
            secondaryColor="white"
            width={35}
          />
          <StatsCard
            backgroundColor={variables.veryLightGray}
            number={comparedToOthers}
            text={`${comparedToOthersText} than others`}
            compareChange
            width={35}
            color={variables.black}
            secondaryColor={variables.darkGray}
          />
        </Flexbox>
        <StatsCard
          backgroundColor={variables.darkGray}
          color="white"
          secondaryColor="white"
          number={comparedToYourself}
          text={`${moreOrLessThanYourself} than last month`}
          compareChange
          icon={<LogoSvg fill="white" width={60} height={60} />}
        />
      </FlexboxCol>
      <StatsCard
        backgroundColor={variables.veryLightGray}
        number={userStats.totalNumberOfKindnesses}
        text="Total number of kindnesses"
        width={25}
        secondaryColor={variables.darkGray}
        icon={<HeartSvg width={30} height={30} />}
        iconToTop
      />
    </Flexbox>
  );
};

export default ProfileStatistics;
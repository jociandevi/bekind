import React from "react";
import { FlexboxCol } from "../shared/sharedLayouts";
import { variables } from "../shared/variables";
import styled from "styled-components";
import { CategoryNames } from "./randomActsOfKindnessList";
import StatsCard from "./statscard";
import { ReactComponent as LogoSvg } from "../../img/line-chart-svgrepo-com.svg";
import { ReactComponent as HeartSvg } from "../../img/heart-svgrepo-com.svg";

export interface UserStats {
  id: number;
  firstName: string;
  lastName: string;
  numberOfKindnessLast30Days: number;
  averageNumberOfKindnessLast30Days: number;
  monthlyStatsLast6Months: number[];
  totalNumberOfKindnesses: number;
  topCategory: CategoryNames;
}

const Flexbox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ProfileStatistics: React.FC = () => {
  const userStats: UserStats = {
    id: 1,
    firstName: "Liza",
    lastName: "Bailey",
    numberOfKindnessLast30Days: 14,
    averageNumberOfKindnessLast30Days: 12,
    monthlyStatsLast6Months: [3, 12, 18, 10, 4, 15],
    totalNumberOfKindnesses: 53,
    topCategory: CategoryNames.NEIGHBORHOOD,
  };

  const comparedToOthers =
    (userStats.numberOfKindnessLast30Days /
      userStats.averageNumberOfKindnessLast30Days -
      1) *
    100;
  const moreThanOthers = comparedToOthers > 0;
  const comparedToOthersText = moreThanOthers ? "More" : "Less";

  const comparedToYourself =
    (userStats.numberOfKindnessLast30Days /
      userStats.monthlyStatsLast6Months[5] -
      1) *
    100;
  const moreThanYou = comparedToYourself > 0;
  const moreOrLessThanYourself = moreThanYou ? "More" : "Less";

  return (
    <Flexbox>
      <FlexboxCol>
        <Flexbox>
          <StatsCard
            backgroundColor={variables.pink6}
            number={userStats.numberOfKindnessLast30Days}
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

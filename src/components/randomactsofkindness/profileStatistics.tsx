import React from "react";
import { FlexboxCol } from "../shared/sharedLayouts";
import styled from "styled-components";
import StatsCard from "../shared/statscard";
import { ReactComponent as LogoSvg } from "../../img/line-chart-svgrepo-com.svg";
import { ReactComponent as HeartSvg } from "../../img/heart-svgrepo-com.svg";
import { MemberStatistics } from "../../common/interfaces";
import { black, darkGray, pink6, veryLightGray } from "../../common/variables";

const Flexbox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

interface Props {
  myStats?: MemberStatistics;
  avgStats?: number;
}

const ProfileStatistics: React.FC<Props> = ({ myStats, avgStats }) => {
  let comparedToOthers =
    ((myStats?.kindnessForTheLast30DaysCount ?? 0) / (avgStats ?? 0) - 1) * 100;

  if (Number.isNaN(comparedToOthers)) {
    comparedToOthers = 0;
  }

  const moreThanOthers = comparedToOthers > 0;
  const comparedToOthersText = moreThanOthers ? "More" : "Less";

  const thisMonth =
    myStats?.kindnessForTheLast180DaysCount![
      myStats?.kindnessForTheLast180DaysCount!.length - 1
    ] ?? 0;
  const lastMonth =
    myStats?.kindnessForTheLast180DaysCount![
      myStats?.kindnessForTheLast180DaysCount!.length - 2
    ] ?? 0;

  let comparedToYourself = (thisMonth / lastMonth - 1) * 100;

  if (Number.isNaN(comparedToYourself)) {
    comparedToYourself = 0;
  }

  const moreThanYou = comparedToYourself > 0;
  const moreOrLessThanYourself = moreThanYou ? "More" : "Less";

  return (
    <Flexbox>
      <FlexboxCol>
        <Flexbox>
          <StatsCard
            backgroundColor={pink6}
            number={myStats?.kindnessForTheLast30DaysCount ?? 0}
            text="Last 30 Days"
            color="white"
            secondaryColor="white"
            width={35}
          />
          <StatsCard
            backgroundColor={veryLightGray}
            number={comparedToOthers}
            text={`${comparedToOthersText} than others`}
            compareChange
            width={35}
            color={black}
            secondaryColor={darkGray}
          />
        </Flexbox>
        <StatsCard
          backgroundColor={darkGray}
          color="white"
          secondaryColor="white"
          number={comparedToYourself}
          text={`${moreOrLessThanYourself} than last month`}
          compareChange
          icon={<LogoSvg fill="white" width={60} height={60} />}
        />
      </FlexboxCol>
      <StatsCard
        backgroundColor={veryLightGray}
        number={myStats?.kindnessLifetimeCount ?? 0}
        text="Total number of kindnesses"
        width={25}
        secondaryColor={darkGray}
        icon={<HeartSvg width={30} height={30} />}
        iconToTop
      />
    </Flexbox>
  );
};

export default ProfileStatistics;

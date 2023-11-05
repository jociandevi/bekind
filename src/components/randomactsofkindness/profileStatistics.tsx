import React from "react";
import { FlexboxCol } from "../shared/sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import StatsCard from "../shared/statscard";
import { ReactComponent as LogoSvg } from "../../img/line-chart-svgrepo-com.svg";
import { ReactComponent as HeartSvg } from "../../img/heart-svgrepo-com.svg";
import { MemberStatistics } from "../../common/interfaces";

const Flexbox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

interface Props {
  myStats?: MemberStatistics;
  avgStats?: number;
}

const ProfileStatistics: React.FC<Props> = ({ myStats, avgStats }) => {
  const comparedToOthers =
    ((myStats?.kindnessForTheLast30DaysCount ?? 0) / (avgStats ?? 0) - 1) * 100;
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

  const comparedToYourself = (thisMonth / lastMonth - 1) * 100;
  const moreThanYou = comparedToYourself > 0;
  const moreOrLessThanYourself = moreThanYou ? "More" : "Less";

  return (
    <Flexbox>
      <FlexboxCol>
        <Flexbox>
          <StatsCard
            backgroundColor={variables.pink6}
            number={myStats?.kindnessForTheLast30DaysCount ?? 0}
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
        number={myStats?.kindnessLifetimeCount ?? 0}
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

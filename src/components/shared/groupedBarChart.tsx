import React from "react";
import { Flexbox, FlexboxCol, StyledText } from "./sharedLayouts";
import SingleBarChart from "./singleBarChart";
import { MemberStatistics } from "../../common/interfaces";
import { lightGray, middleGray, pink2, spacingS } from "../../common/variables";

interface Props {
  myStats?: MemberStatistics;
}

type DataObject = {
  month: string;
  label: string;
  value: number;
};

const GroupedBarChart: React.FC<Props> = ({ myStats }) => {
  const mapLastSixMonthsToValues = (values: number[]): DataObject[] => {
    while (values?.length < 6) {
      values.unshift(0);
    }
    const lastSixValues = values?.slice(-6);

    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentMonth = new Date().getMonth();
    const startMonthIndex = (currentMonth - 5 + 12) % 12; // Ensure positive index

    const result: DataObject[] = lastSixValues.map((value, index) => {
      const monthIndex = (startMonthIndex + index) % 12;
      const monthName = months[monthIndex];

      return {
        month: monthName,
        label: "You",
        value: value,
      };
    });

    return result;
  };

  const historicalData = mapLastSixMonthsToValues(
    myStats?.kindnessForTheLast180DaysCount ?? []
  );

  const uniqueLabels = new Set<string>();
  const uniqueMonths = new Set<string>();

  historicalData.forEach((item) => {
    uniqueLabels.add(item.label);
    uniqueMonths.add(item.month);
  });

  const labels = Array.from(uniqueLabels);
  const months = Array.from(uniqueMonths);
  const colors = [pink2, lightGray];

  const getColor = (label: string) => {
    const index = labels.findIndex((item) => item === label);
    return colors[index];
  };

  const getItem = (label: string, month: string) => {
    const data = historicalData?.find(
      (item) => item.label === label && item.month === month
    );
    return data!;
  };

  return (
    <Flexbox
      style={{
        justifyContent: "space-between",
        margin: spacingS,
        position: "relative",
      }}
    >
      {months?.map((month, index) => (
        <FlexboxCol key={index}>
          <Flexbox style={{ justifyContent: "center" }}>
            {labels?.map((label, index) => (
              <SingleBarChart
                item={getItem(label, month)}
                color={getColor(label)}
                key={index}
              />
            ))}
          </Flexbox>
          <StyledText color={middleGray} fontSize="12px">
            {month}
          </StyledText>
        </FlexboxCol>
      ))}
    </Flexbox>
  );
};

export default GroupedBarChart;

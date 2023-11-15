import React, { useState } from "react";
import { Button, Steps } from "antd";
import styled from "styled-components";
import {
  black,
  middleGray,
  spacingL,
  spacingXs,
  white,
} from "../../common/variables";
import Title from "antd/es/typography/Title";
import one from "../../img/one.jpg";
import two from "../../img/two.jpg";
import three from "../../img/three.jpg";
import { completeUserJourney } from "./userJourney";

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpperHalfFirstSlide = styled.div`
  width: 100vw;
  height: 60vh;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomHalf = styled.div`
  width: 100vw;
  height: 20vh;
  background-color: ${black};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacingXs};
  justify-content: center;
`;

const UpperHalf = styled.div`
  width: 100vw;
  height: 50vh;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomHalfFirstSlide = styled.div`
  width: 100vw;
  height: auto;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacingL};
`;

const steps = [
  {
    title: "",
    content: (
      <StepContainer>
        <UpperHalfFirstSlide>
          <Title level={1}>👋 Welcome!</Title>
          <Title
            level={4}
            style={{
              width: "70vw",
              textAlign: "center",
              margin: 0,
              color: middleGray,
            }}
          >
            Outbreak helps you become happier with small daily actions.
          </Title>
        </UpperHalfFirstSlide>
      </StepContainer>
    ),
  },
  {
    title: "",
    content: (
      <StepContainer>
        <UpperHalf>
          <img src={one} alt="cards to pick from" />
        </UpperHalf>
        <BottomHalf>
          <Title
            style={{
              color: white,
            }}
            level={3}
          >
            Browse between actions
          </Title>
          <Title
            level={5}
            style={{
              width: "70vw",
              textAlign: "center",
              margin: 0,
              color: white,
            }}
          >
            That help you and the world.
          </Title>
        </BottomHalf>
      </StepContainer>
    ),
  },
  {
    title: "",
    content: (
      <StepContainer>
        <UpperHalf>
          <img
            src={two}
            alt="pick one and do it today"
            style={{ width: "100vw" }}
          />
        </UpperHalf>
        <BottomHalf>
          <Title
            style={{
              color: white,
            }}
            level={3}
          >
            Pick one and do it today
          </Title>
          <Title
            level={5}
            style={{
              width: "70vw",
              textAlign: "center",
              margin: 0,
              color: white,
            }}
          >
            Click on the cards to find out more.
          </Title>
        </BottomHalf>
      </StepContainer>
    ),
  },
  {
    title: "",
    content: (
      <StepContainer>
        <UpperHalf>
          <img
            src={three}
            alt="improve your life a little bit every day"
            style={{ width: "100vw" }}
          />
        </UpperHalf>
        <BottomHalf>
          <Title
            style={{
              color: white,
            }}
            level={3}
          >
            Feel the difference.
          </Title>
          <Title
            level={5}
            style={{
              width: "70vw",
              textAlign: "center",
              margin: 0,
              color: white,
            }}
          >
            Come back tomorrow and enjoy your life improving.
          </Title>
        </BottomHalf>
      </StepContainer>
    ),
  },
];

const TourContainer = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  height: 100vh;
  width: 100vw;
`;

interface Props {
  setTourIsVisible: (isVisible: boolean) => void;
}

const Tour: React.FC<Props> = ({ setTourIsVisible }) => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const finishTour = () => {
    setVisible(false);
    completeUserJourney();
    setTourIsVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <TourContainer style={{ background: current === 0 ? white : black }}>
      <div>{steps[current].content}</div>
      {current !== 0 && (
        <Steps
          current={current}
          items={items}
          type="inline"
          style={{
            width: "100vw",
            justifyContent: "center",
            backgroundColor: black,
            paddingTop: spacingXs,
          }}
        />
      )}
      <div
        style={{
          marginTop: 24,
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          backgroundColor: current === 0 ? white : black,
        }}
      >
        {current === 0 && (
          <BottomHalfFirstSlide>
            <Button
              style={{ width: "fit-content" }}
              type="primary"
              onClick={() => next()}
            >
              Explore
            </Button>
            <Button type="link" onClick={finishTour}>
              ...thanks, I like to figure out myself
            </Button>
          </BottomHalfFirstSlide>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && current !== 0 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={finishTour}>
            Done
          </Button>
        )}
      </div>
      {current > 0 && (
        <Button
          type="link"
          onClick={finishTour}
          style={{ marginTop: spacingL, marginLeft: "80vw" }}
        >
          skip
        </Button>
      )}
    </TourContainer>
  );
};

export default Tour;

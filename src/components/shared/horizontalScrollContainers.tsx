import React, { Fragment } from "react";
import ImageCardL from "./imageCardL";
import { variables } from "../../common/variables";
import Title from "antd/es/typography/Title";
import { Category, KindnessAction } from "../../common/interfaces";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props {
  category: Category;
  onPick: (event: React.MouseEvent<HTMLElement>, item: KindnessAction) => void;
  isPickEnabled: boolean;
  kindnessActions: KindnessAction[];
}

const StyledCarousel = styled(Carousel)`
  padding-bottom: ${variables.spacingS};

  .react-multiple-carousel__arrow--left,
  .react-multiple-carousel__arrow--right {
    top: 20%;
  }
`;

const HorizontalScrollContainers: React.FC<Props> = ({
  category,
  onPick,
  isPickEnabled,
  kindnessActions,
}) => {
  const filteredActions = kindnessActions.filter(
    (item) => item.category === category.name
  );
  if (filteredActions.length === 0) {
    return null;
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1600 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1600, min: 900 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 900, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
    },
  };

  return (
    <Fragment key={category.id}>
      <Title
        level={3}
        style={{
          margin: `0 auto ${variables.spacingXxs} calc(4% + 1px)`,
          width: "90vw",
        }}
      >
        {category.name}
      </Title>
      <StyledCarousel responsive={responsive} infinite={true}>
        {filteredActions.map((item) => (
          <ImageCardL
            item={item}
            key={item.id}
            isPickEnabled={isPickEnabled}
            onPick={onPick}
          />
        ))}
      </StyledCarousel>
    </Fragment>
  );
};

export default HorizontalScrollContainers;

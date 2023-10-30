import React, { Fragment } from "react";
import ImageCardL from "./imageCardL";
import { variables } from "../../common/variables";
import {
  Category,
  CategoryNames,
  KindnessAction,
} from "../../common/interfaces";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CategoryButton } from "./sharedLayouts";

interface Props {
  category: Category;
  onPick: (event: React.MouseEvent<HTMLElement>, item: KindnessAction) => void;
  isPickEnabled: boolean;
  kindnessActions: KindnessAction[];
  filterByCategory: (category: Category) => void;
  displayTour?: boolean;
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
  filterByCategory,
  displayTour,
}) => {
  const filteredActions = kindnessActions?.filter(
    (item) => item.category === category.id
  );
  if (filteredActions?.length === 0) {
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
      {filteredActions && filteredActions.length > 0 && (
        <CategoryButton
          type="link"
          size="large"
          onClick={() => filterByCategory(category)}
        >
          {category.name}
        </CategoryButton>
      )}

      {filteredActions && (
        <StyledCarousel
          responsive={responsive}
          infinite={true}
          ssr={true}
          customTransition="all .5"
          transitionDuration={100}
        >
          {filteredActions?.map((item) => (
            <ImageCardL
              item={item}
              key={item.id}
              isPickEnabled={isPickEnabled}
              onPick={onPick}
              isGlowing={
                item === filteredActions[0] &&
                category.name === CategoryNames.SOCIAL &&
                displayTour
              }
            />
          ))}
        </StyledCarousel>
      )}
    </Fragment>
  );
};

export default HorizontalScrollContainers;

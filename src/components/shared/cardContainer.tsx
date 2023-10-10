import React from "react";
import ImageCardL from "./imageCardL";
import { KindnessAction } from "../../common/interfaces";
import { useSearchParams } from "react-router-dom";
import { CategoryButton, Flexbox } from "./sharedLayouts";
import styled from "styled-components";
import { variables } from "../../common/variables";

interface Props {
  onPick: (event: React.MouseEvent<HTMLElement>, item: KindnessAction) => void;
  isPickEnabled: boolean;
  kindnessActions: KindnessAction[];
}

const StyledContainer = styled(Flexbox)`
  display: flex;
  gap: ${variables.spacingS};
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100vw;
`;

const CardContainer: React.FC<Props> = ({
  onPick,
  isPickEnabled,
  kindnessActions,
}) => {
  let [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const filteredActions = kindnessActions.filter(
    (item) => item.category === category
  );
  if (filteredActions.length === 0) {
    return null;
  }

  return (
    <>
      <CategoryButton type="link" size="large">
        {category ?? ""}
      </CategoryButton>
      <StyledContainer>
        {filteredActions.map((item) => (
          <ImageCardL
            item={item}
            key={item.id}
            isPickEnabled={isPickEnabled}
            onPick={onPick}
          />
        ))}
      </StyledContainer>
    </>
  );
};

export default CardContainer;

import React, { Fragment } from "react";
import ImageCardL from "./imageCardL";
import { Category, KindnessAction } from "../../common/interfaces";
import { useSearchParams } from "react-router-dom";
import { Flexbox, TagButton } from "./sharedLayouts";
import styled from "styled-components";
import { variables } from "../../common/variables";
import { categories } from "../../common/mockData";
import { Button } from "antd";

interface Props {
  actions: KindnessAction[];
  likedActions: number[];
  filterByCategory: (category: Category) => void;
}

const StyledContainer = styled(Flexbox)`
  display: flex;
  gap: ${variables.spacingS};
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100vw;
`;

const ActiveTagButton = styled(Button)`
  background-color: ${variables.pink3};
  color: ${variables.white};
  border: none;
  box-shadow: ${variables.shadow1};
`;

const CardContainer: React.FC<Props> = ({
  actions,
  likedActions,
  filterByCategory,
}) => {
  let [searchParams] = useSearchParams();
  const activeCategoryName = searchParams.get("category") || "All";
  if (actions.length === 0) {
    return null;
  }

  const categoriesAndAll = [{ id: 4, name: "All" }, ...categories];

  return (
    <>
      <Flexbox
        style={{
          marginBottom: variables.spacingS,
          marginLeft: variables.spacingXs,
          gap: variables.spacingXs,
          justifyContent: "flex-start",
        }}
      >
        {categoriesAndAll.map((item, index) => (
          <Fragment key={index}>
            {item.name === activeCategoryName ? (
              <ActiveTagButton size="small" style={{ borderRadius: "15px" }}>
                {item.name}
              </ActiveTagButton>
            ) : (
              <TagButton
                size="small"
                style={{ borderRadius: "15px" }}
                onClick={() => filterByCategory(item)}
              >
                {item.name}
              </TagButton>
            )}
          </Fragment>
        ))}
      </Flexbox>
      <StyledContainer>
        {actions.map((item, index) => (
          <ImageCardL
            item={item}
            key={item.id}
            isLiked={likedActions?.includes(item?.id!)}
            shouldPreload={index < 1}
          />
        ))}
      </StyledContainer>
    </>
  );
};

export default CardContainer;

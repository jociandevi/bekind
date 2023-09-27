import React, { Fragment, useEffect, useMemo, useState } from "react";
import { HorizontalScrollContainer } from "./sharedLayouts";
import ImageCardL from "./imageCardL";
import { variables } from "../../common/variables";
import Title from "antd/es/typography/Title";
import { Category, KindnessAction } from "../../common/interfaces";
import styled from "styled-components";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Props {
  category: Category;
  onPick: (event: React.MouseEvent<HTMLElement>, item: KindnessAction) => void;
  isPickEnabled: boolean;
  kindnessActions: KindnessAction[];
}

interface LinkedKindnessAction extends KindnessAction {
  next: KindnessAction;
  prev: KindnessAction;
}

const LeftArrowButton = styled(Button)`
  position: absolute;
  top: 22%;
  left: 1vw;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
`;

const RightArrowButton = styled(Button)`
  position: absolute;
  top: 22%;
  right: 1vw;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
`;

const HorizontalScrollContainers: React.FC<Props> = ({
  category,
  onPick,
  isPickEnabled,
  kindnessActions,
}) => {
  const [displayed, setDisplayed] = useState<LinkedKindnessAction[]>([]);

  const linkedItems: LinkedKindnessAction[] = useMemo(() => {
    const categoryItems = kindnessActions.filter(
      (item) => item.category === category.name
    );

    return categoryItems.map((item, index) => ({
      prev:
        index === 0
          ? categoryItems[categoryItems.length - 1]
          : categoryItems[index - 1],
      next:
        index === categoryItems.length - 1
          ? categoryItems[0]
          : categoryItems[index + 1],
      ...item,
    }));
  }, [category.name, kindnessActions]);

  useEffect(() => {
    setDisplayed(linkedItems.slice(0, 5));
  }, [linkedItems]);

  const goLeft = () => {};
  const goRight = () => {
    setDisplayed((prev) => {
      const nextArray = prev.slice(1);
      const nextItem = prev[prev.length - 1].next;
      const nextLinkedItem = linkedItems.find(
        (item) => item.id === nextItem.id
      );
      nextArray.push(nextLinkedItem!);
      return nextArray;
    });
  };

  if (displayed.length === 0) {
    return null;
  }

  // lets show arrow buttons to both ways

  return (
    <Fragment key={category.id}>
      <Title
        level={3}
        style={{ margin: `0 ${variables.spacingS}`, width: "90vw" }}
      >
        {category.name}
      </Title>
      <HorizontalScrollContainer>
        {displayed.map((item) => (
          <ImageCardL
            item={item}
            key={item.id}
            isPickEnabled={isPickEnabled}
            onPick={onPick}
          />
        ))}
        <LeftArrowButton
          shape="circle"
          icon={<LeftOutlined />}
          onClick={goLeft}
        />
        <RightArrowButton
          shape="circle"
          icon={<RightOutlined />}
          onClick={goRight}
        />
      </HorizontalScrollContainer>
    </Fragment>
  );
};

export default HorizontalScrollContainers;

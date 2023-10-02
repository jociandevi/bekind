import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import ImageCardL from "./imageCardL";
import { variables } from "../../common/variables";
import Title from "antd/es/typography/Title";
import { Category, KindnessAction } from "../../common/interfaces";
import styled from "styled-components";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { useSwipeable } from "react-swipeable";

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

const HorizontalScrollContainer = styled.div`
  display: flex;
  position: relative;
  gap: ${variables.spacingS}};
  width: 100vw;
  @media only screen and (max-width: 600px) {
    overflow-x: scroll;
    scrollbar-width: none;
    scroll-padding-left: 12px;
    scroll-snap-type: x mandatory;

    ::-webkit-scrollbar {
      display: none;
    }
  }
  padding: 12px 0 20px 5px;
  
`;

const HorizontalScrollContainers: React.FC<Props> = ({
  category,
  onPick,
  isPickEnabled,
  kindnessActions,
}) => {
  const [displayed, setDisplayed] = useState<LinkedKindnessAction[]>([]);
  const { md } = useMediaQueries();

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
    setDisplayed(md ? linkedItems.slice(0, 5) : linkedItems);
  }, [linkedItems, md]);

  const handlers = useSwipeable({ trackMouse: true });

  const goLeft = useCallback(() => {
    setDisplayed((prev) => {
      const nextArray = prev.slice(0, -1);
      const prevItem = prev[0].prev;
      const nextLinkedItem = linkedItems.find(
        (item) => item.id === prevItem.id
      );
      nextArray.unshift(nextLinkedItem!);
      return nextArray;
    });
  }, [linkedItems]);

  const goRight = useCallback(() => {
    setDisplayed((prev) => {
      const nextArray = prev.slice(1);
      const nextItem = prev[prev.length - 1].next;
      const nextLinkedItem = linkedItems.find(
        (item) => item.id === nextItem.id
      );
      nextArray.push(nextLinkedItem!);
      return nextArray;
    });
  }, [linkedItems]);

  if (displayed.length === 0) {
    return null;
  }

  return (
    <Fragment key={category.id}>
      <Title
        level={3}
        style={{ margin: `0 ${variables.spacingS}`, width: "90vw" }}
      >
        {category.name}
      </Title>
      <HorizontalScrollContainer {...handlers}>
        {displayed.map((item) => (
          <ImageCardL
            item={item}
            key={item.id}
            isPickEnabled={isPickEnabled}
            onPick={onPick}
          />
        ))}
        {md && (
          <LeftArrowButton
            shape="circle"
            icon={<LeftOutlined />}
            onClick={goLeft}
          />
        )}
        {md && (
          <RightArrowButton
            shape="circle"
            icon={<RightOutlined />}
            onClick={goRight}
          />
        )}
      </HorizontalScrollContainer>
    </Fragment>
  );
};

export default HorizontalScrollContainers;

import React, { useEffect, useState } from "react";
import { Flexbox, TagButton } from "./sharedLayouts";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";
import styled from "styled-components";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { KindnessAction } from "../../common/interfaces";
import { useGetApi } from "../../common/apiCalls";
import { spacingXs } from "../../common/variables";

const TagContainer = styled(Flexbox)`
  gap: ${spacingXs};
  justify-content: flex-start;
`;

const StyledButtonText = styled.span`
  overflow: hidden;
  white-space: nowrap;
  display: block !important;
  text-overflow: ellipsis;
`;

interface Props {
  item: KindnessAction;
}

const Tags: React.FC<Props> = ({ item }) => {
  const [actionCount, setActionCount] = useState<number | undefined>();
  const { callGetApi: getActionCount } = useGetApi(
    `api/Kindness/KindnessHistoryCount/${item.id}`
  );

  useEffect(() => {
    async function fetchData() {
      const daily = await getActionCount();
      setActionCount(daily?.data);
    }
    fetchData();
  }, [getActionCount]);

  return (
    <TagContainer>
      <Tooltip title={item.title}>
        <Button
          type="primary"
          size="small"
          style={{
            borderRadius: "15px",
            maxWidth: "50vw",
          }}
        >
          <StyledButtonText>{item.title}</StyledButtonText>
        </Button>
      </Tooltip>
      <TagButton
        size="small"
        icon={<UserOutlined />}
        style={{ borderRadius: "15px" }}
      >
        {actionCount}
      </TagButton>
      <TagButton
        size="small"
        icon={<ClockCircleOutlined />}
        style={{ borderRadius: "15px" }}
      >
        {item.duration ?? 20}min
      </TagButton>
    </TagContainer>
  );
};

export default Tags;

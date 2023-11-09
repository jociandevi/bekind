import React, { useEffect, useState } from "react";
import Tooltip from "antd/es/tooltip";
import styled from "styled-components";
import { useMediaQueries } from "../../../common/mediaQueryHook";
import { variables } from "../../../common/variables";
import { useNavigate } from "react-router-dom";
import { KindnessAction } from "../../../common/interfaces";
import { transformTitleToUrl } from "../../../common/util";
import { useGetApi } from "../../../common/apiCalls";
import Loading from "../../shared/loading";

interface Props {
  actionId: number;
}

const Image = styled.img<{
  md?: boolean;
}>`
  width: ${(props) => (props.md ? "6vw" : "12vw")};
  height: ${(props) => (props.md ? "6vw" : "12vw")};
  object-fit: cover;
  border-radius: 50%;
  margin-left: ${variables.spacingXs};
`;

const NecessaryAction: React.FC<Props> = ({ actionId }) => {
  const { md } = useMediaQueries();
  const navigate = useNavigate();
  const { callGetApi, loading } = useGetApi(`api/Kindness/${actionId}`);
  const [action, setAction] = useState<KindnessAction | undefined>();

  useEffect(() => {
    callGetApi().then((res: any) => {
      setAction(res?.data);
    });
  }, [callGetApi]);

  const navigateToKindnessDetails = (title?: string) => {
    if (!title) return;
    const url = transformTitleToUrl(title);
    navigate(`/${actionId}/${url}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Tooltip title={action?.title} trigger={"hover"}>
      <Image
        src={action?.imageUrl}
        alt={action?.title}
        md={md}
        onClick={() => navigateToKindnessDetails(action?.title)}
      />
    </Tooltip>
  );
};

export default NecessaryAction;

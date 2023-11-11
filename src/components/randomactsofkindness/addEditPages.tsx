import React from "react";
import { useParams } from "react-router-dom";
import AddEditBadge from "./addEditBadge";
import AddNew from "./addNew";

const AddEditPages: React.FC = () => {
  const params = useParams();
  const badgePage = params.type === "badge";
  const actionPage = params.type === "action";

  return (
    <>
      {badgePage && <AddEditBadge />}
      {actionPage && <AddNew />}
    </>
  );
};

export default AddEditPages;

import { Navigate, useParams } from "react-router";
import { CulturalSpaceId } from "../cultural-spaces/cultural-spaces.mock";
import { Museums } from "../museums/museums";

export const CulturalSpace = () => {
  const pathId = useParams<{ id: string }>().id;

  switch (pathId) {
    case CulturalSpaceId.MUSEOS:
      return <Museums />;
    default:
      return <Navigate to="/" />;
  }
};

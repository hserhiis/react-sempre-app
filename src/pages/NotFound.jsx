import React, {lazy} from "react";

const NotFoundBlock = lazy(() => import("../components/NotFoundBlock"));
const ButtonBack = lazy(() => import("../components/NotFoundBlock/ButtonBack"));

const NotFound = () => {
  return (
    <div className="not-found-content">
      <NotFoundBlock />
      <ButtonBack />
    </div>
  );
};

export default NotFound;

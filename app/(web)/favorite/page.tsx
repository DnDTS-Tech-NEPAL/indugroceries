import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { FavoriteContainer } from "./(components)";

const Favorite = async () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Favorite"
        breadcrumb={BREADCRUMB_CONFIG.FAVORITE}
      />
      <FavoriteContainer />
    </>
  );
};

export default Favorite;

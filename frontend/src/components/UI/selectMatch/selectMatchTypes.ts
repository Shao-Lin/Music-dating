export type SelectMatchProps = {
  meId: string;
  feedId: string;
};
export type SelectMatchType = {
  userMe: {
    MeId: string;
    meMatch: boolean;
  };
  userFeed: {
    userFeedId: string;
  };
};

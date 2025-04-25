export type SelectMatchProps = {
  meId: number;
  feedId: number;
};
export type SelectMatchType = {
  userMe: {
    MeId: number;
    meMatch: boolean;
  };
  userFeed: {
    userFeedId: number;
  };
};

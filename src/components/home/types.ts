export type Profile = {
  name: string;
  handle: string;
  avatar: string;
  badge?: string;
};

export type BasePost<
  TType extends "user" | "company" | "shared-company" | "shared-user",
> = {
  id: string;
  type: TType;
  author: Profile;
  time: string;
  location: string;
  text: string;
  image?: string;
  stats: {
    likes: string;
    comments: string;
    shares: string;
  };
};

export type UserPost = BasePost<"user">;

export type CompanyPost = BasePost<"company"> & {
  type: "company";
  image: string;
  package: {
    title: string;
    price: string;
    dates: string;
    seats: string;
  };
};

export type SharedCompanyPost = BasePost<"shared-company"> & {
  type: "shared-company";
  sharedFrom: Profile;
  package: CompanyPost["package"];
  image: string;
};

export type SharedUserPost = BasePost<"shared-user"> & {
  type: "shared-user";
  sharedFrom: Profile;
  sharedText: string;
  image: string;
};

export type FeedPost =
  | UserPost
  | CompanyPost
  | SharedCompanyPost
  | SharedUserPost;

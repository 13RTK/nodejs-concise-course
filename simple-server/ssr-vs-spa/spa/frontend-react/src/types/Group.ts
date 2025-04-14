export type Group = {
  groupName: string;
  memberCount: number;
  members: {
    name: string;
    position: string;
    avatar: string;
  }[];
  isDefault: boolean;
  avatar: string;
};

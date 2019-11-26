type str = "uid" | "dt" | "os" | "device" | "cookie" | "tenant" | "mid";
export interface Post {
  [key: string]: {
    url: string;
    defaultData: str[];
  };
}

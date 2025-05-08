// types/sessionTypes.ts
export type UserType = {
    accessToken: string;
    refreshToken: string;
    username: string;
  };
  
  export type SessionType = {
    data: {
      expires: string;
      jwt: string;
      user: UserType;
    };
    status: "loading" | "authenticated" | "unauthenticated";
  };
  
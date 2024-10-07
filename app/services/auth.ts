export const authenticator = {
  isAuthenticated: (request: {}, options?: { failureRedirect: string }) => {
    return {
      email: "test@test.com",
      name: "test",
      userId: "123",
      roles: ["user"],
      createdAt: new Date().toISOString(),
    };
  },
  logout: (request: Request, options?: { redirectTo: string }) => {
    return {
      success: true,
    };
  },
  authenticate: (
    strategy: string,
    request: Request,
    options?: {
      successRedirect: string;
      failureRedirect: string;
    }
  ) => {
    return {
      success: true,
    };
  },
};

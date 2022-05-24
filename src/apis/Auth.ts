import { SignupRequest } from "../types/Auth";

const AuthApi = {
  signup: (signupRequest: SignupRequest) => {
    return fetch("http://localhost:8080/v1/users", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupRequest),
    });
  },
};

export default AuthApi;

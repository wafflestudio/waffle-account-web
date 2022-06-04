import { SignupRequest } from "../types/Auth";

const baseUri = import.meta.env.VITE_API_URL;

console.log(baseUri);

const AuthApi = {
  signup: (signupRequest: SignupRequest) => {
    return fetch(`${baseUri}/v1/users`, {
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

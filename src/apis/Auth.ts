import { SignupRequest, SigninRequest } from "../types/Auth";

const baseUri = import.meta.env.VITE_API_URL;

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
  oauthSignup: (provider: "google" | "kakao", accessToken: string) => {
    return fetch(`${baseUri}/v1/oauth/${provider}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken }),
    });
  },
  oauthSignupWithCode: (
    provider: "google" | "kakao",
    authorizationCode: string
  ) => {
    return fetch(`${baseUri}/v1/users/login/${provider}/code`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorization_code: authorizationCode,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      }),
    });
  },
  signin: (signinRequest: SigninRequest) => {
    return fetch(`${baseUri}/v1/auth/signin`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinRequest),
    });
  },
};

export default AuthApi;

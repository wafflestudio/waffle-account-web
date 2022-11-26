import { SignupRequest, SigninRequest } from "../types/Auth";

const baseUri = import.meta.env.VITE_API_URL;

const REDIRECT_URI = {
  google: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  kakao: import.meta.env.VITE_KAKAO_REDIRECT_URI,
  naver: "https://sso.wafflestudio.com/oauth/callback/naver.html",
  github: "https://sso.wafflestudio.com/oauth/callback/github.html",
  apple: "https://sso.wafflestudio.com/oauth/callback/apple.html",
};

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
    provider: "google" | "kakao" | "naver" | "github" | "apple",
    authorizationCode: string,
    state?: string | null
  ) => {
    return fetch(`${baseUri}/v1/users/login/${provider}/code`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorization_code: authorizationCode,
        state,
        redirect_uri: REDIRECT_URI[provider],
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

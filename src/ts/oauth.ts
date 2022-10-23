import { AuthApi } from "../apis";
import { SigninResponse } from "../types/Auth";

window.onload = function () {
  if (window.location.href.includes("kakao")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    AuthApi.oauthSignupWithCode("kakao", code)
      .then((res) => res.json())
      .then((res: SigninResponse) => {
        console.log(res);

        window.onSuccessSignIn(res.access_token);
      })
      .catch();

    return;
  }

  const params = new URLSearchParams(window.location.hash.replace("#", "?"));

  const accessToken = params.get("access_token");

  if (!accessToken) return;

  AuthApi.oauthSignup("google", accessToken)
    .then((res) => res.json())
    .then((res: SigninResponse) => {
      localStorage.setItem("accessToken", res.access_token);
      localStorage.setItem("refreshToken", res.refresh_token);
    })
    .catch();
};

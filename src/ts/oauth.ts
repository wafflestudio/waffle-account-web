import { AuthApi } from "../apis";
import { SigninResponse } from "../types/Auth";

window.onload = function () {
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

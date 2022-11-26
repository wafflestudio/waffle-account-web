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
        alert(res.access_token);
        try {
          window.Android.onSuccessSignIn(res.access_token);
          return;
        } catch {}

        try {
          window.webkit.messageHandlers.onSuccessSignIn.postMessage(
            res.access_token
          );
          return;
        } catch {}
      })
      .catch(() => {
        alert("fail");
      });

    return;
  } else if (window.location.href.includes("naver")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const state = params.get("state");

    if (!code) return;

    AuthApi.oauthSignupWithCode("naver", code, state)
      .then((res) => res.json())
      .then((res: SigninResponse) => {
        alert(res.access_token);
        try {
          window.Android.onSuccessSignIn(res.access_token);
          return;
        } catch {}

        try {
          window.webkit.messageHandlers.onSuccessSignIn.postMessage(
            res.access_token
          );
          return;
        } catch {}
      })
      .catch(() => {
        alert("fail");
      });

    return;
  } else if (window.location.href.includes("github")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    AuthApi.oauthSignupWithCode("github", code)
      .then((res) => res.json())
      .then((res: SigninResponse) => {
        alert(res.access_token);
        try {
          window.Android.onSuccessSignIn(res.access_token);
          return;
        } catch {}

        try {
          window.webkit.messageHandlers.onSuccessSignIn.postMessage(
            res.access_token
          );
          return;
        } catch {}
      })
      .catch(() => {
        alert("fail");
      });

    return;
  } else if (window.location.href.includes("apple")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    AuthApi.oauthSignupWithCode("apple", code)
      .then((res) => res.json())
      .then((res: SigninResponse) => {
        alert(res.access_token);
        try {
          window.Android.onSuccessSignIn(res.access_token);
          return;
        } catch {}

        try {
          window.webkit.messageHandlers.onSuccessSignIn.postMessage(
            res.access_token
          );
          return;
        } catch {}
      })
      .catch(() => {
        alert("fail");
      });

    return;
  }

  const params = new URLSearchParams(window.location.search);

  const code = params.get("code");

  if (!code) return;

  AuthApi.oauthSignupWithCode("google", code)
    .then((res) => res.json())
    .then((res: SigninResponse) => {
      localStorage.setItem("accessToken", res.access_token);
      localStorage.setItem("refreshToken", res.refresh_token);
      try {
        window.Android.onSuccessSignIn(res.access_token);
        return;
      } catch {}

      try {
        window.webkit.messageHandlers.onSuccessSignIn.postMessage(
          res.access_token
        );
        return;
      } catch {}
    })
    .catch();
};

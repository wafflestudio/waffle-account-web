import { AuthApi } from "../apis";
import { SigninResponse } from "../types/Auth";

const onSuccess = (res: SigninResponse) => {
  try {
    window.Android.onSuccessSignIn(res.access_token);
    return;
  } catch {}

  try {
    window.webkit.messageHandlers.onSuccessSignIn.postMessage(res.access_token);
    return;
  } catch {}

  const cookieName = encodeURIComponent("waffle.access-token");
  const cookiveValue = encodeURIComponent(res.access_token);
  const domain = "wafflestudio.com";

  document.cookie = `${cookieName}=${cookiveValue}; path=/; domain=${domain} `;

  const redirectUri = localStorage.getItem("redirectUri");

  if (redirectUri) {
    window.location.href = redirectUri;

    localStorage.removeItem("redriectUri");
  }
};

window.onload = function () {
  if (window.location.href.includes("kakao")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    AuthApi.oauthSignupWithCode("kakao", code)
      .then((res) => res.json())
      .then(onSuccess);
    return;
  } else if (window.location.href.includes("naver")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const state = params.get("state");

    if (!code) return;

    AuthApi.oauthSignupWithCode("naver", code, state)
      .then((res) => res.json())
      .then(onSuccess);

    return;
  } else if (window.location.href.includes("github")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    AuthApi.oauthSignupWithCode("github", code)
      .then((res) => res.json())
      .then(onSuccess);

    return;
  } else if (window.location.href.includes("apple")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    AuthApi.oauthSignupWithCode("apple", code)
      .then((res) => res.json())
      .then(onSuccess);

    return;
  }

  const params = new URLSearchParams(window.location.search);

  const code = params.get("code");

  if (!code) return;

  AuthApi.oauthSignupWithCode("google", code)
    .then((res) => res.json())
    .then(onSuccess);
};

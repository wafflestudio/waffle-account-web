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

const parseJson = (res: any) => {
  if (res.status != 200) {
    throw Error(undefined, { cause: res.status });
  }

  return res.json();
};

const onError = (e: any) => {
  console.log(e.cause);

  const message =
    e.cause === 409
      ? "이미 사용중인 이메일입니다. 다른 로그인 방식을 사용해주세요."
      : "로그인에 실패했습니다. 다시 시도해주세요.";

  alert(message);
  window.location.href = "/index.html";
};

window.onload = function () {
  if (window.location.href.includes("kakao")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    AuthApi.oauthSignupWithCode("kakao", code)
      .then(parseJson)
      .then(onSuccess)
      .catch(onError);
    return;
  } else if (window.location.href.includes("naver")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const state = params.get("state");

    if (!code) return;

    AuthApi.oauthSignupWithCode("naver", code, state)
      .then(parseJson)
      .then(onSuccess)
      .catch(onError);

    return;
  } else if (window.location.href.includes("github")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    AuthApi.oauthSignupWithCode("github", code)
      .then(parseJson)
      .then(onSuccess)
      .catch(onError);
    return;
  } else if (window.location.href.includes("apple")) {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    if (!code) return;

    AuthApi.oauthSignupWithCode("apple", code)
      .then(parseJson)
      .then(onSuccess)
      .catch(onError);

    return;
  }

  const params = new URLSearchParams(window.location.search);

  const code = params.get("code");

  if (!code) return;

  AuthApi.oauthSignupWithCode("google", code)
    .then(parseJson)
    .then(onSuccess)
    .catch(onError);
};

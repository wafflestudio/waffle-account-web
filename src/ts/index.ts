const waffleButton = document.getElementById("waffle");
const googleButton = document.getElementById("google");
const kakaoButton = document.getElementById("kakao");
const naverButton = document.getElementById("naver");
const githubButton = document.getElementById("github");
const appleButton = document.getElementById("apple");

const CLIENT_ID = {
  GOOGLE:
    "760558146658-s29dkmip6ktv4msbnlodqq61rdlm8qtu.apps.googleusercontent.com",
  NAVER: "IEVe0K7IJVBuM5ccDeQm",
  GITHUB: "d12c8229d6de79e48516",
  APPLE: "com.wafflestudio.sso.test",
};

const REDIRECT_URI = {
  GOOGLE: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  KAKAO: import.meta.env.VITE_KAKAO_REDIRECT_URI,
  NAVER: "https://sso.wafflestudio.com/oauth/callback/naver.html",
  GITHUB: "https://sso.wafflestudio.com/oauth/callback/github.html",
  APPLE: "https://sso.wafflestudio.com/oauth/callback/apple.html",
};

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY;

waffleButton?.addEventListener("click", () => {
  window.location.href = "/signin/index.html";
});

googleButton?.addEventListener("click", () => {
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  const form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2Endpoint);

  var params = {
    client_id: CLIENT_ID.GOOGLE,
    redirect_uri: REDIRECT_URI.GOOGLE,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/userinfo.email",
    include_granted_scopes: "true",
    state: "pass-through value",
  };

  Object.entries(params).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", key);
    input.setAttribute("value", String(value));
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
});

kakaoButton?.addEventListener("click", () => {
  window.Kakao?.Auth?.authorize({
    redirectUri: REDIRECT_URI.KAKAO,
  });
});

naverButton?.addEventListener("click", () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID.NAVER,
    redirect_uri: REDIRECT_URI.NAVER,
    response_type: "code",
  });

  const origin = "https://nid.naver.com/oauth2.0/authorize";
  window.location.href = `${origin}?${params.toString()}`;
  // "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=IEVe0K7IJVBuM5ccDeQm&redirect_uri=https://sso.wafflestudio.com/oauth/callback/naver.html";
});

githubButton?.addEventListener("click", () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID.GITHUB,
    redirect_uri: REDIRECT_URI.GITHUB,
    response_type: "code",
  });

  const origin = "https://github.com/login/oauth/authorize";
  window.location.href = `${origin}?${params.toString()}`;
});

appleButton?.addEventListener("click", () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID.APPLE,
    redirect_uri: REDIRECT_URI.APPLE,
    response_type: "code",
    response_mode: "query",
    m: "11",
    v: "1.5.4",
  });

  const origin = "https://appleid.apple.com/auth/authorize";
  window.location.href = `${origin}?${params.toString()}`;
});

window.Kakao.init(KAKAO_APP_KEY);

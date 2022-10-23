const waffleButton = document.getElementById("waffle");
const googleButton = document.getElementById("google");
const kakaoButton = document.getElementById("kakao");

const REDIRECT_URI = {
  GOOGLE: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  KAKAO: import.meta.env.VITE_KAKAO_REDIRECT_URI,
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
    client_id:
      "760558146658-s29dkmip6ktv4msbnlodqq61rdlm8qtu.apps.googleusercontent.com",
    redirect_uri: REDIRECT_URI.GOOGLE,
    response_type: "token",
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

window.Kakao.init(KAKAO_APP_KEY);

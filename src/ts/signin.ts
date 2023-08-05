import { AuthApi } from "../apis";
import { SigninResponse } from "../types/Auth";

const loginButton = document.getElementById("login-button");
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

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
    localStorage.removeItem("redriectUri");

    window.location.href = redirectUri;
  }
};

const onClickLoginButton = async (e: any) => {
  e.preventDefault();
  e.stopPropagation();

  if (!emailInput.value || !passwordInput.value) {
    alert("이메일과 비밀번호를 입력해 주세요.");
    return;
  }

  try {
    console.log("44444444444444444444444");
    const res = await AuthApi.signin({
      email: emailInput.value,
      password: passwordInput.value,
    });

    console.log("123123123");
    const responseJson = await res.json();
    console.log(responseJson);

    console.log("why");

    await onSuccess(responseJson);
  } catch {
    alert("이메일과 비밀번호를 확인해 주세요.");
  }
};

loginButton?.addEventListener("click", onClickLoginButton);

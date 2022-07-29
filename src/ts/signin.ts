import { AuthApi } from "../apis";
import { SigninResponse } from "../types/Auth";

const signinForm = document.getElementById("signin-form");
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

signinForm?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  if (!emailInput.value || !passwordInput.value) {
    alert("이메일과 비밀번호를 입력해 주세요.");
    return;
  }

  AuthApi.signin({
    email: emailInput.value,
    password: passwordInput.value,
  })
    .then((res) => res.json())
    .then((res: SigninResponse) => {
      localStorage.setItem("accessToken", res.access_token);
      localStorage.setItem("refreshToken", res.refresh_token);
      window.location.href = "/index.html";
    })
    .catch(() => alert("이메일과 비밀번호를 확인해 주세요."));
});

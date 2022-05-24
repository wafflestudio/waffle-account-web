import { AuthApi } from "../apis";
import { SignupResponse } from "../types/Auth";

const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const checkPasswordInput = document.getElementById(
  "checkPassword"
) as HTMLInputElement;

signupForm?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  if (passwordInput.value !== checkPasswordInput.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  AuthApi.signup({
    email: emailInput.value,
    password: passwordInput.value,
  })
    .then((res) => res.json())
    .then((res: SignupResponse) => {
      localStorage.setItem("accessToken", res.access_token);
      localStorage.setItem("refreshToken", res.refresh_token);
    })
    .catch(() => alert("회원 가입에 실패하였습니다."));
});

import { AuthApi } from "../apis";

const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const checkPasswordInput = document.getElementById(
  "checkPassword"
) as HTMLInputElement;

signupForm?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  e.stopPropagation();

  if (passwordInput.value !== checkPasswordInput.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  AuthApi.signup({
    email: emailInput.value,
    password: passwordInput.value,
  })
    .then((res) => {
      if (res.status != 200) {
        throw Error();
      }

      return res.json();
    })
    .then(() => {
      window.alert("회원가입이 완료되었습니다.");
      window.location.href = "/index.html";
    })
    .catch((e) => {
      alert(e.message || "회원가입에 실패하였습니다.");
    });
});

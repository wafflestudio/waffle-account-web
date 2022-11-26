export {};

declare global {
  interface Window {
    Kakao: any;
    Android: any;
    naver: any;
    naver_id_login: any;
    webkit: any;
    AppleID: any;
  }
  export function onSuccessSignIn(code: string): void;
}

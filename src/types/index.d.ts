export {};

declare global {
  interface Window {
    Kakao: any;
  }
  export function onSuccessSignIn(code: string): void;
}

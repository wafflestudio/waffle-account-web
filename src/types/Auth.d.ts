interface SignupRequest {
  email: string;
  password: string;
}

interface SignupResponse {
  access_token: string;
  refresh_token: string;
}

interface SigninRequest {
  email: string;
  password: string;
}

interface SigninResponse {
  access_token: string;
  refresh_token: string;
}

export { SignupRequest, SignupResponse, SigninRequest, SigninResponse };

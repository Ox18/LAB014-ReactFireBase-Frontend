import BaseViewModel from "../BaseViewModel";
// This is an interface of ViewModel that will be available
// for View. Here we define all public fields that View will
// be using
export default interface AuthViewModel extends BaseViewModel {
  emailQuery: string;
  passwordQuery: string;
  isSignInButtonVisible: boolean;
  isSignOutButtonVisible: boolean;

  isShowError: boolean;
  errorMessage: string;

  authStatus: string;
  isAuthStatusPositive: boolean;

  onEmailQueryChanged(loginQuery: string): void;
  onPasswordQueryChanged(passwordQuery: string): void;
  onClickSignIn(): void;
  onClickSignOut(): void;
}

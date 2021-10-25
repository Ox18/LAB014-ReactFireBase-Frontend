import AuthListener from "./AuthListener";

// This class holds autorization state (see point 3.1.5).
// In order to update presentation layer, we use an "Observer"
// pattern with AuthListener listener
export default class AuthHolder {
  private authListeners: AuthListener[];
  private isAuthorized: boolean;
  private authToken: string;

  public constructor() {
    this.isAuthorized = false;
    this.authListeners = [];
    this.authToken = "";
  }

  public onSignedIn(authToken: string): void {
    this.isAuthorized = true;
    this.authToken = authToken;
    this.notifyListeners();
  }

  public onSignedOut(): void {
    this.isAuthorized = false;
    this.authToken = "";
    this.notifyListeners();
  }

  public isUserAuthorized(): boolean {
    return this.isAuthorized;
  }

  /**
   * @throws {Error} if user is not authorized
   */
  public getAuthToken(): string {
    if (!this.isAuthorized) {
      throw new Error("User is not authorized");
    }

    return this.authToken;
  }

  public addAuthListener(authListener: AuthListener): void {
    this.authListeners.push(authListener);
  }

  public removeAuthListener(authListener: AuthListener): void {
    this.authListeners.splice(this.authListeners.indexOf(authListener), 1);
  }

  private notifyListeners(): void {
    this.authListeners.forEach((listener) => listener.onAuthChanged());
  }
}

import AuthRepository from "../../domain/repository/auth/AuthRepository";
import ValidationResult from "../../domain/entity/auth/stuctures/ValidationResult";
import AuthorizationResult from "../../domain/entity/auth/stuctures/AuthorizationResult";
// Class that imitates access to the API
export default class AuthFakeApi implements AuthRepository {
  /**
   * @throws {Error} if validation has not passed
   */
  validateCredentials(
    email: string,
    password: string
  ): Promise<ValidationResult> {
    return new Promise((resolve, reject) => {
      // Here we define a rult that the server should support
      if (password.length < 5) {
        reject(new Error("Password length should be more than 5 characters"));
        return;
      }

      resolve({
        validationKey: "A34dZ7",
      });
    });
  }

  /**
   * @throws {Error} if credentials have not passed
   */
  login(
    email: string,
    password: string,
    validationKey: string
  ): Promise<AuthorizationResult> {
    return new Promise((resolve, reject) => {
      // Here we imitate a validation key verification
      if (validationKey === "A34dZ7") {
        // Create stub for account with login "user@email.com" and password "password"
        if (email === "user@email.com" && password === "password") {
          resolve({
            authorizationToken: "Bearer ASKJdsfjdijosd93wiesf93isef",
          });
        }
      } else {
        reject(new Error("Validation key is not correct. Please try later"));
        return;
      }

      reject(new Error("Email or password is not correct"));
    });
  }
}

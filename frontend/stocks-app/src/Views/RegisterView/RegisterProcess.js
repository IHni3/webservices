import identityManagementApiInstance from "../../identityManagementApiInstance";

import { Pbkdf2Hashing } from "../../Hashing";

import { RegisterRequest } from "../../IdentityManagementApi";

export class RegisterProcess {
  hashing;

  constructor(props) {
    this.hashing = new Pbkdf2Hashing();
  }

  onRegisterSubmitted(email, firstname, lastname, password) {
    const request = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      passwordHash: this.hashing.generateHash(password),
    };

    identityManagementApiInstance
      .userRegisterPost(request)
      .then((response) => {
        if (response.ok) {
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }
}

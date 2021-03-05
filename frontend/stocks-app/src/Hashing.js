import * as pbkdf2 from "pbkdf2";

export class Pbkdf2Hashing {
  generateHash(text) {
    let hash = pbkdf2
      .pbkdf2Sync(text, "salt", 1, 32, "sha512")
      .toString();
    return hash;
  }
}

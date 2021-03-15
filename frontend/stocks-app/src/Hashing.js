import * as bcrypt from "bcrypt";

export class Pbkdf2Hashing {
  generateHash(text) {
    return bcrypt.hashSync(text, 4);
  }
}

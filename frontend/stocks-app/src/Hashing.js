import * as bcrypt from "bcryptjs";

export class BCrypt {
  generateHash(text) {
    return text;
    //return bcrypt.hashSync(text, 4);
  }

  checkHash(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

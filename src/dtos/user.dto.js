export class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
  }
}
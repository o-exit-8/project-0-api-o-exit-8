//
export class SqlUser {
  user_id: number = NaN;
  user_name = '';
  user_password = '';
  first_name = '';
  last_name = '';
  email = ' ';
  user_role: number = NaN;

  constructor(user_id, user_name = '', user_password = '', first_name, last_name, email = '', user_role = undefined) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.user_password = user_password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.user_role = user_role;
  }
}
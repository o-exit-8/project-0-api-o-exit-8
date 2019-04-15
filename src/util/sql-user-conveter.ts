import { User } from '../model/user';
import { SqlUser } from '../dto/sql-user.dto';


export function convertSqlUser(user: SqlUser) {
  return new User(user.user_id, user.user_name, undefined, user.first_name, user.last_name, user.email, undefined);
}
export function toSqlUser(user: User) {
  return new SqlUser (user.userId, user.username, user.password, user.firstName, user.lastName, user.email, user.role);
}

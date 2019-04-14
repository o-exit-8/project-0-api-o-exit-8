import { User } from '../model/user';
import { SqlUser } from '../dto/sql-user.dto';


export function convertSqlUser(user: SqlUser) {
  return new User(user.user_id, user.user_name, undefined,  user.email, user.user_role);
}
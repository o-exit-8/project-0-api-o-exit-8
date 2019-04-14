import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { convertSqlRole } from '../util/sql-role-conveter';
import { convertSqlUser } from '../util/sql-user-conveter';

export async function findByUsernameAndPassword(username: string, password: string) {
  let client: PoolClient;
  try {
    console.log('we are here');
    client = await connectionPool.connect();
    console.log('what is failing? ');
    const queryString = `SELECT * FROM ers_api.users WHERE user_name = $1 AND user_password = $2;`;

    const result = await client.query(queryString, [username, password]);
    console.log(`finding this user: ${username}`);
    const user = result.rows[0];

    console.log('Printing user obj: ' + user);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    if (user) {
      const convertedUser = convertSqlUser(user);
      convertedUser.role = convertSqlRole(user);
      return convertedUser;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}

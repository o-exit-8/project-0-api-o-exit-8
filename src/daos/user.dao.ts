import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { convertSqlRole } from '../util/sql-role-conveter';
import { convertSqlUser } from '../util/sql-user-conveter';
import { SqlUser } from '../dto/sql-user.dto';

export async function findUsersById(id: number) {
  let client: PoolClient;
    try {
      client = await connectionPool.connect();
      console.log('is this getting call? ' + id);
      const queryString = 'SELECT * FROM ers_api.users WHERE user_id =$1;';
      const result = await client.query(queryString, [id]);
      console.log(result.rows);
      const user = result.rows[0];
      console.log(`finding this user with: ${id} and name ${user.username}`);
      return user;
    } catch (err) {
      console.log(err);
      return undefined;
    } finally {
      client && client.release();
    }
}
export async function getAllUsers() {
  let client: PoolClient;
    try {
      client = await connectionPool.connect();
      const queryString = `SELECT * FROM ers_api.users
      INNER JOIN ers_api.role ON (user_role = role_id);`;
      const result = await client.query(queryString);
      console.log('Retrieving All users');
      return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err);
        return undefined;
      } finally {
        client && client.release();
      }
}

export async function addUser(user: SqlUser) {
  let client: PoolClient;
  client = await connectionPool.connect();
  console.log('coming from parson Object: ');
  console.log(user);
  client && client.release();
  // try {
  //   client = await connectionPool.connect();
  //   const queryString = 'INSERT INTO ers_api.users (user_name, user_password, first_name, last_name, email, user_role) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  //   const result = await client.query(queryString, [user.user_id, user.user_name, user.user_password, user.first_name, user.last_name, user.email, user.user_role ]);
  //   console.log(result.rows);
  //     // const user = result.rows[0];
  //     console.log(`Adding this user: ${user}`);
  //     return user;
  // } catch (err) {
  //   console.log(err);
  //   return undefined;
  // } finally {
  //   client && client.release();
  // }
}

export async function findByUsernameAndPassword(username: string, password: string) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const queryString = `SELECT * FROM ers_api.users
        INNER JOIN ers_api.role ON (user_role = role_id) WHERE user_name = $1 AND user_password = $2;`;

    const result = await client.query(queryString, [username, password]);
    const user = result.rows[0];

    console.log('Printing PREconverted SQL User: ');
    console.log(user);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    if (user) {
      const convertedUser = convertSqlUser(user);
      convertedUser.role = convertSqlRole(user);
      console.log(`Printing convertedUser: `);
      console.log(convertedUser);
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

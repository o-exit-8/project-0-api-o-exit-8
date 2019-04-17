import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { Reimbursement } from '../model/reimbursement';
import { convertSqlReimb } from '../util/sql-reimbursement-conveter';
import { SqlReimbursement } from '../dto/sql-reimbursement.dto';
//
export async function findAllreimbursement() {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const result = await client.query('SELECT * FROM ers_api.users as u RIGHT JOIN ers_api.reimbursement as re ON u.user_id =re.author;');
      // 'SELECT * FROM ers_api.reimbursement');
    // INNER JOIN reimbursement_status ON (reimbursement.status = reimbursement_status.status_id);');
    return result.rows.map(convertSqlReimb);
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}

export async function findById(id: number) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const queryString = 'SELECT * FROM ers_api.reimbursement WHERE reimbursement_id = $1';
    // 'SELECT * FROM ers_api.users as u RIGHT JOIN ers_api.reimbursement as re ON u.user_id =re.author;';
    //
    const result = await client.query(queryString, [id]);
    const statsId = result.rows[0].status;
    const username = result.rows[0].author;
    console.log(`reimb Statys for client ${username} is: `  );
    if (statsId === 1)
  console.log('Completed');
  else if (statsId === 2)
  console.log('Pending');
  else if (statsId === 3)
  console.log('Denial');
  else
  console.log('not found.');
    return result.rows[0] && convertSqlReimb(result.rows[0]);
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}

export async function findByAuthor(Author: string) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    console.log('this is athor: ');
    console.log(Author);
    const queryString = 'SELECT * FROM ers_api.user WHERE user_name = $1';
    const result = await client.query(queryString, [Author]);
    const username = result.rows[0].user_name;
    const userId = result.rows[0].user_id;
    console.log(username);
    const secQueryString = 'SELECT * FROM ers_api.reimbursement WHERE author = $1';
    const finalResult = await client.query(queryString, [userId]);
    // convert db results into actual spaceships
    const reimb = result.rows.map(convertSqlReimb);
    console.log(reimb);
    return reimb;
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}
export async function addReimb(reimb: SqlReimbursement) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    console.log('Adding user: ');
    console.log(reimb);
    const queryString = 'INSERT INTO ers_api.reimbursement (author, amount,date_submitted, date_resolved, description, resolver, status, reim_type) VALUES ($1, $2, $3, $4, $5, $6, $7,$8);';
    const result = await client.query(queryString, [reimb.author, reimb.amount, reimb.date_submitted, reimb.date_resolved, reimb.description, reimb.resolver, reimb.status, reimb.reim_type]);
    console.log(`USER ADDED: `);
    console.log(result.rows[0]);
      const reimbursement = result.rows[0];
      return reimbursement;
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}
// export async function ( reimb: Reimbursement) {
//   let client: PoolClient;
//   try {
//     client = await connectionPool.connect();
//     const queryString = `INSERT INTO ers_api.spaceship
//     (ship_owner, ship_name, weight, speed, description)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING ship_id as shipId`;
//     const params = []; // ship.owner, ship.name, ship.weight, ship.speed, ship.description];
//     const result = await client.query(queryString, params);

//     return result.rows[0];
//   } catch (err) {
//     console.log(err);
//     return undefined;
//   } finally {
//     client && client.release();
//   }
// }
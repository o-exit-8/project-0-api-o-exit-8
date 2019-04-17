import express from 'express';
import * as reimbursementDao from '../daos/reimbursement.dao';
import { authMiddleware } from '../middleware/auth.middleware';
//import { toSqlReimb } from '../util/sql-Reimbursement-conveter';
//import { SqlReimbursement } from '../dto/sql-reimbursement.dto';
/**S
 * User router will handle all requests starting with
 *  /users
 */
export const reimbursementRouter = express.Router();


/**
 * find all reimbursements
 * endpoint: /reimbursement
 */
reimbursementRouter.get('', [
  authMiddleware(['admin', 'manager']),
  async (req, res) => {
  const reimbursements = await reimbursementDao.findAllreimbursement();
  res.json(reimbursements);
}]);

/**
 * find reimbursement by id
 * endpoint: /reimbursements/:id
 */
reimbursementRouter.get('/:id', [authMiddleware(['admin', 'manager', 'employee']),
async (req, res) => {
  const id = +req.params.id;
  console.log(`retreiving reimbursement with id: ${id}`);
  const st = res.json(await reimbursementDao.findById(id));
}]);

/**
 * find reimbursements by owner id
 * endpoint: /reimbursements/owner/:id
 */
reimbursementRouter.get('/:a', [authMiddleware(['admin', 'manager', 'employee']),
async (req, res) => {
  const a = req.params.a;
  console.log('this is a: ');
  console.log(a);
  res.json(await reimbursementDao.findByAuthor(a));
}]);

reimbursementRouter.post('/add', [
  authMiddleware(['admin', 'manager']),
  async (req, res) => {
    // convert id string to a number and pass to function.
    // get user from body
    const response = req.body;
    console.log(`Adding a new reimbursement`);
    console.log(response);
    // const sqlReimb = toSqlReimb(req.body);
    // const reimb = await reimbursementDao.addReimb(sqlReimb);
    // if (reimb) {
    //   console.log(`User added `);
    //   res.json(reimb);
    // } else {
    //   // res.sendStatus(401);
    //   console.log('Internal Issue. User NO added.');
    //   res.sendStatus(404);
    // }
  }]);

// reimbursementRouter.post('', async (req, res) => {
//   console.log(`creating reimbursement`, req.body);
//   const ship = await reimbursementDao.save(req.body);
//   res.status(201);
//   res.json(ship);
// });

// reimbursementRouter.patch('', (req, res) => {
//   console.log(`updating reimbursement`, req.body);
//   res.send('updated reimbursement');
// });

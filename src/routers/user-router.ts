import express from 'express';
// import bodyParser from 'body-parser';
import { users } from '../state';
import { User } from '../model/user';
import { authMiddleware } from '../middleware/auth.middleware';
import * as userDao from '../daos/user.dao';
import { toSqlUser } from '../util/sql-user-conveter';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const userRouter = express.Router();


// login base on credentials/ user privilages
userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username} and password ${password}`);
  const user = await userDao.findByUsernameAndPassword(username, password);
  // console.log(user);
  if (user) {
    // attach the user data to the session object
    console.log(`user logged: ${user.username} Role: ${user.role.role}`);
    req.session.user = user;
    res.json(user);
  } else {
    res.sendStatus(401);
    console.log('invalid Credentials.');
  }
});
/**
 * find all users
 * endpoint: /users
 */
userRouter.get('',  [
 authMiddleware(['admin']),
 async (req, res) => {
    const users = await userDao.getAllUsers();
    // console.log('retreiving all users');
    if (users ) {
      res.json(users);
    } else {
      // res.sendStatus(401);
    console.log('Incomplete SQL request');
    }
  }]);

  userRouter.get('/:id',  [
    authMiddleware(['admin']),
    async (req, res) => {
      // convert id string to a number and pass to function.
      const id: number = +req.params.id;
      console.log(id);
       const users = await userDao.findUsersById(id);
       // console.log('retreiving all users');
       if (users ) {
         res.json(users);
       } else {
         // res.sendStatus(401);
       console.log('Incomplete SQL request');
       res.sendStatus(404);
       }
     }]);

userRouter.post('/add', [
  authMiddleware(['admin']),
  async (req, res) => {
    // convert id string to a number and pass to function.
    // get user from body
    const response = req.body;
    console.log(`Adding a new user`);
    console.log(response);
    const sqlUser = toSqlUser(response);
    const user = await userDao.addUser(sqlUser);
    if (user) {
      console.log(`User added:${user.user_name} with user id: ${user.user_id} `);
      res.json(user);
    } else {
      // res.sendStatus(401);
      console.log('Internal Issue. User NO added.');
      res.sendStatus(404);
    }
  }]);

  userRouter.patch('/update/:id', [
    authMiddleware(['admin']),
    async (req, res) => {
      // convert id string to a number and pass to function.
      // get user from body
      const response = req.body;
      const id: number = +req.params.id;
      console.log(`Modifying user: with id: ${id}`);
      console.log(response);
      const sqlUser = toSqlUser(response);
      const user = await userDao.update(sqlUser, id );
      if (user) {
        console.log(`User updated:${user.user_name} with user id#: ${user.user_id} `);
        res.json(user);
      } else {
        // res.sendStatus(401);
        console.log('Internal Issue. User NO added.');
        res.sendStatus(404);
      }
    }]);
userRouter.get('', [
  authMiddleware(['employee']),
   (req, res) => {
     console.log('Employee Reimbursements: ');
     res.json(users);
   }]);

   userRouter.get('', [
    authMiddleware(['manager']),
     (req, res) => {
       console.log('Employee Reimbursements: ');
       res.json(users);
     }]);
/**
 * find user by id
 * endpoint: /users/:id
 */

/* userRouter.get('/:id', (req, res) => {
  const id: number = +req.params.id;
  console.log(`retreiving user with id: ${id}`);
  const user = users.find(u => u.userId === id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
}); */


userRouter.post('', (req, res) => {
  console.log(`creating user`, req.body);
  const user: User = req.body;
  user.userId = Math.floor(Math.random() * 10000000);
  users.push(user);
  res.status(201);
  res.send(user);
});

userRouter.patch('', (req, res) => {
  const { body } = req; // destructuring
  console.log(`updating user`, body);
  const user = users.find((u) => {
    // console.log(`u = `, u);
    return u.userId === body.userId;
  });
  if (!user) {
    res.sendStatus(404);
  } else {
    for (const field in user) {
      if (body[field] !== undefined) {
        user[field] = body[field];
      }
    }
    res.json(user);
  }

});




import { User } from './model/user';
import { Reimbursement } from './model/reimbursement';

export let users: User[] = [
  new User(1, 'blake', 'pass' ),
  new User(2, 'Bradley', 'pass'),
  new User(3, 'Shahram', 'pass'),
  new User(4, 'Pj', 'pass'),
  new User(5, 'Danae', 'pass'),
  new User(6, 'Fred', 'pass'),
];

export let Reimbursements: Reimbursement[] = [
  new Reimbursement(1, 3 , 500, '10/5/2019', '10/06/2019', 'Medical', 2, 2, 3),
  new Reimbursement(2, 4 , 200, '10/7/2019', '10/082019', 'Relocatin', 2, 1, 2),
  new Reimbursement(3, 2 , 800, '10/8/2019', '10/09/2019', 'Training', 2, 3, 1),
];

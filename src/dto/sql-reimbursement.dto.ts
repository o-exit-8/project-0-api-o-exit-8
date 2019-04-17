import { isDate } from "util";

//
export class SqlReimbursement {
  reimbursement_id = 0;
  author = 0;
  amount = 0;
  date_submitted = Date;
  date_resolved = Date;
  description = '';
  resolver = 0;
  status = 0;
  reim_type = 0;

  constructor( reimbursement_id = 0, author= 0, amount= 0,
     date_submitted= undefined, date_resolved= undefined,
     description= '', resolver= 0, status= 0, reim_type= 0) {
    this.reimbursement_id = reimbursement_id;
    this.author = author;
    this.amount = amount;
    this.date_submitted = date_submitted;
    this.date_resolved = date_resolved;
    this.description = description;
    this.resolver = resolver;
    this.status = status;
    this.reim_type = reim_type;
     }
}



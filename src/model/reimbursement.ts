// import { reimbursementRouter } from "../routers/reimbursement-router";

export class Reimbursement {
  reimbursementId: number;
  author: number;
  amount: number;
  dateSubmitted: Date;
  dateResolved: Date;
  description: string;
  resolver: number;
  status: number;
  reimType: number;
//
  constructor(reimbursementId = 0,
    author = 0,
    amount = 0,
    dateSubmitted = undefined,
    dateResolved = undefined,
    description = '',
    resolver = 0,
    status = 0,
    reimType = 0
    ) {
    this.reimbursementId = reimbursementId;
    this.author = author;
    this.amount = amount;
    this.dateSubmitted = dateSubmitted;
    this.dateResolved = dateResolved;
    this.description = description;
    this.resolver = resolver;
    this.status = status;
    this.reimType = reimType;
  }
}
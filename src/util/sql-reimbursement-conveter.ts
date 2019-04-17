import { SqlReimbursement } from '../dto/sql-reimbursement.dto';
import { Reimbursement } from '../model/reimbursement';

export function convertSqlReimb (Reimb: SqlReimbursement) {
  return new Reimbursement (Reimb.reimbursement_id, Reimb.author,
    Reimb.amount, Reimb.date_submitted, Reimb.date_resolved,
    Reimb.description, Reimb.status, Reimb.reim_type);
}
export function tosqlReimb(Reimb: Reimbursement) {
  return new SqlReimbursement(Reimb.reimbursementId, Reimb.author,
  Reimb.amount, Reimb.dateSubmitted, Reimb.dateResolved,
  Reimb.description, Reimb.status, Reimb.reimType);
}

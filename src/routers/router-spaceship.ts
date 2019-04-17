import express from 'express';

// router
 export const reimbRouter = express.Router();

 // gettings

 reimbRouter.get('', (req, res) => {
    console.log('Retrieving all Reimbursement Requeste. ');
 });

 reimbRouter.get('/:id', (req, res) => {
    console.log(`retrieving Ship by ID ${req.params.id}`);
    res.send(`Here is the ship with ID ${req.params.id}`);
 });

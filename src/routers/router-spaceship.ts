import express from 'express';

//router 
 export const shipRouter = express.Router();

 //gettings

 shipRouter.get('', (req, res) =>{
    console.log("Retrieving all spaceShips");
 })

 shipRouter.get('/:id', (req,res) => {
    console.log(`retrieving Ship by ID ${req.params.id}`);
    res.send(`Here is the ship with ID ${req.params.id}`);
 })

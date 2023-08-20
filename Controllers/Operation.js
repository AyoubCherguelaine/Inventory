const {TypeOperation,Operation,LineOperation} = require('../Models/OperationModel');


class TypeOperationController{

    async createTypeOperation(req,res){
        try{
            const newTypeOperation = req.body;
            await TypeOperation.create(newTypeOperation,(err,result)=>{
                if(err) res.status(500).json(err)
                else{
                    res.status(201).json(result);
                }
            })
        }catch(error){
            res.status(500).json({ error: 'An error occurred while creating the Actor' });
        }
    }

    async getTypeOperation(req,res){
        try{

        }catch(error){
            res.status(500).json({ error: 'An error occurred while creating the Actor' });
        }
    }

    async getAllTypeOperation(req,res){
        try{

        }catch(error){
            res.status(500).json({ error: 'An error occurred while creating the Actor' });
        }
    }


}

class OperationController{

    async createOperation(req,res){
        try{

        }catch(error){
            res.status(500).json({ error: 'An error occurred while creating the Actor' });
        }
    }

    async getOperation(req,res){
        try{

        }catch(error){
            res.status(500).json({ error: 'An error occurred while creating the Actor' });
        }
    }

    async getAllOperation(req,res){
        try{

        }catch(error){
            res.status(500).json({ error: 'An error occurred while creating the Actor' });
        }
    }


}


class LineOperationController{

    async createLineOperation(req,res){
        try{

        }catch(error){
            res.status(500).json({ error: 'An error occurred while creating the Actor' });
        }
    }

    async getLineOperation(req,res){
        try{

        }catch(error){
            res.status(500).json({ error: 'An error occurred while creating the Actor' });
        }
    }

    async getAllLineOperation(req,res){
        try{

        }catch(error){
            res.status(500).json({ error: 'An error occurred while creating the Actor' });
        }
    }


}

const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;


// db connection
const URL='mongodb://localhost:27017';

const DB ='contacts';

// const users=[];
// middleware

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}))

// get method

app.get('/users', async function(req,res){
try {
    const connection = await mongoClient.connect(URL);
    const db=connection.db(DB);
   const user =  await db.collection('contactuser').find().toArray();
    await connection.close();
    res.json(user);

} catch (error) {
    console.log(error);
    res.json({message:"get error"})
}
});
// post method

app.post('/createuser', async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db=connection.db(DB);
        const user = await db.collection('contactuser').insertOne(req.body);
        await connection.close();
        res.json(user);
    
    } catch (error) {
        console.log(error);
        res.json({message:"create getting error"})
    }
    });

    // put method

    app.put('/user/:id', async function(req,res){
        try {
            const connection = await mongoClient.connect(URL);
            const db=connection.db(DB);
            const user = await db.collection('contactuser').findOneAndUpdate({_id:new mongodb.ObjectId(req.params.id)},{$set:req.body});
            await connection.close();
            res.json(user);
        
        } catch (error) {
            console.log(error);
            res.json({message:"can't update"})
        }
        });


        // delete

        app.delete('/user/:id', async function(req,res){
            try {
                const connection = await mongoClient.connect(URL);
                const db=connection.db(DB);
                const user = await db.collection('contactuser').findOneAndDelete({_id:new mongodb.ObjectId(req.params.id)});
                await connection.close();
                res.json(user);
            
            } catch (error) {
                console.log(error);
                res.json({message:"can't delete the user"})
            }
            });

// get by id

app.get('/user/:id', async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db=connection.db(DB);
        const user = await db.collection('contactuser').findOne({_id:new mongodb.ObjectId(req.params.id)});
        await connection.close();
        res.json(user);
    
    } catch (error) {
        console.log(error);
        res.json({message:"can't get by id"})
    }
    });

// console.log(process);

app.get('/home',(req,res)=>{
    res.json({message:"working"})
})

app.listen(process.env.PORT || 3000);
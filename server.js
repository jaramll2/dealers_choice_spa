const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_spa_db');


const Color = sequelize.define('color',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

//express
const express = require('express');
const app = express();
const path = require('path');

app.use('/src',express.static(path.join(__dirname,'src')));

app.get('/', (req,res,next)=> res.sendFile(path.join(__dirname,'index.html')));

app.get('/colors',async(req,res,next)=>{
    try{
        const colors = await Color.findAll();
        res.send(colors);
    }
    catch(err){
        next(err);
    }
});

app.delete('/colors/:id',async(req,res,next)=>{
    try{
        const color = await Color.findByPk(req.params.id);
        await color.destroy();
        res.sendStatus(204);
    }
    catch(err){
        next(err);
    }
});

const setUp = async()=>{
    try{
        await sequelize.sync({force:true});
        console.log('starting');

        //seed data
        await Color.create({name: "black"});
        await Color.create({name: "red"});
        await Color.create({name: "pink"});
        await Color.create({name: "mustard yellow"});
        await Color.create({name: "emerald green"});

        const port = process.env.PORT || 3000;

        app.listen(port,()=>console.log(`listening on port ${port}`));
        
    }
    catch(err){
        console.log(err);
    }
};

setUp();
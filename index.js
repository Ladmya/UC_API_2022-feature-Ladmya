const express = require('express');
const cors = require('cors');
const app = express();
const port = 2001;
const { ChefsManager } = require('./managers/ChefsManager');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Adds chef
app.post('/chefs', async function(req, res) {
    const { firstname, lastname, description, image } = req.body;
    const chefsManager = new ChefsManager({ firstname, lastname, description, image });
    try {
        const json = await chefsManager.save();
        res.send(json);
    } catch (e) {
        console.error('Chef insertion error :');
        console.error(e);
    }
});

// Gets all chefs
app.get('/chefs', async function(req, res) {
    const chefsManager = new ChefsManager();
    try {  
        // Tests ascending sort chefs by firstnames  
        const testAscendFirstnamesChefs = await chefsManager.getAscendingChefsByFirstnames()
        console.log(testAscendFirstnamesChefs);
        // Tests ascending sort chefs by lastnames
        const testAscendLastnamesChefs = await chefsManager.getAscendingChefsByLastnames()
        console.log(testAscendLastnamesChefs);

        const json = await chefsManager.getChefs()
        res.status(200).json(json);
    } catch (e) {
        console.error('Error server');
        console.error(e);
    }
});

//Gets a chef by id
app.get('/chefs/:id', async function(req,res){
    const chefsManager = new ChefsManager();
        try {
            const json = await chefsManager.getChefById(req.params.id);
            res.send(json);
        } catch(e) {
            console.error('Cannot get chef by Id : error server',e);
        }
    });

// Delete a chef
app.delete('/chefs/:id',async function(req,res){
    const chefsManager = new ChefsManager();
    try {
        const json = await chefsManager.deleteChefById(req.params.id);
        if(!json) {
            return res.status(404).send(); 
        }
        res.send(json);
    } catch(e) {
        console.error('Cannot delete chef : Error server');
        console.error(e);
    } 
});

// Updates a profile : Patch rather than Put
app.patch('/chefs/:id', async (req, res) => {
    const chefsManager = new ChefsManager();
    try{
        const json = await chefsManager.updateChefById(req.params.id, req.body, { new: true });       
        return res.status(201).json({json});
        } catch (e) {
        console.log('Cannot update profile PATCH : server error',e);
    }
});


// Je pensais pouvoir tester sur Postman les "sort" via des routes en les créant 
// mais ça ne fonctionne pas

// Ascending chefs order ???

// app.get('/chefs/lastname', async function(req, res) {
//     const chefsManager = new ChefsManager();
//     try {
//         const json = await chefsManager.getAscendingChefsByLastname()
//         res.status(200).json(json);
//     } catch (e) {
//         console.error('Error server');
//         console.error(e);
//     }
// });


// app.put('/chefs/:id', async (req, res) => {
//     const chefsManager = new ChefsManager();
//     try{
//         // const json = await chefsManager.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         const json = await chefsManager.updateChefById(req.params.id, req.body, { new: true });       
//         return res.status(201).json({json});
//         } catch (e) {
//         console.log('Cannot update profile PUT: server error',e);
//     }
// });

app.listen(port, () => {
    console.log(`LBA_usecase listening on port ${port}`)
})


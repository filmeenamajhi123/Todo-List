// const express = require('express');
// const router = express.Router();
// const Model = require('../Model/model');

// module.exports = router;

// router.post('/post', async(req, res) => {
//     const data = Model({
//         name : req.body.name,
//         email: req.body.email,
//         age : req.body.age
//     })

//     try {
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave);
//     }
//     catch (error) {
//         res.status(400).json({message : error.message})
//     }
// })

// router.get('/getAll', async(req, res) => {
//     try {
//         const data = await Model.find();
//         res.json(data);
//     }

//     catch (error) {
//         res.status(500).json({message : error.message})
//     }
// })

// router.get('/getOne/:id', async(req, res) => {
//     try {
//         const data = await Model.findById(req.params.id);
//         res.json(data);
//     }
//     catch (error) {
//         res.status(500).json({message : error.message})
//     }
// })

// router.patch('/update/:id', async(req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new : true };

//         const result = await Model.findByIdAndUpdate(id, updatedData, options);
//         res.send(result);
//     }

//     catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

// router.delete('/delete/:id', async(req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Model.findByIdAndDelete(id);
//         res.send(`Document with ${data.name} has been deleted`);
//     }
//     catch (error) {
//         res.status(400).json({message: error.message});
//     }
// })



const express = require('express');
const router = express.Router();
const Model = require('../Model/model');

module.exports = router;

// ✅ Add Todo
router.post('/post', async(req, res) => {
    const data = Model({
        // name : req.body.name,
        // email: req.body.email,
        // age : req.body.age

        todoText : req.body.todoText
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message : error.message });
    }
});

router.get('/getAll', async(req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
});

router.get('/getOne/:id', async(req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
});

router.patch('/update/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new : true };

        const result = await Model.findByIdAndUpdate(id, updatedData, options);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message : error.message });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.status(200).send(`Document with name ${data.name} has been deleted`);
    } catch (error) {
        res.status(400).json({ message : error.message });
    }
});

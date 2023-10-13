const express = require('express');
const router=express.Router();
const Notes=require('../models/Notes');
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");

router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        // console.log(req);
        const notes=await Notes.find({user:req.user.id});
        res.status(200).json(notes);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Some issue occured!" });
    }
})

//Create note using POST: api/notes/addnote
router.post('/addnote',fetchuser, [
body('title','Title should be atleast 3 characters long').isLength({min:3}),
body('description','Description should be atleast 3=5 characters long').isLength({min:5})
],async(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            const {title, description, tag}=req.body;
            const note=await new Notes({
                user:req.user.id,
                title,
                description,
                tag
            })
            await note.save();
            return res.status(200).json(note);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: "Some issue occured!" });
        }
    }
    return res.status(400).json({error: result.array()});    
})

//Updating an existing note using PUT:api/note/updatenote/:id
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        const {title,description, tag}=req.body;
        let newNote={};
        if(title)
            newNote.title=title;
        if(description)
            newNote.description=description;
        if(tag)
            newNote.tag=tag;
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).json({error:"Not found!"})
        }
        if(req.user.id!==note.user.toString()){
            return res.status(401).json({error:"Access denied! You can only update note created by you."})
        }
        note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote}, {new: true});
        res.status(200).json(note);
    
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Some issue occured!" });
    }

})

//Deleting note using DELETE: api/notes/delete/:id
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).json({error:"Not found!"})
        }
        if(req.user.id!==note.user.toString()){
            return res.status(401).json({error:"Access denied! You can only update note created by you."})
        }
        note=await Notes.findByIdAndDelete(req.params.id);
        return res.status(202).send("The note has been deleted successfully!")
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Some issue occured!" });
    }
})
module.exports=router;
const Story=require("../models/story");
const asyncHandler =require("express-async-handler");

const createStory =asyncHandler(async(req,res)=> {
   
        const{title,content}=req.body;
        if(!title || !content){
            return res.status(400).json({
                message:"title,content and author are required"
            });
        }
        const story=await Story.create({
            title,
            content,
            author:req.user.userId,
        });
        return res.status(201).json({
            message:"story created successfully",
            story,

        });
});
const getStories = asyncHandler(async(req,res)=>{
        const stories=await Story.find().populate("author","name email");
        return res.status(200).json(stories);
    });
    
    const updateStory = asyncHandler(async(req,res)=> {
        console.log("updateStory called");
        console.log(req.params.id);
        console.log(req.body);

        const story = await Story.findById( req.params.id);
        if (!story) {
            return res.status(404).json({
                message: "Story not found"
            });
        }
        if (story.author.toString()!==req.user.userId){
            return res.status(403).json({
                message:"not authorized"
            });
        }
        story.title=req.body.title||story.title;
        story.content=req.body.content||story.content;
        await story.save();
        return res.status(200).json({
            message: "Story updated successfully",
            story
        });
    });
const getStoryById=asyncHandler(async(req,res)=>{
    
        const story=await Story.findById(req.params.id);
        if(!story){
            return res.status(404).json({
                message:"story not found"
            });
        }
        return res.status(200).json(story);
    });

const deleteStory=asyncHandler(async(req,res)=>{
   
        const story=await Story.findById(req.params.id);
        if(!story){
            return res.status(404).json({
                message:"story not found"
            });
        }
        if (story.author.toString()!==req.user.userId){
            return res.status(403).json({
                message:"not authorized"
            });
        }
        await story.deleteOne();
        return res.status(200).json({
           message:"story deleted successfully"});
});
const getMyStories = asyncHandler(async (req, res) => {

    const stories = await Story.find({
        author: req.user.userId
    });

    res.status(200).json(stories);

});
    module.exports={createStory,getStories,updateStory,getStoryById,deleteStory,getMyStories};


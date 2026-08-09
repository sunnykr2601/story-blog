const Story=require("../models/story");
const asyncHandler =require("express-async-handler");

const createStory =asyncHandler(async(req,res)=> {
   
        const{title,content,author}=req.body;
        if(!title || !content||!author){
            return res.status(400).json({
                message:"title,content and author are required"
            });
        }
        const story=await Story.create(req.body);
        return res.status(201).json({
            message:"story created successfully",
            story,

        });
});
const getStories = asyncHandler(async(req,res)=>{
        const stories=await Story.find();
        return res.status(200).json(stories);
    });
    
    const updateStory = asyncHandler(async(req,res)=> {
        console.log("updateStory called");
        console.log(req.params.id);
        console.log(req.body);

        const story = await Story.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!story) {
            return res.status(404).json({
                message: "Story not found"
            });
        }
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
   
        const story=await Story.findByIdAndDelete(req.params.id);
        if(!story){
            return res.status(404).json({
                message:"story not found"
            });
        }
        return res.status(200).json({
           message:"story deleted successfully"});
});
    module.exports={createStory,getStories,updateStory,getStoryById,deleteStory};


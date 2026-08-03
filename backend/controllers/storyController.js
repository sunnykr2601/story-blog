const Story=require("../models/story");
const createStory =async(req,res) => {
    try{
        const story=await Story.create(req.body);
        res.status(201).json({
            messege:"story created successfully",
            story,

        });
    
    }catch(error){
        res.status(500).json({
            messege:"error creating story",
        });
      }
    };
const getStories = async(req,res)=>{
    try{
        const stories=await Story.find();
        res.status(200).json(stories);
    }catch(err){
        res.status(500).json({
            messege:"error fetching stories",
        });
      }
    };
    const updateStory = async (req, res) => {
    try {
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

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
};

const getStoryById=async(req,res)=>{
    try{
        const story=await Story.findById(req.params.id);
        if(!story){
            return res.status(404).json({
                message:"story not found"
            });
        }
        return res.status(200).json(story);
    }catch(err) {
        return res.status(500).json({
            message:err.message
        });

    }
};
const deleteStory=async(req,res)=>{
    try{
        const story=await Story.findByIdAndDelete(req.params.id);
        if(!story){
            return res.status(404).json({
                message:"story not found"
            });
        }
        return res.status(200).json({
           message:"story deleted successfully"});
    }catch(err) {
        return res.status(500).json({
            message:err.message
        });

    }
};
    module.exports={createStory,getStories,updateStory,getStoryById,deleteStory};


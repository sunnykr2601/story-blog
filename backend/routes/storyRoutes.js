const express = require("express");
const router =express.Router();
const{getStories,createStory,updateStory,getStoryById,deleteStory}=require("../controllers/storyController");
router.post("/stories",createStory);
router.get("/stories",getStories);
router.put("/stories/:id",updateStory);
router.get("/stories/:id",getStoryById);
router.delete("/stories/:id",deleteStory);

module.exports=router;
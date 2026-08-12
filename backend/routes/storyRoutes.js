const express = require("express");
const router =express.Router();
const{getStories,createStory,updateStory,getStoryById,deleteStory}=require("../controllers/storyController");
const authMiddleware =require("../middleware/authMiddleware");
router.post("/stories",authMiddleware,createStory);
router.get("/stories",getStories);
router.put("/stories/:id",authMiddleware,updateStory);
router.get("/stories/:id",getStoryById);
router.delete("/stories/:id",authMiddleware,deleteStory);

module.exports=router;
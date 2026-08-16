const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const getMe = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.userId)
        .select("-password");

    res.status(200).json(user);
});

module.exports = { getMe };
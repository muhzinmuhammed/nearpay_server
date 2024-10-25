import userModel from "../models/userModel.js";

//userScore update

const userScoreUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { score } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { score: score },
            { new: true }
        );

        if (updatedUser) {
            return res.status(200).json({ message: "User score updated successfully", data: updatedUser });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

const allUserScore = async (req, res) => {
    const { page = 1, limit = 10, search = "", status } = req.query;



    try {
        const query = {
            isDelete: false,
            $or: [
                { name: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ]
        };



        const totalPosts = await postModel.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / limit);
        const posts = await postModel.find(query)
            .populate({ path: 'userId', select: '-password' })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            data: posts,
            currentPage: page,
            totalPages: totalPages,
            totalPosts: totalPosts,
            message: "Posts fetched successfully",
            error: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });
    }
}

export { allUserScore, userScoreUpdate }
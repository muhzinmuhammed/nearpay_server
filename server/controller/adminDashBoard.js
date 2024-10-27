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
    const { page = 1, limit = 10, search = "" } = req.query;

    try {
        const query = {
          
            $or: [
                { name: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ]
        };

        // Total number of posts matching the query
        const totalPosts = await userModel.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / limit);
        const posts = await userModel.find(query).sort({score:-1})
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))

        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            totalPages: totalPages,
            totalPosts: totalPosts,
            message: "Posts fetched successfully",
            error: false
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });
    }
};

export { allUserScore, userScoreUpdate }
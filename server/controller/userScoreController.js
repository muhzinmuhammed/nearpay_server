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
         return   res.status(200).json({ message: "User score updated successfully", user: updatedUser });
        } else {
            return  res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

const userScore = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch all users and sort by score in descending order
        const allUsers = await userModel.find().sort({ score: -1 });

        // Find the user's position in the sorted array
        const userIndex = allUsers.findIndex(user => user._id.toString() === id);

        if (userIndex !== -1) {
            const userScore = allUsers[userIndex];
            const position = userIndex + 1; // Position is index + 1
            
            return res.status(200).json({ 
                message: `User score and position found`, 
                data: { 
                    score: userScore.score, 
                    position 
                } 
            });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
        
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


export {userScore,userScoreUpdate}
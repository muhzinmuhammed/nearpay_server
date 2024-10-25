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

const userScore=async(req,res)=>{
    try {
        const {id}=req.params
        const userScore=await userModel.findById(id)
        if (userScore) {

            return   res.status(200).json({ message: "User score updated successfully", data: userScore });
        }
        else {
            return  res.status(404).json({ message: "User not found" });
        }
        
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

export {userScore,userScoreUpdate}
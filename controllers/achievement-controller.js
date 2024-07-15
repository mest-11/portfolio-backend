import { achievementModel } from "../models/achievement-models.js";
import { achievementSchema } from "../schema/achievement.js";

export const getAchievement = async (req, res) => {

    try {
        const userSessionId = req.session.id
        const allAchievement = await achievementModel.find({ user: userSessionId });

        if (allAchievement.length == 0) {
            return res.status(400).send('No Achievement Added')
        }

        res.status(201).send({ Achievement: allAchievement })
    } catch (error) {
        res.status(500).json({error})
    }
}



    export const postAchievement = async (req, res) => {
      
  try {
              const { error, value } = achievementSchema.validate({
                ...req.body,
                award: req.files.award[0].filename,
                image: req.file.image[0].filename
              } );
              if (error) {
                  return res.status(400).send(error.details[0].message)
              }
              
              const achievement = await achievementModel.create(value)
              res.status(201).send(achievement)
          
  } catch (error) {
    console.log(error)
  }

    }


    export const patchAchievement = async (req, res) => {
        try {
            const updateAchievement = await achievementModel.findByIdAndUpdate(req.params.id)
            res.status(200).json(updateAchievement)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    
    
    export const patchOneAchievement = async (req, res) => {
        try {
            const updateOneAchievement = await achievementModel.findOneAndUpdate(req.params.id)
            res.status(200).json(updateOneAchievement)
        } catch (error) {
            return res.status(500).send(error)
    
            
        }
    }
    
    export const deleteAchievement = async (req, res) => {
        try {
            const deleteAchievement = await achievementModel.findByIdAndDelete(req.params.id)
            res.status(200).json(deleteAchievement)
        } catch (error) {
            return res.status(500).send(error)
        }
    }

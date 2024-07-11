import { achievements } from "../models/achievement-models.js";

export const getAchievement = async (req, res) => {

    try {
        const allAchievement = await achievement.find()

        if (achievements.length == 0) {
            return res.status(400).send('No Achievement Added')
        }
        // console.log('value', value)

        res.status(201).json({ achievement: allAchievement })
    } catch (error) {
    }
}



    export const postAchievement = async (req, res) => {
      
  try {
              const { error, value } = achievements.validate(req.body)
              if (error) {
                  return res.status(400).send(error.details[0].message)
              }
              console.log('value', value)
  
              const achievement = await achievement.create(value)
              res.status(201).send(education)
          
  } catch (error) {
    console.log(error)
  }

    }

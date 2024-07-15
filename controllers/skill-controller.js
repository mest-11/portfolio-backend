import { skillsModel } from "../models/skills-model.js";
import { skills } from "../schema/skill.js";


export const addSkills = async(req, res) => {
    try {
        const {error, value} = skillsModel.validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
        console.log('value', value)
    
        const skill = await skillsModel.create(value)
        res.status(200).json(skill)
    
    } catch (error) {
        return res.status(500).send(error)
        
    }
}

export const getAllSkill = async (req, res) => {

    try {
        const allSkill = await skillsModel.find()
    if(addSkills.length == 0){
        return res.status(404).send('No skills added')
    }
    res.status(200).json({skills:allSkill})
    } catch (error) {
        return res.status(500).send(error)

    }

}

export const getOneSkills = async (req, res, next) => {
try {
    
        const skill = await skillsModel.findById(req.params.id)
        res.status(200).json(skill)
    
} catch (error) {
    return res.status(500).send(error)
}
}

export const patchSkill = async (req, res) => {
    try {
        const updateSkill = await skillsModel.findByIdAndUpdate(req.params.id)
        res.status(200).json(updateSkill)
    } catch (error) {
        return res.status(500).send(error)
    }
}


export const patchOneSkills = async (req, res) => {
    try {
        const updateOneSkill = await skillsModel.findOneAndUpdate(req.params.id)
        res.status(200).json(updateOneSkill)
    } catch (error) {
        return res.status(500).send(error)

        
    }
}

export const deleteSkill = async (req, res) => {
    try {
        const deleteSkill = await skillsModel.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteSkill)
    } catch (error) {
        return res.status(500).send(error)
    }
}




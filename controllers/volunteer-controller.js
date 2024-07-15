import { volunteeringModel } from "../models/volunteeringModel.js";
import { volunteering } from "../Schema/volunteer.js";

export const addVolunteer = async(req, res) => {
    try {
        const {error, value} = volunteeringModel.validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
        console.log('value', value)
    
        const volunteering = await volunteeringModel.create(value)
        res.status(200).json(volunteering)
    
    } catch (error) {
        return res.status(500).send(error)
        
    }
}

export const getAllVolunteer = async (req, res) => {

    try {
        const allVolunteer = await experienceModel.find()
    if(allVolunteer.length == 0){
        return res.status(404).send('No Volunteer added')
    }
    res.status(200).json({education:allVolunteer})
    } catch (error) {
        return res.status(500).send(error)

    }

}

export const getOneVolunteering = async (req, res, next) => {
try {
    
        const Volunteer = await volunteeringModel.findById(req.params.id)
        res.status(200).json(Volunteer)
    
} catch (error) {
    return res.status(500).send(error)
}
}

export const patchOneVolunteer = async (req, res) => {
    try {
        const updateOneVolunteer = await volunteeringModel.findByIdAndUpdate(req.params.id)
        res.status(200).json(updateOneVolunteer)
    } catch (error) {
        return res.status(500).send(error)
    }
}




export const deleteVolunteer = async (req, res) => {
    try {
        const eraseVolunteer = await volunteeringModel.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteExperience)
    } catch (error) {
        return res.status(500).send(error)
    }
}




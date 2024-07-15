import { educationModel } from "../models/educationModels.js";
import { educationSchema } from "../Schema/education.js";



export const addEducation = async (req, res) => {

   try {
    const {error, value} = educationSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    console.log('value', value)

    const education = await educationModel.create(value)
    // res.status(201).json({education})

   } catch (error) {
    return res.status(500).send(error)
   }



}



export const getAllEducation = async (req, res) => {

    try {
        const alleducation = await educationModel.find()
    if(alleducation.length == 0){
        return res.status(404).send('No education added')
    }
    res.status(200).json({education:alleducation})
    } catch (error) {
        return res.status(500).send(error)

    }

}

export const getOneEducation = async (req, res, next) => {
try {
    
        const education = await educationModel.findById(req.params.id)
        res.status(200).json(education)
    
} catch (error) {
    return res.status(500).send(error)
}
}


export const patchOneEducation = async (req, res) => {
    try {
        const updateOneEducation = await educationModel.findOneAndUpdate(req.params.id)
        res.status(200).json(updateOneexperience)
    } catch (error) {
        return res.status(500).send(error)

        
    }
}

export const deleteEducation = async (req, res) => {
    try {
        const eraseEducation = await educationModel.findByIdAndDelete(req.params.id)
        res.status(200).json(eraseEducation)
    } catch (error) {
        return res.status(500).send(error)
    }
}







import express from 'express'
import { applyForJob, getUserData, updateUserResume } from '../controllers/userController.js'
import { getCompanyJobApplicants } from '../controllers/companyController.js'
import upload from '../config/multer.js'


const router = express.Router()

// Get User Data
router.get('/user',getUserData)

//Apply for a job
router.post('/apply',applyForJob)

//Get Applied job data
router.get('/application',getCompanyJobApplicants)

//Update user profile (resume)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router
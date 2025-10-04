import express from 'express'
import { ChangeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'

const router = express.Router()

//Register a Company
router.post('/register', upload.single('image'), registerCompany)

//Company login
router.post('/login',loginCompany)

//Get Company Data
router.get('/company',protectCompany,getCompanyData)

//Post a job
router.post('/post-job',protectCompany, postJob)

//Get Applicants Data of Company
router.get('/applicants',protectCompany,getCompanyJobApplicants)

//Get company joblist
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//change application status
router.post('/change-status',protectCompany,ChangeJobApplicationStatus)

//change Applications Visibily
router.post('/change-visibility',protectCompany,changeVisibility)

export default router
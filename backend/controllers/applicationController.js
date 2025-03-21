const Application = require("../models/Application");
const Student = require("../models/Student");
const cloudinary = require("../helper/cloudinaryConfig");

const addApplication = async (req) => {
  try {
    const user = await Student.findById(req.id);
    if (!user) {
      const error = new Error("Student not found");
      error.status = 401;
      throw error;
    }

    if (user.email !== req.body.email) {
      const error = new Error("Email does not match with student email");
      error.status = 400;
      throw error;
    }

    const existingApplication = await Application.findOne({
      email: req.body.email,
      company: req.params.oid,
    });
    if (existingApplication) {
      const error = new Error("Application already exists");
      error.status = 400;
      throw error;
    }

    let applicationData = { company: req.params.oid, ...req.body };

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      applicationData.resume = upload.secure_url.replace(".pdf", ".jpg");
    }

    const application = new Application(applicationData);
    await application.save();
    return { message: "Success", data: application };
  } catch (error) {
    console.error("Error fetching applications by company:", error);
    throw error;
  }
};

const getApplicationsByCompany = async (companyId) => {
  try {
    return await Application.find({ company: companyId });
  } catch (error) {
    console.error("Error fetching applications by company:", error);
    throw error;
  }
};

const getApplicationsByStudent = async (req) => {
  try {
    const student = await Student.findById(req.id);
    if (!student) {
      const error = new Error("Student not found");
      error.status = 401;
      throw error;
    }
    return await Application.find({ email: student.email });
  } catch (error) {
    console.error("Error fetching applications by student:", error);
    throw error;
  }
};

const getAllApplications = async () => {
  try {
    return await Application.find();
  } catch (error) {
    console.error("Error fetching all applications:", error);
    throw error;
  }
};

module.exports = {
  addApplication,
  getApplicationsByCompany,
  getApplicationsByStudent,
  getAllApplications,
};

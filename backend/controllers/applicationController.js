const Application = require("../models/Application");
const Student = require("../models/Student");
const cloudinary = require("../helper/cloudinaryConfig");

const addApplication = async (req) => {
  try {
    const user = await Student.findById(req.id);
    if (!user) throw { status: 401, message: "Invalid email" };

    if (user.email !== req.body.email)
      throw { status: 400, message: "Email not matched" };

    const existingApplication = await Application.findOne({
      email: req.body.email,
      company: req.params.oid,
    });
    if (existingApplication)
      throw { status: 400, message: "Application already exists" };

    let applicationData = { company: req.params.oid, ...req.body };

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      applicationData.resume = upload.secure_url.replace(".pdf", ".jpg");
    }

    const application = new Application(applicationData);
    await application.save();
    return { message: "Success", data: application };
  } catch (error) {
    throw error;
  }
};

const getApplicationsByCompany = async (companyId) => {
  try {
    return await Application.find({ company: companyId });
  } catch (error) {
    throw error;
  }
};

const getApplicationsByStudent = async (req) => {
  try {
    const student = await Student.findById(req.id);
    if (!student) throw { status: 401, message: "Student not found" };
    return await Application.find({ email: student.email });
  } catch (error) {
    throw error;
  }
};

const getAllApplications = async () => {
  try {
    return await Application.find();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addApplication,
  getApplicationsByCompany,
  getApplicationsByStudent,
  getAllApplications,
};

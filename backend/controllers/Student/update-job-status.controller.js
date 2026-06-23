const User = require("../../models/user.model");
const JobSchema = require("../../models/job.model");
const sendMail = require("../../config/Nodemailer");

const UpdateJobStatus = async (req, res) => {
  try {
    const job = await JobSchema.findById(req.params.jobId).populate('company');
    const student = await User.findById(req.params.studentId);

    if (!job || !student) {
      return res.status(404).json({ msg: "Student or Job Not Found!" });
    }

    let updatedStatus = null;

    job.applicants.find(app => {
      if (app.studentId == req.params.studentId) {
        if (req.body.applicant.currentRound) app.currentRound = req.body.applicant.currentRound;
        if (req.body.applicant.roundStatus) app.roundStatus = req.body.applicant.roundStatus;
        if (req.body.applicant.selectionDate) app.selectionDate = req.body.applicant.selectionDate;
        if (req.body.applicant.joiningDate) app.joiningDate = req.body.applicant.joiningDate;
        if (req.body.applicant.offerLetter) app.offerLetter = req.body.applicant.offerLetter;
        if (req.body.applicant.status) {
          app.status = req.body.applicant.status;
          updatedStatus = req.body.applicant.status;
        }
      }
    });

    student?.studentProfile?.appliedJobs?.find(app => {
      if (app.jobId == req.params.jobId) {
        if (req.body.applicant.status) app.status = req.body.applicant.status;
        if (req.body.applicant.package) app.package = req.body.applicant.package;
      }
    });

    await Promise.all([student.save(), job.save()]);
    
    // Dispatch automated SMTP Notification
    if (updatedStatus && student.email) {
      const companyName = job.company?.companyName || "the company";
      const subject = `Update on your application: ${job.jobTitle} at ${companyName}`;
      const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Application Status Update</h2>
          <p>Hello <strong>${student.first_name || 'Student'}</strong>,</p>
          <p>Your application status for the position of <strong>${job.jobTitle}</strong> at <strong>${companyName}</strong> has been updated to:</p>
          <h3 style="color: #004080; text-transform: uppercase;">${updatedStatus}</h3>
          <p>Please log in to your CPMS dashboard to view further details regarding interview rounds or offer letters.</p>
          <br>
          <p>Best regards,<br>The Placement Cell</p>
        </div>
      `;
      // Run async without blocking response
      sendMail(student.email, subject, html).catch(err => console.error("SMTP Error: ", err));
    }
    
    return res.json({ msg: "Job Status Updated Successfully!" });
  } catch (error) {
    console.log("update-job-status.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}


module.exports = {
  UpdateJobStatus
};
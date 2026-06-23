require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Job = require('./models/job.model');
const Notice = require('./models/notice.model');

const seedAdditionalData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for data seeding...");

    // Find the TPO and Management users we seeded earlier
    const tpo = await User.findOne({ email: "tpo@college.edu" });
    const management = await User.findOne({ email: "management@college.edu" });

    if (!tpo || !management) {
      console.log("Please run seed.js first to create the base users.");
      process.exit(1);
    }

    // Insert Dummy Companies
    const Company = require('./models/company.model');
    const companies = [
      { companyName: "Google India", companyDescription: "Tech Giant", companyWebsite: "google.com", companyLocation: "Bangalore", companyDifficulty: "Hard" },
      { companyName: "Amazon", companyDescription: "E-commerce Giant", companyWebsite: "amazon.com", companyLocation: "Hyderabad", companyDifficulty: "Hard" },
      { companyName: "Microsoft", companyDescription: "Tech Giant", companyWebsite: "microsoft.com", companyLocation: "Remote", companyDifficulty: "Hard" }
    ];

    await Company.deleteMany({ companyName: { $in: ["Google India", "Amazon", "Microsoft"] } });
    const insertedCompanies = await Company.insertMany(companies);

    // Insert Dummy Jobs using Company ObjectIds
    const jobs = [
      {
        jobTitle: "Software Engineer I",
        jobDescription: "Looking for fresh graduates with strong DSA and systems design skills.",
        eligibility: "BTech CS/IT with 8+ CGPA",
        salary: 3200000,
        howToApply: "Apply on the company website.",
        company: insertedCompanies[0]._id,
        applicationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        jobTitle: "Data Analyst",
        jobDescription: "Analyze large datasets to improve supply chain efficiency.",
        eligibility: "Proficiency in SQL, Python, and Tableau.",
        salary: 1800000,
        howToApply: "Apply via placement cell.",
        company: insertedCompanies[1]._id,
        applicationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      },
      {
        jobTitle: "Summer Intern",
        jobDescription: "2-month summer internship for pre-final year students.",
        eligibility: "Strong coding skills in C++ or Java.",
        salary: 125000,
        howToApply: "Apply online.",
        company: insertedCompanies[2]._id,
        applicationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      }
    ];

    await Job.deleteMany({ company: { $in: insertedCompanies.map(c => c._id) } });
    await Job.insertMany(jobs);
    console.log("Created 3 mock Companies and Job Listings.");

    // Insert Dummy Notices
    const notices = [
      {
        title: "Upcoming Google Placement Drive",
        message: "<p>Google is visiting the campus next week. Please ensure your profiles are fully updated.</p>",
        sender: tpo._id,
        sender_role: "tpo_admin",
        receiver_role: "student"
      },
      {
        title: "Important: Resume Verification Process",
        message: "<p>All students must submit their physical resumes to the TPO office for verification before applying to Tier-1 companies.</p>",
        sender: management._id,
        sender_role: "management_admin",
        receiver_role: "student"
      },
      {
        title: "Placement Statistics Update",
        message: "<p>We have successfully placed 85% of the CS batch this year. Let's push for 100%!</p>",
        sender: management._id,
        sender_role: "management_admin",
        receiver_role: "tpo_admin"
      }
    ];

    await Notice.deleteMany({ title: { $in: notices.map(n => n.title) } });
    await Notice.insertMany(notices);
    console.log("Created 3 mock Notices.");

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedAdditionalData();

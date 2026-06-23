require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const passwordHash = await bcrypt.hash('Pass@1234', 10);

    const usersToSeed = [
      {
        first_name: "TPO",
        last_name: "Coordinator",
        email: "tpo@college.edu",
        password: passwordHash,
        role: "tpo_admin",
        tpoProfile: { position: "Head Coordinator" }
      },
      {
        first_name: "Institute",
        last_name: "Management",
        email: "management@college.edu",
        password: passwordHash,
        role: "management_admin",
        managementProfile: { position: "Director" }
      },
      {
        first_name: "Super",
        last_name: "Admin",
        email: "admin@college.edu",
        password: passwordHash,
        role: "superuser"
      }
    ];

    for (const userData of usersToSeed) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        await User.create(userData);
        console.log(`Created user: ${userData.email} (${userData.role})`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedUsers();

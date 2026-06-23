import React from 'react';
import Student from '../../assets/student.jpg';
import TPO from '../../assets/tpo.jpg';
import Management from '../../assets/management.jpg';
import Admin from '../../assets/admin.jpg';

function LandAbout() {
  const roles = [
    {
      title: "Student Portal",
      image: Student,
      description:
        "Students can register, explore job opportunities, apply for jobs, and track application status with a personalized dashboard.",
    },
    {
      title: "Placement Cell Coordinator",
      image: TPO,
      description:
        "Placement Cell Coordinators manage company data, job postings, application reviews, and generate insightful reports for placement tracking.",
    },
    {
      title: "HR & Industry Relations",
      image: Management,
      description:
        "HR & Industry Relations can monitor overall placement activities, review analytics, and control system access and quality assurance.",
    },
    {
      title: "Placement Coordinator Faculty",
      image: Admin,
      description:
        "Placement Coordinator Faculty handle all roles with super privileges—managing users, system settings, and ensuring smooth operations across modules.",
    },
  ];

  return (
    <div
      id="about"
      className="bg-gradient-to-tr from-pink-100 via-purple-100 to-pink-100 py-10 scroll-mt-24"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 playfair">About IIIT Allahabad Placement Portal</h2>
        <p className="text-md md:text-lg max-w-3xl mx-auto text-gray-700 px-3">
          This portal is developed for IIIT Allahabad to streamline and modernize campus placement activities. It allows students, placement coordinators, faculty, and industry HR teams to collaborate efficiently in managing recruitment processes.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-stretch gap-10">
        {roles.map((role, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 shadow-lg rounded-xl w-80 max-md:py-3 max-md:px-2 md:p-5 flex flex-col items-center transform hover:scale-105 transition duration-300"
          >
            <img
              src={role.image}
              alt={role.title}
              className="w-48 h-48 object-cover rounded-full border-4 border-green-300 shadow-md"
            />
            <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-green-700 text-center">{role.title}</h3>
            <p className="text-gray-600 text-sm text-center">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandAbout;

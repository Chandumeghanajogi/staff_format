import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./staffform.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const StaffForm = ({ staffData }) => {
  const [formData, setFormData] = useState(
    staffData || {
      staffId: "",
      surname: "",
      name: "",
      gender: "",
      dob: "",
      fatherName: "",
      motherName: "",
      address: {
        street: "",
        area: "",
        mandal: "",
        district: "",
      },
      contact: "",
      email: "",
      maritalStatus: "",
      bloodGroup: "",
      aadharNo: "",
      panNo: "",
      dateOfJoin: "",
      department: "",
      bankDetails: {
        accountNo: "",
        ifscCode: "",
      },
      salary: "",
      totalExperience: "",
      designation: "",
      industryExperience: "",
      caste: "",
      subCaste: "",
      education: {
        ssc: {
          htno: "",
          percentage: "",
          schoolName: "",
          location: "",
          medium: "",
          passYear: "",
        },
        inter: {
          htno: "",
          percentage: "",
          collegeName: "",
          location: "",
          medium: "",
          passYear: "",
        },
        ug: {
          htno: "",
          percentage: "",
          collegeName: "",
          location: "",
          branch: "",
          specialization: "",
          medium: "",
          passYear: "",
        },
        pg1: {
          htno: "",
          percentage: "",
          collegeName: "",
          location: "",
          branch: "",
          specialization: "",
          medium: "",
          passYear: "",
        },
      },
      subjectsTeach: "",
      experience: [
        {
          organizationName: "",
          designation: "",
          joinDate: "",
          relieveDate: "",
          department: "",
          location: "",
        },
      ],
    }
  );
  const navigate = useNavigate();

  // Handle input changes for fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleDeepNestedChange = (section, subsection, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: { ...prev[section][subsection], [field]: value },
      },
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          organizationName: "",
          designation: "",
          joinDate: "",
          relieveDate: "",
          department: "",
          location: "",
        },
      ],
    }));
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (staffData?.staffId) {
        await axios.put(`http://localhost:1000/staff/${formData.staffId}`, formData);
        alert("Details updated successfully!");
      } else {
        await axios.post("http://localhost:1000/staff", formData);
        alert("Details added successfully!");
      }
      // onSubmit();
      navigate("/staff-details");
    } catch (err) {
      console.error("Error in form submission:", err);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="staff-form">
      <h2>{staffData?.staffId ? "Update Staff Details" : "Add Staff Details"}</h2>
      <table>
        <tbody>
          {/* Personal Details */}
          <tr>
            <th colSpan={2}>Personal Details</th>
          </tr>
          <tr>
            <td>Staff ID</td>
            <td>
              <input
                type="text"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                required
                placeholder="Staff ID"
              />
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </td>
          </tr>
          <tr>
            <td>Surname</td>
            <td>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Surname"
              />
            </td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Gender"
              />
            </td>
          </tr>
          

          <tr>
            <td>Date of Birth</td>
            <td>
              <DatePicker
                selected={formData.dob ? new Date(formData.dob) : null}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, dob: date.toISOString().split('T')[0] }))
                }
                dateFormat="yyyy-MM-dd"
                className="modern-date-picker"
                placeholderText="Select your Date of Birth"
              />
            </td>
          </tr>

          <tr>
            <td>FatherName</td>
            <td>
              <input
                type="text"
                name="FatherName"
                value={formData.FatherName}
                onChange={handleChange}
                placeholder="FatherName"
              />
            </td>
          </tr>
          <tr>
            <td>MotherName</td>
            <td>
              <input
                type="text"
                name="MotherName"
                value={formData.MotherName}
                onChange={handleChange}
                placeholder="MotherName"
              />
            </td>
          </tr>

          <tr>
          <th colSpan={2}>Address Details</th>
        </tr>
        <tr>
          <td>Street</td>
          <td>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={(e) => handleNestedChange("address", "street", e.target.value)}
              placeholder="Street"
            />
          </td>
        </tr>
        <tr>
          <td>Area</td>
          <td>
            <input
              type="text"
              name="area"
              value={formData.address.area}
              onChange={(e) => handleNestedChange("address", "area", e.target.value)}
              placeholder="Area"
            />
          </td>
        </tr>
        <tr>
          <td>Mandal</td>
          <td>
            <input
              type="text"
              name="mandal"
              value={formData.address.mandal}
              onChange={(e) => handleNestedChange("address", "mandal", e.target.value)}
              placeholder="Mandal"
            />
          </td>
        </tr>
        <tr>
          <td>District</td>
          <td>
            <input
              type="text"
              name="district"
              value={formData.address.district}
              onChange={(e) => handleNestedChange("address", "district", e.target.value)}
              placeholder="District"
            />
          </td>
        </tr>
        <tr>
          <td>State</td>
          <td>
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={(e) => handleNestedChange("address", "state", e.target.value)}
              placeholder="State"
            />
          </td>
        </tr>



          {/* Bank Details */}
          <tr>
            <th colSpan={2}>Bank Details</th>
          </tr>
          <tr>
            <td>Account Number</td>
            <td>
              <input
                type="text"
                name="accountNo"
                value={formData.bankDetails.accountNo}
                onChange={(e) =>
                  handleNestedChange("bankDetails", "accountNo", e.target.value)
                }
                placeholder="Account Number"
              />
            </td>
          </tr>
          <tr>
            <td>IFSC Code</td>
            <td>
              <input
                type="text"
                name="ifscCode"
                value={formData.bankDetails.ifscCode}
                onChange={(e) =>
                  handleNestedChange("bankDetails", "ifscCode", e.target.value)
                }
                placeholder="IFSC Code"
              />
            </td>
          </tr>

          {/* Education */}
          {/* <table className="h"   style={{ maxWidth: "900px", borderCollapse: "collapse" }}> */}
          <tr>
            <th colSpan={2}>Education Details</th>
          </tr>

          {/* SSC Fields */}
          <tr>
            <td>SSC Hall Ticket</td>
            <td>
              <input
                type="text"
                value={formData.education.ssc.htno}
                onChange={(e) =>
                  handleDeepNestedChange("education", "ssc", "htno", e.target.value)
                }
                placeholder="SSC Hall Ticket Number"
              />
            </td>
          </tr>
          <tr>
            <td>SSC Percentage</td>
            <td>
              <input
                type="text"
                value={formData.education.ssc.percentage}
                onChange={(e) =>
                  handleDeepNestedChange("education", "ssc", "percentage", e.target.value)
                }
                placeholder="SSC Percentage"
              />
            </td>
          </tr>
          <tr>
            <td>SSC School Name</td>
            <td>
              <input
                type="text"
                value={formData.education.ssc.schoolName}
                onChange={(e) =>
                  handleDeepNestedChange("education", "ssc", "schoolName", e.target.value)
                }
                placeholder="SSC School Name"
              />
            </td>
          </tr>
          <tr>
            <td>SSC Location</td>
            <td>
              <input
                type="text"
                value={formData.education.ssc.location}
                onChange={(e) =>
                  handleDeepNestedChange("education", "ssc", "location", e.target.value)
                }
                placeholder="SSC Location"
              />
            </td>
          </tr>
          <tr>
            <td>SSC Medium</td>
            <td>
              <input
                type="text"
                value={formData.education.ssc.medium}
                onChange={(e) =>
                  handleDeepNestedChange("education", "ssc", "medium", e.target.value)
                }
                placeholder="SSC Medium"
              />
            </td>
          </tr>
          <tr>
            <td>SSC Pass Year</td>
            <td>
              <input
                type="text"
                value={formData.education.ssc.passYear}
                onChange={(e) =>
                  handleDeepNestedChange("education", "ssc", "passYear", e.target.value)
                }
                placeholder="SSC Pass Year"
              />
            </td>
          </tr>

          {/* Inter Fields */}
          <tr>
            <td>Intermediate Hall Ticket</td>
            <td>
              <input
                type="text"
                value={formData.education.inter.htno}
                onChange={(e) =>
                  handleDeepNestedChange("education", "inter", "htno", e.target.value)
                }
                placeholder="Intermediate Hall Ticket Number"
              />
            </td>
          </tr>
          <tr>
            <td>Intermediate Percentage</td>
            <td>
              <input
                type="text"
                value={formData.education.inter.percentage}
                onChange={(e) =>
                  handleDeepNestedChange("education", "inter", "percentage", e.target.value)
                }
                placeholder="Intermediate Percentage"
              />
            </td>
          </tr>
          <tr>
            <td>Intermediate College Name</td>
            <td>
              <input
                type="text"
                value={formData.education.inter.collegeName}
                onChange={(e) =>
                  handleDeepNestedChange("education", "inter", "collegeName", e.target.value)
                }
                placeholder="Intermediate College Name"
              />
            </td>
          </tr>
          <tr>
            <td>Intermediate Location</td>
            <td>
              <input
                type="text"
                value={formData.education.inter.location}
                onChange={(e) =>
                  handleDeepNestedChange("education", "inter", "location", e.target.value)
                }
                placeholder="Intermediate Location"
              />
            </td>
          </tr>
          <tr>
            <td>Intermediate Medium</td>
            <td>
              <input
                type="text"
                value={formData.education.inter.medium}
                onChange={(e) =>
                  handleDeepNestedChange("education", "inter", "medium", e.target.value)
                }
                placeholder="Intermediate Medium"
              />
            </td>
          </tr>
          <tr>
            <td>Intermediate Pass Year</td>
            <td>
              <input
                type="text"
                value={formData.education.inter.passYear}
                onChange={(e) =>
                  handleDeepNestedChange("education", "inter", "passYear", e.target.value)
                }
                placeholder="Intermediate Pass Year"
              />
            </td>
          </tr>
        {/* </table> */}

                  {/* <table style={{ width: "100%", borderCollapse: "collapse" }}> */}
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  placeholder="Marital Status"
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="totalExperience"
                  value={formData.totalExperience}
                  onChange={handleChange}
                  placeholder="Total Experience"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  placeholder="Blood Group"
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="industryExperience"
                  value={formData.industryExperience}
                  onChange={handleChange}
                  placeholder="Industry Experience"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  placeholder="Aadhar No"
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  placeholder="Caste"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="subCaste"
                  value={formData.subCaste}
                  onChange={handleChange}
                  placeholder="Sub Caste"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleChange}
                  placeholder="Pan No"
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="dateOfJoin"
                  value={formData.dateOfJoin}
                  onChange={handleChange}
                  placeholder="Date of Join"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
          </tbody>
        {/* </table> */}




          {/* Professional Experience */}
          <tr>
            <th colSpan={2}>Professional Experience</th>
          </tr>
          {formData.experience.map((exp, index) => (
  <div key={index} className="experience-item">
    <h4>Experience {index + 1}</h4>
    <label>
      Organization Name:
      <input
        type="text"
        value={exp.organizationName}
        onChange={(e) =>
          handleExperienceChange(index, "organizationName", e.target.value)
        }
        placeholder="Organization Name"
      />
    </label>
    <label>
      Designation:
      <input
        type="text"
        value={exp.designation}
        onChange={(e) =>
          handleExperienceChange(index, "designation", e.target.value)
        }
        placeholder="Designation"
      />
    </label>
    <label>
      Join Date:
      <DatePicker
        selected={exp.joinDate ? new Date(exp.joinDate) : null}
        onChange={(date) =>
          handleExperienceChange(
            index,
            "joinDate",
            date ? date.toISOString().split("T")[0] : ""
          )
        }
        dateFormat="yyyy-MM-dd"
        placeholderText="Join Date"
      />
    </label>
    <label>
      Relieve Date:
      <DatePicker
        selected={exp.relieveDate ? new Date(exp.relieveDate) : null}
        onChange={(date) =>
          handleExperienceChange(
            index,
            "relieveDate",
            date ? date.toISOString().split("T")[0] : ""
          )
        }
        dateFormat="yyyy-MM-dd"
        placeholderText="Relieve Date"
      />
    </label>
    <label>
      Department:
      <input
        type="text"
        value={exp.department}
        onChange={(e) =>
          handleExperienceChange(index, "department", e.target.value)
        }
        placeholder="Department"
      />
    </label>
    <label>
      Location:
      <input
        type="text"
        value={exp.location}
        onChange={(e) =>
          handleExperienceChange(index, "location", e.target.value)
        }
        placeholder="Location"
      />
    </label>
    <button
      type="button"
      onClick={() => handleRemoveExperience(index)}
      className="remove-btn"
    >
      Remove Experience
    </button>
  </div>
))}
<button type="button" onClick={handleAddExperience} className="add-btn">
  Add Experience
</button>

          <tr>
            <td colSpan={2}>
              <button type="submit">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>

  );
};

export default StaffForm;

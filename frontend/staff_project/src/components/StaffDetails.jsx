import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StaffDetails = () => {
  const [staffId, setStaffId] = useState("");
  const [staffData, setStaffData] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchStaffDetails = async () => {
    if (!staffId) {
      setError("Please enter a Staff ID.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:1000/staff/${staffId}`);
      if (response.data) {
        console.log(response.data); // Debug log to check the data structure.
        setStaffData(response.data);
        setError("");
      } else {
        setError("Staff details not found.");
        setStaffData(null);
      }
    } catch (err) {
      console.error("Error fetching staff details:", err);
      setError("Staff details not found or an error occurred.");
      setStaffData(null);
    }
  };

  const handleNext = () => {
    navigate("/add-staff");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Fetch Staff Details</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "200px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={fetchStaffDetails}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Fetch Details
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: "8px 16px",
            backgroundColor: "#d6336c",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Next
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {staffData && (
        <div>
          <h3>Staff Details</h3>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Field</th>
                <th style={tableHeaderStyle}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tableCellStyle}>Name</td>
                <td style={tableCellStyle}>{`${staffData.name} ${staffData.surname}`}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Gender</td>
                <td style={tableCellStyle}>{staffData.gender}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Date of Birth</td>
                <td style={tableCellStyle}>{staffData.dob}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Contact</td>
                <td style={tableCellStyle}>{staffData.contact}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Email</td>
                <td style={tableCellStyle}>{staffData.email}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Department</td>
                <td style={tableCellStyle}>{staffData.department}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Designation</td>
                <td style={tableCellStyle}>{staffData.designation}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Salary</td>
                <td style={tableCellStyle}>{staffData.salary}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Blood Group</td>
                <td style={tableCellStyle}>{staffData.bloodGroup}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Total Experience</td>
                <td style={tableCellStyle}>{staffData.totalExperience}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Father's Name</td>
                <td style={tableCellStyle}>{staffData.fatherName}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Mother's Name</td>
                <td style={tableCellStyle}>{staffData.motherName}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Aadhar No</td>
                <td style={tableCellStyle}>{staffData.aadharNo}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>PAN No</td>
                <td style={tableCellStyle}>{staffData.panNo}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Marital Status</td>
                <td style={tableCellStyle}>{staffData.maritalStatus}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Address</td>
                <td style={tableCellStyle}>
                  {`${staffData.address.street}, ${staffData.address.area}, ${staffData.address.mandal}, ${staffData.address.district}`}
                </td>
              </tr>
              <tr>
                <td style={tableCellStyle}>Bank Account No</td>
                <td style={tableCellStyle}>{staffData.bankDetails.accountNo}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}>IFSC Code</td>
                <td style={tableCellStyle}>{staffData.bankDetails.ifscCode}</td>
              </tr>
              {/* Education Section */}
              <tr>
                <td colSpan={2} style={{ textAlign: "center", fontWeight: "bold" }}>Education Details</td>
              </tr>
              {/* SSC Details */}
              <tr>
                <td style={tableCellStyle}>SSC Details</td>
                <td style={tableCellStyle}>
                  {`Hall Ticket: ${staffData.education.ssc.htno}, Percentage: ${staffData.education.ssc.percentage}, School: ${staffData.education.ssc.schoolName}, Location: ${staffData.education.ssc.location}, Medium: ${staffData.education.ssc.medium}, Pass Year: ${staffData.education.ssc.passYear}`}
                </td>
              </tr>
              {/* Inter Details */}
              <tr>
                <td style={tableCellStyle}>Inter Details</td>
                <td style={tableCellStyle}>
                  {`Hall Ticket: ${staffData.education.inter.htno}, Percentage: ${staffData.education.inter.percentage}, College: ${staffData.education.inter.collegeName}, Location: ${staffData.education.inter.location}, Medium: ${staffData.education.inter.medium}, Pass Year: ${staffData.education.inter.passYear}`}
                </td>
              </tr>
              {/* UG Details */}
              <tr>
                <td style={tableCellStyle}>UG Details</td>
                <td style={tableCellStyle}>
                  {`Hall Ticket: ${staffData.education.ug.htno}, Percentage: ${staffData.education.ug.percentage}, College: ${staffData.education.ug.collegeName}, Location: ${staffData.education.ug.location}, Branch: ${staffData.education.ug.branch}, Specialization: ${staffData.education.ug.specialization}, Medium: ${staffData.education.ug.medium}, Pass Year: ${staffData.education.ug.passYear}`}
                </td>
              </tr>
              {/* PG Details */}
              <tr>
                <td style={tableCellStyle}>PG Details</td>
                <td style={tableCellStyle}>
                  {`Hall Ticket: ${staffData.education.pg1.htno}, Percentage: ${staffData.education.pg1.percentage}, College: ${staffData.education.pg1.collegeName}, Location: ${staffData.education.pg1.location}, Branch: ${staffData.education.pg1.branch}, Specialization: ${staffData.education.pg1.specialization}, Medium: ${staffData.education.pg1.medium}, Pass Year: ${staffData.education.pg1.passYear}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default StaffDetails;
<!-- HTML -->
<template>
  
    <!-- header, logo, +payroll btn -->
  <h1><img id="icon" src="../../public/img/favicon_io (1)/favicon-32x32.png">ModernTech Payroll</h1>
  <div class="payroll-container">
    <button @click="openModal"> +Add payroll</button>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeModal">&times;</span>
    <!-- Form starts here -->
    <form @submit.prevent="savePayroll">
      <h3>{{ isEditing ? 'Edit Payroll' : 'Add New Payroll' }}</h3>
      <div>
        <label for="ref">Employee Name:</label>
        <input type="text" v-model="newPayroll.employeeName" required />
      </div>
      <div>
        <label for="dateFrom">Employeee ID:</label>
        <input type="text" v-model="newPayroll.employeeId" required />
      </div>
      <div>
        <label for="dateTo">Hours Worked:</label>
        <input type="text" v-model="newPayroll.hoursWorked" required />
      </div>
      <div>
        <label for="salary">Leave Deductions:</label>
        <input type="number" v-model="newPayroll.leaveDeductions" />
      </div>
      <div>
        <label for="payrollAmount">Salary:</label>
        <input type="number" v-model="newPayroll.salary" />
      </div>
      <button type="submit">{{ isEditing ? 'Save changes' : 'Add' }}</button>
    </form>
  </div>
</div>


    <!-- Payroll Table -->
     <div class="table container"> 
    <table border="1">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee ID</th>
          <th>Hours Worked</th>
          <th>Leave Deductions </th>
          <th>Salary</th>
          <th>Action</th>
          <th>Download</th>
        
            <!-- Button to generate payslip -->
           
          
        </tr>
      </thead>
      <tbody>
      <!-- loop through  -->
        <tr v-for="(payroll, index) in payrolls" :key="index">
          <td data-cell="Name">  &nbsp;{{ payroll.employeeName }}</td>
          <td data-cell="ID">{{ payroll.employeeId }}</td>
          <td data-cell="Hours Worked">{{ payroll.hoursWorked}}</td>
          <td data-cell="Leave Deductions">{{ payroll.leaveDeductions }}</td>
          <td data-cell="Salary">{{ payroll.salary}}</td>
          <td data-cell="Actions" class="action-buttons">
            <button @click="editPayroll(index)" class="editbutton">Edit</button>
            <button @click="deletePayroll(index)" class="deletebutton">Delete</button>
          </td>
        
          <td data-cell="Download">
            <!-- Button to generate payslip -->
            <button @click="generatePayslip(payroll)">Generate Payslip</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<!-- Script -->
<script>

// import jspf
import { jsPDF } from 'jspdf';

export default {
  // payroll data
  data() {
    return {
      isModalVisible: false,
      isEditing: false,
      editIndex: null,
      newPayroll: {
        employeeName: '',
        employeeId: '',
        hoursWorked: 0,
        leaveDeductions: 0,
        salary: 0,
      },
      payrolls: [
      {
            "employeeId": 1,
            "employeeName":"Sibongile Nkosi",
            "hoursWorked": 160,
            "leaveDeductions": 8,
            "salary": 69500
        },
        {
            "employeeId": 2,
            "employeeName":"Lungile Mayo",
            "hoursWorked": 150,
            "leaveDeductions": 10,
            "salary": 79000
        },
        {
            "employeeId": 3,
            "employeeName":"Thabo Molefe",
            "hoursWorked": 170,
            "leaveDeductions": 4,
            "salary": 54800
        },
        {
            "employeeId": 4,
            "employeeName":"Keshav Naidoo",
            "hoursWorked": 165,
            "leaveDeductions": 6,
            "salary": 59700
        },
        {
            "employeeId": 5,
            "employeeName":"Zanele Khumalo",
            "hoursWorked": 158,
            "leaveDeductions": 5,
            "salary": 57850
        },
        {
            "employeeId": 6,
            "employeeName":"Sipho Zulu",
            "hoursWorked": 168,
            "leaveDeductions": 2,
            "salary": 64800
        },
        {
            "employeeId": 7,
            "employeeName":"Naledi Moeketsi",
            "hoursWorked": 175,
            "leaveDeductions": 3,
            "salary": 71800
        },
        {
            "employeeId": 8,
            "employeeName":"Farai Gumbo",
            "hoursWorked": 160,
            "leaveDeductions": 0,
            "salary": 56000
        },
        {
            "employeeId": 9,
            "employeeName":"Karabo Dlamini",
            "hoursWorked": 155,
            "leaveDeductions": 5,
            "salary": 61500
        },
        {
            "employeeId": 10,
            "employeeName":"Fatima Patel",
            "hoursWorked": 162,
            "leaveDeductions": 4,
            "salary": 57750
        }
       
      ],

    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
      // console for debugging
      console.log(8);
      

      // set edit  to false
      this.isEditing = false; 
      // reset form for new payroll
      this.newPayroll = {
        ref: '',
        dateFrom: '',
        dateTo: '',
        status: '',
        action: '',
        hoursWorked: 0,
        hourlyRate: 0,
        salary: 0,
        isSalary: false,
        payrollAmount: 0,
      };
    },

    // close  modal
    closeModal() {
      this.isModalVisible = false; 
      this.isEditing = false;
      this.editIndex = null;
      this.newPayroll = {
      employeeName: '',
      employeeId: '',
      hoursWorked: 0,
      leaveDeductions: 0,
      salary: 0,
    };
    },

    // payroll calculation
    savePayroll() {
      this.calculatePayroll(); 
  
  if (this.isEditing) {
    //  update  payroll 
    this.payrolls[this.editIndex] = { ...this.newPayroll, finalSalary: this.newPayroll.salary };
  } else {
    this.payrolls.push({ 
      ...this.newPayroll, 
      //  salary == finalSalary
      finalSalary: this.newPayroll.salary 
    });
  }
  // close modal 
  this.closeModal(); 
},
    editPayroll(index) {
      this.isEditing = true;
      this.editIndex = index; 
      
      this.newPayroll = { ...this.payrolls[index] };
      this.isModalVisible = true; 
    },
    calculatePayroll() {
      // Calc payroll amount based on hours or salary
      if (this.newPayroll.isSalary) {
        this.newPayroll.payrollAmount = this.newPayroll.salary / 12;
      } else {
        this.newPayroll.payrollAmount = this.newPayroll.salary - this.newPayroll.leaveDeductions;
      }
    },
    deletePayroll(index) {
      // remov selected payroll
      this.payrolls.splice(index, 1);
    },

    // generate pdf method
    generatePayslip(payroll) {
  const doc = new jsPDF();

  //  page Border 
  doc.setLineWidth(1); 
  doc.setDrawColor(0, 0, 0); 
  doc.rect(5, 5, 200, 287); 

  // code to load an image and convert it to Base64
  const loadImageAsBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; 
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = (err) => reject(err);
    });
  };

  // Load the logo 
  const logoUrl = "assets/newlogo.png"; 

  loadImageAsBase64(logoUrl)
    .then((logoBase64) => {
      // Add the logo image to the pdf
      doc.addImage(logoBase64, "PNG", 10, 10, 30, 30);

      // Title
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0); 
      doc.text("Payslip", 105, 20, null, null, "center");

      //  line under  title
      doc.setLineWidth(0.5);
      doc.line(20, 40, 190, 40);

      //  font size for details
      doc.setFontSize(12);

      // Payroll details
      doc.text(`Employee Name and Surname: ${payroll.employeeName || "N/A"}`, 20, 50);
      doc.text(`Employee ID: ${payroll.employeeId || "N/A"}`, 20, 60);
      doc.text(`Hours Worked: ${payroll.hoursWorked || "N/A"}`, 20, 70);
      doc.text(`Leave Deductions: ${payroll.leaveDeductions || "N/A"}`, 20, 80);
      doc.text(`Final Salary: R${payroll.salary || "Not provided"}`, 20, 90);

      // +  table
      doc.setLineWidth(0.2);
      doc.rect(20, 95, 170, 40); 
      doc.text("Hours Worked: ", 25, 115);
      doc.text(`${payroll.hoursWorked || "N/A"}`, 90, 115);

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100); 
      doc.text(
        "Generated by ModernTech Solutions Paysystem",
        105,
        280,
        null,
        null,
        "center"
      );

      // save  generated PDF
      doc.save(`${payroll.employeeName || "Employee"}-Payslip.pdf`);
    })
    .catch((err) => {
      console.error("Error loading image:", err);
    });
}

  },
};
</script>


<!-- CSS -->
<style scoped>
  /*modal styles */
  .modal{
    display: flex;
    justify-content: center;
    
  }

  /* form styles */
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
  }

  
  .modal-content {
  background-color: #ffffff;
  border: none;
  border-radius: 8px; 
  padding: 20px;
  width: 90%; 
  max-width: 500px; 
  max-height: 70vh; 
  overflow-y: auto; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}


.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background-color: #0056b3;
}


/* close btn */
.close {
  color: #333;
  float: right;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close:hover {
  color: #ff0000;
}

/* btn style */
button {
  background-color: lightgray;
  color: black;
  border: none;
  height: 50px;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease; 
}
.deletebutton{
  background-color: lightgray;
}
.editbutton{
  background-color: orange;
}
button:hover {
  background-color: lightgray;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Table Styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

table tr:hover {
  background-color: #f1f1f1;
}

/* Input Fields */
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

label {
  font-weight: bold;
}

/* animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.payroll-container {
  width: 90%;
  margin: 20px auto;
}

.modal-content {
  width: 80%;
  margin: 20px auto;
}

/* responsive css */
@media only screen and (max-width: 768px) {
  .payroll-container {
    width: 100%;
    margin: 10px auto;
  }
  .modal-content {
    width: 90%;
    margin: 10px auto;
  }

  th{
    display: none;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .payroll-container {
    width: 80%;
    margin: 20px auto;
  }
  .modal-content {
    width: 70%;
    margin: 20px auto;
  }
}

@media only screen and (min-width: 1025px) {
  .payroll-container {
    width: 70%;
    margin: 30px auto;
  }
  .modal-content {
    width: 60%;
    margin: 30px auto;
  }
}
@media only screen and (max-width: 768px) {
table {
font-size: 14px;
}
table th,
table td {
padding: 8px;
}

table tr {
display: flex;
flex-direction: column;
}
table td {
display: block;
width: 100%;
}
}
@media only screen and (max-width: 480px) {
table {
font-size: 12px;
}
table th,
table td {
padding: 5px;
}
}

@media only screen and (max-width: 768px) {
table td {
position: relative;
padding-top: 20px;
}

/* show data cell infor */
td::before {
    content: attr(data-cell) ":   ";
    font-weight: 700;
    text-transform: capitalize;
  }
}

</style>

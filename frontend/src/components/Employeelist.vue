<template>
 
  <div class="employee-list-container">
    <h1><img id="icon" src="../../public/img/favicon_io (1)/favicon-32x32.png">ModernTech Employees</h1>
    <!--modals-->
    <div v-if="addModal" class="modal">
      <div class="modal-content">
        <h2>Add New Employee</h2>
        <form @submit.prevent="addEmployee">
          <div>
            <label for="name">Name:</label>
            <input id="name" v-model="newEmployee.name" type="text" required />
          </div>
          <div>
            <label for="position">Position:</label>
            <input id="position" v-model="newEmployee.position" type="text" required />
          </div>
          <div>
            <label for="department">Department:</label>
            <input id="department" v-model="newEmployee.department" type="text" required />
          </div>
          <div>
            <label for="salary">Salary:</label>
            <input id="salary" v-model="newEmployee.salary" type="number" required />
          </div>
          <div>
            <label for="employmentHistory">Employment History:</label>
            <textarea id="employmentHistory" v-model="newEmployee.employmentHistory" required></textarea>
          </div>
          <div>
            <label for="contact">Email Address:</label>
            <input id="contact" v-model="newEmployee.contact" type="email" required />
          </div>
          <button type="submit">Save</button>
          <button type="button" @click="closeModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
  <button @click="openModal">+Add Employee</button>
  <!-- edit modal -->
  <!-- Edit Modal -->
  <div v-if="editModal" class="modal">
    <div class="modal-content">
      <h2>Edit Employee</h2>
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="editingEmployee.name" type="text" />
      </div>
      <div>
        <label for="position">Position:</label>
        <input id="position" v-model="editingEmployee.position" type="text" />
      </div>
      <div>
        <label for="department">Department:</label>
        <input id="department" v-model="editingEmployee.department" type="text" />
      </div>
      <button @click="saveEdit">Save</button>
      <button @click="closeEditModal">Cancel</button>

    </div>
  </div>
  <table>
    <thead>
    <tr>
      <th>Full Name</th>
      <th>Position</th>
      <th>Department</th>
      <th>Salary</th>
      <th>Employment History</th>
      <th>Email Address</th>
      <th>Delete</th>
      <th>Edit</th>
    </tr>
  </thead>
   
    <tbody>
      <tr v-for="employee in $store.state.employees">
  <td data-label="Full Name">{{ employee.name }}</td>
  <td data-label="Position">{{ employeeInformation.position }}</td>
  <td data-label="Department">{{ employeeInformation.department }}</td>
  <td data-label="Salary">{{ employeeInformation.salary }}</td>
  <td data-label="Employment History">{{ employeeInformation.employmentHistory }}</td>
  <td data-label="Email Address">{{ employeeInformation.contact }}</td>
  <td><button @click="deleteEmployee(index)" class="deletebutton">Delete</button></td>
  <td><button @click="openEditModal(index)" class="editbutton">Edit</button></td>
</tr>

    </tbody>
  </table>
  <Employeelist-view v-if="showMore" :Employeelist="chosenOne" :event="showMoreMethod" />
  <Employeelist-view v-if="showMore" :Employeelist="chosenOne" :event="showMoreMethod" />

</template>
<script>
// import EmployeelistView from '@/components/EmployeelistView.vue';

export default {
  mounted(){
    this.$store.dispatch(fetchEmployees)
  },
  data() {
    return {
      showMore: false,
      addModal: false,
      newEmployee: {
        name: "",
        position: "",
        department: "",
        salary: "",
        employmentHistory: "",
        contact: ""
      },
      editModal: false,
      editingEmployee: null,
      editingIndex: null,
      // employyeeInformations: [
      //   {
      //     "employeeId": 1,
      //     "name": "Sibongile Nkosi",
      //     "position": "Software Engineer",
      //     "department": "Development",
      //     "salary": 70000,
      //     "employmentHistory": "Joined in 2015, promoted to Senior in 2018",
      //     "contact": "sibongile.nkosi@moderntech.com"
      //   },
      //   {
      //     "employeeId": 2,
      //     "name": "Lungile Moyo",
      //     "position": "HR Manager",
      //     "department": "HR",
      //     "salary": 80000,
      //     "employmentHistory": "Joined in 2013, promoted to Manager in 2017",
      //     "contact": "lungile.moyo@moderntech.com"
      //   },
      //   {
      //     "employeeId": 3,
      //     "name": "Thabo Molefe",
      //     "position": "Quality Analyst",
      //     "department": "QA",
      //     "salary": 55000,
      //     "employmentHistory": "Joined in 2018",
      //     "contact": "thabo.molefe@moderntech.com"
      //   },
      //   {
      //     "employeeId": 4,
      //     "name": "Keshav Naidoo",
      //     "position": "Sales Representative",
      //     "department": "Sales",
      //     "salary": 60000,
      //     "employmentHistory": "Joined in 2020",
      //     "contact": "keshav.naidoo@moderntech.com"
      //   },
      //   {
      //     "employeeId": 5,
      //     "name": "Zanele Khumalo",
      //     "position": "Marketing Specialist",
      //     "department": "Marketing",
      //     "salary": 58000,
      //     "employmentHistory": "Joined in 2019",
      //     "contact": "zanele.khumalo@moderntech.com"
      //   },
      //   {
      //     "employeeId": 6,
      //     "name": "Sipho Zulu",
      //     "position": "UI/UX Designer",
      //     "department": "Design",
      //     "salary": 65000,
      //     "employmentHistory": "Joined in 2016",
      //     "contact": "sipho.zulu@moderntech.com"
      //   },
      //   {
      //     "employeeId": 7,
      //     "name": "Naledi Moeketsi",
      //     "position": "DevOps Engineer",
      //     "department": "IT",
      //     "salary": 72000,
      //     "employmentHistory": "Joined in 2017",
      //     "contact": "naledi.moeketsi@moderntech.com"
      //   },
      //   {
      //     "employeeId": 8,
      //     "name": "Farai Gumbo",
      //     "position": "Content Strategist",
      //     "department": "Marketing",
      //     "salary": 56000,
      //     "employmentHistory": "Joined in 2021",
      //     "contact": "farai.gumbo@moderntech.com"
      //   },
      //   {
      //     "employeeId": 9,
      //     "name": "Karabo Dlamini",
      //     "position": "Accountant",
      //     "department": "Finance",
      //     "salary": 62000,
      //     "employmentHistory": "Joined in 2018",
      //     "contact": "karabo.dlamini@moderntech.com"
      //   },
      //   {
      //     "employeeId": 10,
      //     "name": "Fatima Patel",
      //     "position": "Customer Support Lead",
      //     "department": "Support",
      //     "salary": 58000,
      //     "employmentHistory": "Joined in 2016",
      //     "contact": "fatima.patel@moderntech.com"
      //   }
      // ]

    }
  },
  components: {},
  methods: {

    getSingleEmployeelist(i) { //creating fucnction  to get a single Employeelist by the index //the arguments dosnt need to be the same(index)
      let x = this.Employeelists.filter((Employeelist, index) => index === i)
      console.log(x); //1 checking index is passed through to button
      this.chosenOne = x[0]//sets searcch value to placeholder

    },
    showMoreMethod(index) {
      this.showMore = !this.showMore;
      console.log(index); //1 checking index is passed through to button
      this.getSingleEmployeelist(index)
    },
    deleteEmployee(index) {
      this.employyeeInformations.splice(index, 1);
    },
    openModal() {
      this.addModal = true
    },
    closeModal() {
      this.addModal = false;
      this.resetNewEmployee();
    },
    resetNewEmployee() {
      this.newEmployee = {
        name: "",
        position: "",
        department: "",
        salary: "",
        employmentHistory: "",
        contact: ""
      };
    },
    addEmployee() {
      this.employyeeInformations.push({ ...this.newEmployee }); //adding the employyee
      this.closeModal()
    },
      openEditModal(index) {
        this.editModal = true;
        this.editingIndex = index;
        this.editingEmployee = { ...this.employyeeInformations[index] }; // Clone the employee data
      },
      closeEditModal(){
        this.editModal = false;
        this.editingEmployee = null;
        this.editingIndex = null;
      },
      saveEdit() {
  if (!this.editingEmployee.name || !this.editingEmployee.contact) {
    alert("Name and Email Address are required!");
    return;
  }
  if (this.editingIndex !== null) {
    this.employyeeInformations.splice(this.editingIndex, 1, { ...this.editingEmployee });
    alert("Employee details updated successfully!");
  }
  this.closeEditModal();
}


    }
  }

 
</script>


<style scoped>

  /* Modal Container */
  .modal{
    display: flex;
    justify-content: center;
   
  }

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
  }

 
  .modal-content {
  background-color: #ffffff;
  border: none;
  border-radius: 8px; /* Rounded corners */
  padding: 20px;
  width: 90%; /* Responsive width */
  max-width: 500px; /* Limit form width */
  max-height: 70vh; /* Limit form height (70% of viewport height) */
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

/* Optional: Add custom scrollbar styling */
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


/* Modal Close Button */
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

/* Buttons */
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
input[type="number"],
textarea,
input[type="email"] {
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

/* Modal Animation */
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
  width: 60%;
  margin: 30px auto;
}
.modal-content {
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 20px;
  width: 90%; /* Default width */
  max-width: 500px; /* Upper limit */
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%; /* Make form width responsive */
}

input[type="text"],
input[type="number"],
textarea,
input[type="email"]

button {
  width: 100%; /* Stretch input and button fields */
  box-sizing: border-box; /* Include padding and border in width */
}

@media (max-width: 414px) {
  /* Adjust modal and inputs for iPhone XR */
  .modal-content {
    width: 95%; /* Occupy most of the screen */
    padding: 15px; /* Reduce padding for smaller screens */
  }

  input[type="text"],
  input[type="number"],
  textarea,
  input[type="email"],
  button {
    font-size: 14px; /* Adjust font size */
    padding: 10px; /* Smaller padding */
  }
}



@media only screen and (min-width: 1025px) {
  .modal-content {
    width: 60%;
    margin: 30px auto;
  }
}

/* Use media queries to adjust styles for different screen sizes */
@media (max-width: 768px) {
  /* Add horizontal scrolling to the table */
  table {
    width: 100%;
    white-space: nowrap;
  }
  tr{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: space-around;
  }
  /* Make the table layout more flexible on smaller screens */
  th, td {
    display: inline-block;
    padding: 8px;
  }
  /* Adjust the layout to show headings next to data */
  th {
    display: none; /* Hide original table headers */
  }
  td {
    display: flex;
    flex-basis: 50%;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    text-align: left;
    width: 100%;
  }
  /* Add labels before data for better clarity */
  td::before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 8px;
    flex-basis: 40%; /* Adjust the width of the label */
  }
  /* Optional: Hide buttons and reduce size on very small screens */
  td button {
    font-size: 12px;
    padding: 6px;
  }
}
/* Media query for extra small screens */
@media (max-width: 480px) {
  tr{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 355px;
    justify-content: space-around;
  }
  td {
    padding: 6px;
    font-size: 10px;
  }
  th, td {
    font-size: 10px;
  }
  td::before {
    width: 100px; /* Adjust the label width further for very small screens */
  }
}
</style>
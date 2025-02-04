// html
<template>
  <!-- logo and heading -->
  <h1><img id="icon" src="../../public/img/favicon_io (1)/favicon-32x32.png">ModernTech Attendance</h1>
 
  <!-- parent table -->
    <table class="parent" border="1">
    <!-- table headings -->
  <thead>
    <tr>
      <th>Employee</th>
      <th colspan="2">Attendance</th>
      <th>Actions</th>
    </tr>
    <tr>
      <th></th>
      <th>Date</th>
      <th>Status</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  <!-- i bind my employee variable to my employee id -->
  <!-- i use data-cells for when i make my code in mobile it display none th and display datacell info -->
  <!-- embeded data from doc's json in td -->
    <tr v-for="employee in attendanceAndLeave" :key="employee.employeeId">
      <!-- Employee Name Embed in td -->
      <td data-cell="name">{{ employee.name }}</td>

      <!-- Attendance  -->
      <td data-cell="date">
        <div v-for="attendance in employee.attendance" :key="attendance.date">
          {{ attendance.date }}
        </div>
      </td>

      <!-- status -->
      <td data-cell="status">
        <div v-for="attendance in employee.attendance" :key="attendance.date">
          <span v-if="attendance.status === 'Present'">Present</span>
          <span v-else-if="attendance.status === 'Absent'">Absent</span>
        </div>
      </td>

      <!-- Actions  -->
      <td data-cell="action">
        
        <button @click="deleteEmployeeInfo(employee.employeeId)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>


        <!--  Time Off Table  -->
        <h1>Time Off</h1>
<table class="parent" border="1">
  <thead>
    <tr>
      <th>Employee</th>
      <th>Date</th>
      <th>Reason</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <!-- tbody with for loops to loop through array  -->
  <tbody>
    <tr v-for="employee in attendanceAndLeave" :key="employee.employeeId">
      <td data-cell="name">{{ employee.name }}</td>

      <!-- Time Off Section (Leave Requests) -->
      <td data-cell="date">
        <div v-for="leave in employee.leaveRequests" :key="leave.date">
          {{ leave.date }}
        </div>
      </td>

      <td data-cell="reason">
        <div v-for="leave in employee.leaveRequests" :key="leave.date">
          {{ leave.reason }}
        </div>
      </td>

      <td data-cell="status">
        <div v-for="leave in employee.leaveRequests" :key="leave.date">
          {{ leave.status }}
        </div>
      </td>
      <td data-cell="action">
        <!-- accept and approve btns  -->
        <div>
  <button @click="acceptLeave(employee.leaveRequests[0])">Approve</button>
  <button @click="declineLeave(employee.leaveRequests[0])">Deny</button>
</div>



      </td>
    </tr>
  </tbody>
</table>
</template>

// script
<script>
export default {
  data() {
    return{
      // docs json store in array
      attendanceAndLeave: [
        {
            "employeeId": 1,
            "name": "Sibongile Nkosi",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-22",
                    "reason": "Sick Leave",
                    "status": "Approved"
                },
                {
                    "date": "2024-12-01",
                    "reason": "Personal",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 2,
            "name": "Lungile Moyo",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-15",
                    "reason": "Family Responsibility",
                    "status": "Denied"
                },
                {
                    "date": "2024-12-02",
                    "reason": "Vacation",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 3,
            "name": "Thabo Molefe",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-10",
                    "reason": "Medical Appointment",
                    "status": "Approved"
                },
                {
                    "date": "2024-12-05",
                    "reason": "Personal",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 4,
            "name": "Keshav Naidoo",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-20",
                    "reason": "Bereavement",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 5,
            "name": "Zanele Khumalo",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-12-01",
                    "reason": "Childcare",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 6,
            "name": "Sipho Zulu",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-18",
                    "reason": "Sick Leave",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 7,
            "name": "Naledi Moeketsi",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-22",
                    "reason": "Vacation",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 8,
            "name": "Farai Gumbo",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-12-02",
                    "reason": "Medical Appointment",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 9,
            "name": "Karabo Dlamini",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-19",
                    "reason": "Childcare",
                    "status": "Denied"
                }
            ]
        },
        {
            "employeeId": 10,
            "name": "Fatima Patel",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-12-03",
                    "reason": "Vacation",
                    "status": "Pending"
                }
            ]
        }
       
      ],

        // hides and shows modal
      showModal: false, 

      // hide and show edit modal
      editModalVisible: false, 
      // New employee data
      newEmployee: {
        name: "" 
      },

      // edit employee data
      editEmployee: {
        employeeId: null,
        name: "", 
        date: "",
        status: ""
      }
    }
  },
  methods:{
     // Delete method where i find index of employee and delete 
     deleteEmployeeInfo(employeeId) {
      const index = this.attendanceAndLeave.findIndex(
        (employee) => employee.employeeId === employeeId
      );
      if (index !== -1) {
        this.attendanceAndLeave.splice(index, 1);
        console.log(`Employee with ID ${employeeId} deleted`);
      }
    },

    

    //ethod
    editEmployeeInfo(employee) {
      //  copy of the employee to edit
      this.editEmployee = { ...employee }; 
 //edit modal
      this.editModalVisible = true; 
    },

    acceptLeave(leave) {
        // displays alert if you click approve
        alert(`Leave request for ${leave.date} has been accepted.`);
        
        //  status become approve
        leave.status = "Approved"; 
      },
      
      //  Decline btn
      declineLeave(leave) {
        alert(`Leave request for ${leave.date} has been declined.`);
       
        //  status beom dacleine
        leave.status = "Declined"; 
      },

    // updatie employee method
    updateEmployeeInfo() {
      const index = this.attendanceAndLeave.findIndex(
        (employee) => employee.employeeId === this.editEmployee.employeeId
      );
      if (index !== -1) {
        this.attendanceAndLeave[index] = { ...this.editEmployee }; 
        console.log(`Employee with ID ${this.editEmployee.employeeId} updated`);
      }
// Close the modal 
      this.editModalVisible = false; 
    },

    // add new employee metod
    addNewEmployee() {
      const newId = this.attendanceAndLeave.length + 1; 
      this.attendanceAndLeave.push({
        employeeId: newId,
        name: this.newEmployee.name,
        //  empty data for attendance and leave 
        attendance: [],  
        leaveRequests: []
      });

       // Reset input 
      this.newEmployee.name = ""; 

      // Close modal
      this.showModal = false;  
      console.log(`New employee added: ${this.newEmployee.name}`);
    }
  }
  };
</script>

// css
<style scoped>
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

.editbutton {
  background-color: orange;
}

/* table style */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

/* responsive css */
@media (max-width: 720px) {
  .parent {
    display: block;
    overflow-x: auto;
  }

  table {
    width: 100%;
    display: block;
    
  }
 

  th {
    display: none;
  }

  tr td{
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

   
  }

  
  tbody {
    display: block;
    overflow:hidden;
  }

  tr {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  width: 100%; 
  overflow: hidden; 
}


  td {
    display: block;
    width: 100%;
    border: none;
    padding: 20px;
    
  }

  td::before {
    content: attr(data-cell) ":   ";
    font-weight: 700;
    text-transform: capitalize;
  }

  /* data cell style */
  td[data-cell="date"], td[data-cell="status"] {
    background-color: #f9f9f9;
    margin-bottom: 5px;
  }

  
  td table {
    width: 100%;
    display: block;
    margin-top: 10px;
    background-color: #f4f4f4; 
    padding: 10px;
  }

  td table th,
  td table td {
    width: 100%;
    display: block;
    border: 1px solid #ddd;
    padding: 8px;
  }

  td table th {
    font-weight: bold;
  }

  td table tr {
    margin-bottom: 5px;
  }

  
  td table td {
    margin-bottom: 5px;
  }

  
  td[data-cell="name"], td[data-cell="reason"] {
    margin-bottom: 15px;  
  }
}
</style>

import { createStore } from 'vuex'

export default createStore({
  state: {
    // store data
    employees: [],
    payroll:[],
    attendanceandleave: []
  },
  getters: {

  },
  mutations: {
    // change state

    // view employees
    viewEmployees(state,payload){
      state.employees = payload
    },

    // addEmployees
    // addEmployees(){
    //   state.employees.push(emplo)
    // },

    // update Employees

    // delete Employees

    // view payroll
    // insert payroll
    // update payroll
    // delete payroll

     // view attendance and leave
    // insert attendance and leave
    // update attendance and leave
    // delete attendance and leave


  },

  actions: {
    // fetch data

     // fetch employees
     async fetchEmployees({commit}){
      try{
        const response = await fetch('http://localhost:3000/employees')
        if (!response.ok) throw new Error("Failed to fetch employees")

          const data = await response.json();
          commit('setEmployees', data.employees)
      }

      catch(error){
        console.error("Error fetching employees:",error)
      }
     }

    // insert employees
    // update employees
    // delete employees

     // view payroll
    // insert payroll
    // update payroll
    // delete payroll

     // view attendance and leave
    // insert attendance and leave
    // update attendance and leave
    // delete attendance and leave


  },
  modules: {
  }
})

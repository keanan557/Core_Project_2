// html
<template>
  <!-- logo,heading,add new review btn -->
  <h1><img id="icon" src="../../public/img/favicon_io (1)/favicon-32x32.png">ModernTech Performance Reviews</h1>
  <button @click="showModal = true" class="btn">+ New Review</button>

  <!-- Modal -->
  <div class="modal" v-if="showModal">
    <!-- Form -->
    <form @submit.prevent="addOrUpdateReview">
      <button class="close-btn" type="button" @click="showModal = false">X</button>

      <label>Employee:</label>
      <input type="text" v-model="newReview.employee" required />

      <!-- rating container -->
      <label>Rating:</label>
      <div class="Rating-container">
        <div v-for="rating in [1, 2, 3, 4, 5]" :key="rating">
          <p>{{ rating }}</p>
          <input type="radio" :value="rating" v-model="newReview.rating" />
        </div>
      </div>

      <label>Reason for Rating:</label>
      <input type="text" v-model="newReview.reason" required />

      <button class="btn" type="submit">Submit</button>
    </form>
  </div>

  <!-- Table,thead,tbody -->
  <table>
    <thead>
      <tr>
        <th>Employee</th>
        <th>Rating</th>
        <th>Reason</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    <!-- loop through array in script to display in embedded td -->
      <tr v-for="(review, index) in reviews" :key="index">
        <td>{{ review.employee }}</td>
        <td>{{ review.rating }}</td>
        <td>{{ review.reason }}</td>
        <td>
          <button class="editBtn" @click="editReview(index)">Edit</button>
          <button class="deleteBtn" @click="deleteReview(index)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

// script
<script>
export default {
  data() {
    return {
      // modl
      showModal: false, 
      newReview: {
        employee: '',
        rating: null,
        reason: '',
      }, 
      // reviews
      reviews: [], 
      // if editing
      isEditing: false, 
      // edit index
      editIndex: null, 
    };
  },
  methods: {
    addOrUpdateReview() {
      if (this.isEditing) {
        // Update  review
        this.reviews[this.editIndex] = { ...this.newReview };
      } else {
        // + new review
        this.reviews.push({ ...this.newReview });
      }

      // REset form then close modal
      this.resetForm();
    },
    editReview(index) {
      // Open modal , display selected data
      this.newReview = { ...this.reviews[index] };
      this.isEditing = true;
      this.editIndex = index;
      this.showModal = true;
    },

    // delte reveiw at index
    deleteReview(index) {
      
      this.reviews.splice(index, 1);
    },

    // Reset form and modal state
    resetForm() {
      
      this.newReview = { employee: '', rating: null, reason: '' };
      this.isEditing = false;
      this.editIndex = null;
      this.showModal = false;
    },
  },
};
</script>

// scope css for this pg
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
/* Modal Styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000;
  padding: 10px; 
  box-sizing: border-box; 
}

/* form style */
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 1px solid lightgrey;
  padding: 20px;
  position: relative;
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px; 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
}

form input{
  border-radius: 4px;

}

.close-btn {
  font-size: 1rem;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  background-color: #f44336;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px; 
}

.close-btn:hover {
  background-color: #d32f2f;
}

/* tAAble styls */
th, td {
  padding: 8px;
  border: 1px solid #ddd;
  word-wrap: break-word; 
  white-space: normal; 
  text-align: left; 
}


table {
  width: 100%; 
  table-layout: fixed; 
  border-collapse: collapse; 
}

th, td {
  width: auto; 
}


/* Rating Container */
.Rating-container {
  display: flex;
  justify-content: space-around;
  gap: 2rem;
}

.btn{
  background: lightgray;
  color: black;
  height: 40px;
  border-radius: 8px;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.editBtn{
  background: orange;
  color: white;
  height: 40px;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
}

.deleteBtn{
  background: lightgray;
  color: black;
  height: 40px;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
}

/* responsive css */
@media (max-width: 1024px) {
  form {
    max-width: 400px; 
  }

  .Rating-container {
    flex-direction: column;
    gap: 1rem; 
  }
}

@media (max-width: 768px) {
  form {
    width: 90%;
    padding: 15px; 
  }

  table {
    font-size: 0.8rem;
    overflow-x: auto;
  }

  th, td {
    padding: 6px;
  }
}

@media (max-width: 480px) {
  form {
    max-width: 300px;
    padding: 10px;
  }

  .close-btn {
    font-size: 0.9rem;
    top: 5px;
    right: 5px; 
  }

  .modal {
    padding: 10px;
  }

  h1 {
    font-size: 1.5rem;
    text-align: center; 
  }
}


</style>
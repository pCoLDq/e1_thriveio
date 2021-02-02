<template>
  <div class="main">
    <h2>Add Tender</h2>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="requiredNumOfHives" placeholder="Required num of hives" /><br /><br />

      <input type="text" v-model="salary" placeholder="Salary" /><br /><br />

      <button type="submit" class="submit" name="submitbtn" value="subm">
        Submit
      </button>
      <div class="msgs">
        <strong>{{ message }} </strong>
        <strong v-if="message == ''"> {{ serverMessage }} </strong>
      </div>
    </form>
  </div>
</template>

<script>
import { isTenderInputValid } from '@/service_functions/tender_form_validation';

export default {
  props: ['serverMessage'],
  data() {
    return {
      requiredNumOfHives: '',
      salary: '',
      message: '',
    };
  },
  methods: {
    onSubmit() {
      this.message = '';
      const newTenderInputData = {
        requiredNumOfHives: this.requiredNumOfHives.trim(),
        salary: this.salary.trim(),
      };
      if (isTenderInputValid(newTenderInputData)) {
        this.$emit('form-submit', newTenderInputData);
      } else {
        this.requiredNumOfHives = '';
        this.salary = '';
        this.message = 'Invalid input';
      }
    },
  },
};
</script>

<style scoped>
:active,
:hover,
:focus {
  outline: 0;
  outline-offset: 0;
}
.main {
  width: 600px;
  height: 600px;
  margin-left: 35%;
}
h2 {
  position: absolute;
  color: #59a66b;
  font-size: 2em;
  font-family: sans-serif;
  font-weight: 600;
  left: 46.5%;
  top: 8%;
}
div {
  margin-top: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

strong {
  color: crimson;
  margin: 10px;
}
label {
  font-family: sans-serif;
  font-weight: 600;
}
input[type='text'] {
  width: 20em;
  padding: 15px;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 0 15px 4px #8bd89d;
}
.submit {
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
  padding: 8px 14px;
  width: 120px;
  border: 1px solid #59a66b;
  color: #59a66b;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 0.5px;
  transition: background-color 300ms;
}
.submit:hover {
  background-color: #59a66b;
  color: white;
}
.submit:active {
  margin-top: 1px;
  margin-bottom: -1px;
  zoom: 1;
}
.submit:focus {
  outline: none;
}
.msgs {
  width: 300px;
  height: 500px;
  margin-left: auto;
  margin-right: 2%;
}
</style>

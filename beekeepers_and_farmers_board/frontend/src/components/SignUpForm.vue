<template>
  <div class="main">
    <h2>Sign Up</h2>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="username" placeholder="Username" /><br /><br />

      <input type="text" v-model="email" placeholder="Email" /><br /><br />

      <input type="password" v-model="password" placeholder="Password" /><br /><br />

      <input type="password" v-model="confPassword" placeholder="Confirm password" /><br /><br />

      <label>I am...</label><br /><br />

      <input type="radio" id="bkpr" value="beekeeper" v-model="userType" />
      <label for="bkpr">beekeeper</label><br />

      <input type="radio" id="frmr" value="farmer" v-model="userType" />
      <label for="frmr">farmer</label><br /><br />

      <input
        type="text"
        v-if="userType == 'beekeeper'"
        v-model="numOfHives"
        placeholder="Number of your hives"
      /><br /><br />

      <button type="submit" class="submit" name="submitbtn" value="subm">Submit</button>
      <div class="msgs">
        <strong>{{ message }} </strong>
        <strong v-if="message == ''"> {{ serverMessage }} </strong>
      </div>
    </form>
  </div>
</template>

<script>
import { isAuthInputValid } from '../service_functions/auth_form_validation';

export default {
  props: ['serverMessage'],
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confPassword: '',
      userType: '',
      numOfHives: '',
      message: '',
    };
  },
  methods: {
    onSubmit() {
      this.message = '';
      const newUserInputData = {
        username: this.username.trim(),
        email: this.email.trim(),
        password: this.password.trim(),
        confPassword: this.confPassword.trim(),
        userType: this.userType,
        numOfHives: +this.numOfHives,
      };
      if (isAuthInputValid(newUserInputData)) {
        this.$emit('form-submit', newUserInputData);
      } else {
        this.username = '';
        this.email = '';
        this.password = '';
        this.confPassword = '';
        this.userType = '';
        this.numOfHives = '';
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
  left: 48%;
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
input[type='text'],
input[type='password'] {
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

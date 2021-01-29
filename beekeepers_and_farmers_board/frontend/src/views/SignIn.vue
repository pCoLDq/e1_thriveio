<template>
  <div>
    <h2>Sign In</h2>
    <SignInForm @form-submit="onFormSubmit" v-bind:serverMessage="serverMessage"></SignInForm>
    <label><router-link to="/"> Home </router-link></label>
  </div>
</template>

<script>

import SignInForm from '@/components/SignInForm'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:8080/auth/',
  timeout: 3000
});

export default {
  components: {
    SignInForm,
  },
  data() {
    return {
      serverMessage: ''
    }
  },
  methods: {
    onFormSubmit(formData) {
      console.log('input', formData);
      this.serverMessage = '';

      axios.post('/login', formData)
      .then((response) => {
        console.log("SignIn.vue: response", response);
        if(response.status == 202) {
          localStorage.AuthToken = response.data.AuthToken;
          console.log('localStorage.AuthToken ===', localStorage.AuthToken);
          location.assign('/')
        }
      })
      .catch((error) => {
        console.log('ErRoR', error);
        if(error.response.status == 403) {
          this.serverMessage = 'invalid username or password'
        }
      });
    }
  }
}
</script>

<style scoped>
div {
  display:grid;
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
label {
  position: absolute;
  left: 55%;
  top: 35%;
}
a {
  border:1px solid #59a66b;
  text-decoration: none;
  padding: 10px;
  margin-right: 20px;
  color: #59a66b;
  font-weight: 600;
  font-size: 17px;
  border-radius: 7px;
  letter-spacing: 0.5px;
  transition: background-color 300ms;
}
a:hover {
  color: white;
  background-color: #59a66b;
}
</style>
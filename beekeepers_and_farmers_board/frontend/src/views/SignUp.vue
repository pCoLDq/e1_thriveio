<template>
  <div>
    <SignUpForm @form-submit="onFormSubmit" v-bind:serverMessage="serverMessage"></SignUpForm>
    <router-link to="/"> <p class="link">Home</p> </router-link>
  </div>
</template>

<script>

import SignUpForm from '@/components/SignUpForm'

export default {
  components: {
    SignUpForm,
  },
  data() {
    return {
      serverMessage: ''
    }
  },
  methods: {
    onFormSubmit(input) {
      console.log(input);
      this.serverMessage = '';
      let request = new XMLHttpRequest();
      let body = 
      'username=' + encodeURIComponent(input.username) +
      '&email=' + encodeURIComponent(input.email) + 
      '&password=' + encodeURIComponent(input.password) +
      '&confPassword=' + encodeURIComponent(input.confPassword) +
      '&userType=' + encodeURIComponent(input.userType) +
      '&numOfHives=' + encodeURIComponent(input.numOfHives);
      
      request.open("POST", 'http://localhost:8080/auth/register', true);

      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      request.onreadystatechange = () => {
        console.log("SignUp.vue: request", request);
        if(request.status == 201) {
          window.location = "/signin"
        } else if (request.status == 400) {
          this.serverMessage = 'passwords dont match or the user with the same username or email is already registered'
        } else if (request.status == 501) {
          this.serverMessage = 'server error'

        }
      }

      request.send(body);
    }
  }
}
</script>

<style scoped>
div {
  display:grid;
}
a {
  position: absolute;
  border:1px solid #59a66b;
  position: relative;
  text-decoration: none;
  padding: 10px;
  margin-right: 20px;
  color: #59a66b;
  font-weight: 600;
  font-size: 17px;
  border-radius: 7px;
  letter-spacing: 0.5px;
  transition: background-color 300ms;
  width: fit-content;
}
a:hover {
  color: white;
  background-color: #59a66b;
}
</style>
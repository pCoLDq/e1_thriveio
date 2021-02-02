<template>
  <div>
    <SignUpForm @form-submit="onFormSubmit" v-bind:serverMessage="serverMessage"></SignUpForm>
    <label><router-link to="/"> Home</router-link></label>
  </div>
</template>

<script>
import SignUpForm from '@/components/SignUpForm';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/auth/',
  timeout: 3000,
});

export default {
  components: {
    SignUpForm,
  },
  data() {
    return {
      serverMessage: '',
    };
  },
  methods: {
    onFormSubmit(formData) {
      console.log(formData);
      this.serverMessage = '';

      axios
        .post('/register', formData)
        .then(response => {
          console.log('SignUp.vue: response', response);
          if (response.status == 201) {
            location.assign('/signin');
          }
        })
        .catch(error => {
          console.log('ErRoR', error);
          switch (error.response.status) {
            case 400:
              this.serverMessage = 'passwords doesnt match';
              break;
            case 409:
              this.serverMessage = 'user with the same username or email is already registered';
              break;
            case 501:
              this.serverMessage = 'server error';
              break;
          }
        });
    },
  },
};
</script>

<style scoped>
div {
  display: grid;
}
label {
  position: absolute;
  left: 55%;
  top: 65%;
}
a {
  border: 1px solid #59a66b;
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

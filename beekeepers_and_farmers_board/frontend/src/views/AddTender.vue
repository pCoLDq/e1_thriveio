<template>
  <div>
    <AddTenderForm @form-submit="onFormSubmit" v-bind:serverMessage="serverMessage" />
    <label><router-link to="/"> Home </router-link></label>
  </div>
</template>

<script>
import AddTenderForm from '@/components/AddTenderForm';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/tenders',
  withCredentials: true,
  timeout: 3000,
});

export default {
  components: {
    AddTenderForm,
  },
  data() {
    return {
      serverMessage: '',
    };
  },
  methods: {
    onFormSubmit(formData) {
      axios
        .post('/create', formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log('AddTender.vue: response', response);
          if (response.status == 201) {
            console.log('response', response);
            location.assign('/');
          }
        })
        .catch((error) => {
          console.log('ErRoR', error);
          switch (error.response.status) {
            case 403:
              this.serverMessage = 'invalid username or password';
              break;
            case 401:
              this.serverMessage = 'permission denied';
              break;
            case 400:
              this.serverMessage = 'validation error';
              break;
            case 501:
              this.serverMessage = 'internal server error';
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

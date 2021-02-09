<template>
  <div class="suggestion">
    <h4>Tender ID: {{ suggestion.tender_id }}</h4>
    <h4>Status: {{ suggestion.status }}</h4>
    <button v-if="userData.userType == 'farmer'" @click="onAdmit">Admit</button>
    <button v-if="userData.userType == 'farmer'" @click="onDeny">Deny</button>
  </div>
</template>

<script>
import axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/beekeepers_suggestions',
  withCredentials: true,
  timeout: 3000,
});

export default {
  props: ['suggestion', 'userData'],
  data() {
    return {};
  },
  methods: {
    onAdmit() {
      axios
        .patch('/admit', this.suggestion.id)
        .then((response) => {
          if (response.status == 200) {
            this.$emit('delete-suggestion', this.suggestion.id);
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              console.log('no suggestion id was sent');
              break;
            case 401:
              console.log('unauthorized');
              break;
            case 403:
              console.log('user doesnt owns the tender');
              break;
          }
        });
    },
    onDeny() {
      axios
        .patch('/deny', { suggestionId: this.suggestion.id })
        .then((response) => {
          if (response.status == 200) {
            this.$emit('delete-suggestion', this.suggestion.id);
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              console.log('no suggestion id was sent');
              break;
            case 401:
              console.log('unauthorized');
              break;
            case 403:
              console.log('user doesnt owns the tender');
              break;
          }
        });
    },
  },
};
</script>

<style scoped>
.suggestion {
  margin: 10px;
  width: 98%;
  height: 100px;
  margin: 8px;
  background-color: #59a66b;
  border: 2px solid white;
}
h4 {
  color: white;
  margin: 5px;
  position: relative;
  top: 5px;
}
button {
  color: #59a66b;
  position: relative;
  left: 45%;
  top: 8%;
  margin: 5px;
}
button:focus {
  outline: none;
}
</style>

<template>
  <div class="suggestion">
    <h4>Tender ID: {{ suggestion.tender_id }}</h4>
    <h4>Status: {{ suggestion.status }}</h4>
    <h4 v-if="userData.userType == 'beekeeper' && farmersEmail">Farmer's Email: {{ farmersEmail }}</h4>

    <button v-if="userData.userType == 'beekeeper'" class="rm" @click="onDelete">X</button>
    <button v-if="userData.userType == 'farmer'" @click="onAdmit">Admit</button>
    <button v-if="userData.userType == 'farmer'" @click="onDeny">Deny</button>
  </div>
</template>

<script>
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/beekeepers_suggestions',
  withCredentials: true,
  timeout: 3000,
});

export default {
  props: ['suggestion', 'userData'],
  data() {
    return {
      farmersEmail: '',
    };
  },
  mounted() {
    if (this.suggestion.status == 'admited') {
      axios.get('/get_farmers_email_by_tender_id?tenderId=' + this.suggestion.tender_id).then((response) => {
        if (response.status == 200) {
          this.farmersEmail = response.data;
        }
      });
    }
  },
  methods: {
    onAdmit() {
      axios
        .patch('/admit', { suggestionId: this.suggestion.id })
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
    onDelete() {
      axios
        .delete('/delete?id=' + this.suggestion.id)
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
              console.log('forbidden: token doesnt exists or suggestion doesnt exists');
              break;
            case 501:
              console.log('server error');
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
.rm {
  background: white;
  border-radius: 50%;
  border: 0;
  top: -50px;
  left: 300px;
}
</style>

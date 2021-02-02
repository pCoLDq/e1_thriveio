<template>
  <div class="main">
    <div class="auth" v-if="!credentials">
      <router-link to="/signup"><p class="link">SignUp</p> </router-link>
      <br />
      <br />
      <router-link to="/signin"> <p class="link">SignIn</p> </router-link>
    </div>
    <div class="user-data" v-else>
      <p>Username: {{ userData.username }}</p>
      <p>Email: {{ userData.email }}</p>
      <p>Type: {{ userData.userType }}</p>
      <p v-if="userData.userType == 'beekeeper'">Num of hives: {{ userData.numOfHives }}</p>
    </div>

    <Board v-bind:tenders="tenders" v-bind:userData="userData" @send-offer="onSendOffer" />

    <div v-if="userData.userType == 'farmer'" class="functions-for-farmers">
      <router-link to="/addtender"> <p class="link">Add Tender</p> </router-link>
    </div>
    <p class="link logout-button" @click="onLogout" v-if="credentials">Logout</p>
  </div>
</template>

<script>
import Board from '@/components/Board';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  timeout: 3000,
});

export default {
  components: {
    Board,
  },
  data() {
    return {
      credentials: localStorage.credentials == 'true' ? true : false,
      userData: {
        id: '',
        username: '',
        email: '',
        userType: '',
        numOfHives: '',
      },
      tenders: [],
    };
  },
  created() {
    {
      // getting user data
      this.userData.id = '';
      this.userData.username = '';
      this.userData.email = '';
      this.userData.userType = '';
      this.userData.numOfHives = '';
      if (localStorage.credentials == 'true') {
        console.log('localStorage.credentials:', localStorage.credentials);
        axios
          .get('/auth/user_data')
          .then(response => {
            console.log('Home.vue: response', response);
            if (response.status == 200) {
              this.userData.id = response.data.id;
              this.userData.username = response.data.username;
              this.userData.email = response.data.email;
              this.userData.userType = response.data.userType;
              this.userData.numOfHives = response.data.numOfHives;
            }
          })
          .catch(error => {
            console.log('ErRoR', error);
            if (error.response.status == 404) {
              localStorage.credentials = false;
              location.reload();
            }
          });
      }
    }
    {
      // getting tenders
      this.tenders = [];
      axios
        .get('/tenders/get_all')
        .then(response => {
          console.log('Home.vue: response', response);
          if (response.status == 200) {
            this.tenders = response.data;
            console.log('this.tenders: ', this.tenders);
          }
        })
        .catch(error => {
          console.log('ErRoR', error);
          if (error.response.status == 404) {
            // doing something
            location.reload();
          }
        });
    }
  },
  methods: {
    onLogout() {
      axios
        .post('/auth/logout')
        .then(response => {
          console.log('onLogout() response: ', response);
          if (response.status == 200) {
            localStorage.credentials = false;
            location.reload();
          }
        })
        .catch(error => {
          console.log('ErRoR', error);
          if (error.response.status == 404) {
            localStorage.credentials = false;
            location.reload();
          }
        });
    },
    onSendOffer(tenderId) {
      // creating beekeeper_suggestion
      console.log(tenderId);
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
}
.auth {
  display: flex;
}
.functions-for-farmers {
  margin-left: auto;
  margin-right: 8%;
}
a {
  text-decoration: none;
}
.link {
  border: 1px solid #59a66b;
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
}
.link:hover {
  color: white;
  background-color: #59a66b;
}
.user-data {
  font-family: sans-serif;
  font-weight: 600;
  font-size: 17px;
  border: 1px solid #59a66b;
  background-color: #59a66b;
  padding: 20px;
  color: white;
  width: 230px;
  max-width: 400px;
  position: absolute;
}
.logout-button {
  position: absolute;
  top: 250px;
}
.logout-button {
  cursor: pointer;
}
</style>

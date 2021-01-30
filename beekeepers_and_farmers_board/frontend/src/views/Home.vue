<template>
  <div class="main">
    <div class="auth" v-if="!credentials">
        <router-link to="/signup" ><p class="link">SignUp</p> </router-link>
        <br/>
        <br/>
        <router-link to="/signin" > <p class="link">SignIn</p> </router-link>
    </div>
    <div class="user-data" v-else>
      <p>Username: {{ username }}</p>
      <p>Email: {{ email }}</p>
      <p>Type: {{ userType }}</p>
      <p v-if="userType == 'beekeeper'">Num of hives: {{ numOfHives }}</p>
      
    </div>

     <Board />
    
    <div v-if="userType == 'farmer'" class="functions-for-farmers">
      <router-link to="/addtender" > <p class="link">Add Tender</p> </router-link>
    </div>
    <p class="link logout-button"  @click="onLogout" v-if="credentials">Logout</p>
  </div>
</template>

<script>
import Board from '@/components/Board'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  timeout: 3000
});

export default {
  components: {
    Board,
  },
  data() {
    return {
      credentials: localStorage.credentials == 'true' ? true : false,
      username: '',
      email: '',
      userType: '',
      numOfHives: '',
    }
  },
  mounted() {
    if(localStorage.credentials == 'true') {
      console.log(localStorage.credentials);
      axios.get('/auth/user_data')
      .then((response) => {
        console.log('Home.vue: response', response);
        if(response.status == 200) {
          this.username = response.data.username,
          this.email = response.data.email,
          this.userType = response.data.userType,
          this.numOfHives = response.data.numOfHives
        }
      })
      .catch((error) => {
        console.log('ErRoR', error);
        if (error.response.status == 404) {
          localStorage.credentials = false;
          location.reload()
        }
      });
    }
  },
  methods: {
    onLogout() {
      axios.post('/auth/logout')
      .then((response) => {
        console.log('onLogout() response: ', response);
        if (response.status == 200) {
          localStorage.credentials = false;
          location.reload();
        }
      })
      .catch((error) => {
        console.log('ErRoR', error);
        if (error.response.status == 404) {
          localStorage.credentials = false;
          location.reload()
        }
      })
    }
  }
}
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
}
.logout-button {
  position: absolute;
  top: 250px;
  
}
.logout-button {
  cursor: pointer;
}
</style>
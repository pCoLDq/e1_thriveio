<template>
  <div class="main">
    <div class="auth" v-if="!authtoken">
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
    
    <div v-if="userType == 'beekeeper'" class="functions-for-beekeepers">
      <router-link to="/addtender" > <p class="link">Add Tender</p> </router-link>
    </div>
    <button @click="onLogout" v-if="authtoken"><p class="link button-cover">Logout</p> </button>
  </div>
</template>

<script>
import Board from '@/components/Board'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 3000
});

export default {
  components: {
    Board,
  },
  data() {
    return {
      authtoken: '',
      username: '',
      email: '',
      userType: '',
      numOfHives: '',
    }
  },
  mounted() {
    this.authtoken = localStorage.AuthToken
    console.log('mounted', this.authtoken)
  },
  watch: {
    authtoken(token) {

      axios.get('/auth/user_data', {
        headers: {
          'AuthToken': token
        }
      })
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
        this.serverMessage = 'Not found: token or user doesnt exists'
      });
    }
  },
  methods: {
    onLogout() {
      localStorage.AuthToken = '';
      location.reload();
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
.functions-for-beekeepers {
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
button {
  height: 60px;
  background-color: white;
  border: 0;
  position: absolute;
  top: 250px;
  
}
.button-cover {
  cursor: pointer;
}
</style>
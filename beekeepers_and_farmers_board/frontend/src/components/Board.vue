<template>
  <div class="board">
    <h3>TENDERS</h3>
    <Tender
      v-for="tender in tenders"
      :key="tender.id"
      v-bind:tender="tender"
      v-bind:userData="userData"
      @delete-tender="deleteFromBoard"
    />

    <p v-if="!tenders">no tender have been created yet</p>
  </div>
</template>

<script>
import Tender from '@/components/Tender';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  timeout: 3000,
});

export default {
  props: ['userData'],
  components: {
    Tender,
  },
  data() {
    return {
      tenders: [],
    };
  },
  mounted() {
    // getting tenders
    this.tenders = [];
    axios
      .get('/tenders/get_all')
      .then((response) => {
        console.log('Home.vue: response', response);
        if (response.status == 200) {
          this.tenders = response.data;
          console.log('this.tenders: ', this.tenders);
        }
      })
      .catch((error) => {
        console.log('ErRoR', error);
        if (error.response.status == 404) {
          // doing something
          location.reload();
        }
      });
  },
  methods: {
    deleteFromBoard(tenderId) {
      this.tenders = this.tenders.filter((tender) => {
        return tender.id != tenderId;
      });
    },
  },
};
</script>

<style scoped>
h3 {
  margin-left: 25%;
  color: #59a66b;
}
.board {
  display: block;
  position: fixed;
  width: 46%;
  height: 100%;
  left: 25%;
  background-color: #a8d6b3;
  overflow: scroll;
}
</style>

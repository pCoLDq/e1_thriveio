<template>
  <div class="suggestions-bb">
    <h3>SUGGESTIONS</h3>
    <Suggestion
      v-for="suggestion in suggestions"
      :key="suggestion.id"
      v-bind:suggestion="suggestion"
      v-bind:userData="userData"
      @delete-suggestion="deleteFromBoard"
    />
    <p v-if="!suggestions">no suggestions have been made yet</p>
  </div>
</template>

<script>
import Suggestion from '@/components/Suggestion';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  timeout: 3000,
});

export default {
  props: ['userData'],
  components: {
    Suggestion,
  },
  data() {
    return {
      suggestions: '',
    };
  },
  mounted() {
    axios
      .get('/beekeepers_suggestions/get/')
      .then((response) => {
        this.suggestions = response.data;
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            console.log('unauthorized or token doesnt exist');
            break;
          case 404:
            console.log('not suggestions found');
            break;
        }
      });
  },
  methods: {
    deleteFromBoard(suggestionId) {
      this.suggestions = this.suggestions.filter((suggestion) => {
        return suggestion.id != suggestionId;
      });
    },
  },
};
</script>

<style scoped>
h3 {
  color: #59a66b;
  margin-left: 20%;
}
.suggestions-bb {
  display: block;
  position: fixed;
  width: 20%;
  height: 90%;
  left: 75%;
  background-color: #a8d6b3;
  overflow: scroll;
  top: 10%;
}
</style>

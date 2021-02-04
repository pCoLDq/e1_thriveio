<template>
  <div class="tender-block">
    <h4 v-if="isUserOwner">YOU ARE OWNER:</h4>
    <h4>Farmer's username: {{ tender.farmerUsername }}</h4>
    <h4>
      Required num of hives:
      <span v-if="!editMode">
        {{ newReqNumOfHives }}
      </span>
      <span v-else>
        <input type="text" v-model="newReqNumOfHives" />
      </span>
    </h4>

    <h4>
      Salary:
      <span v-if="!editMode">
        {{ newSalary }}
      </span>
      <span v-else>
        <input type="text" v-model="newSalary" />
      </span>
    </h4>

    <button v-if="isUserOwner" class="rm" @click="onDeleteTender">&times;</button>
    <button v-if="isUserOwner && !editMode" type="submit" @click="editMode = true">Edit</button>
    <button v-if="isUserOwner && editMode" type="submit" @click="editMode = false">Save</button>
    <button v-if="userData.userType == 'beekeeper'" type="submit" @click="onOffer">Offer myself</button>
  </div>
</template>

<script>
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/tenders',
  withCredentials: true,
  timeout: 3000,
});
export default {
  props: ['tender', 'userData'],
  data() {
    return {
      isUserOwner: this.userData.id == this.tender.farmer_id,
      newReqNumOfHives: this.tender.required_num_of_hives,
      newSalary: this.tender.salary,
      editMode: false,
    };
  },
  watch: {
    editMode: function(value) {
      if (!value) {
        // if changes saved
        const fieldsToUpdate = {
          id: this.tender.id,
          requiredNumOfHives: this.newReqNumOfHives == this.tender.required_num_of_hives ? null : this.newReqNumOfHives,
          salary: this.newSalary == this.tender.salary ? null : this.newSalary,
        };
        if (!fieldsToUpdate.requiredNumOfHives && !fieldsToUpdate.salary) {
          // if any change wasnt detected
          return;
        }
        axios
          .patch('/update', fieldsToUpdate)
          .then((response) => {
            if (response.status == 200) {
              console.log('tender successfully updated');
            }
          })
          .catch((error) => {
            console.log('ErRoR', error);
            switch (error.response.status) {
              case 400:
                console.log('tender with this id doesnt exist');
                break;
              case 403:
                console.log('user doesnt have rights to tender');
                break;
            }
          });
      }
    },
  },
  methods: {
    onOffer() {
      // creating beekeeper_suggestion
    },
    onDeleteTender() {
      axios
        .delete('/delete?id=' + this.tender.id)
        .then((response) => {
          if (response.status == 200) {
            this.$emit('delete-tender', this.tender.id);
            console.log('tender successfully deleted');
          }
        })
        .catch((error) => {
          console.log('ErRoR', error);
          switch (error.response.status) {
            case 400:
              console.log('tender with this id doesnt exist');
              break;
            case 403:
              console.log('user doesnt have rights to tender');
              break;
          }
        });
    },
  },
};
</script>

<style scoped>
.tender-block {
  margin: 10px;
  width: 98%;
  height: 110px;
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
  left: 88%;
  top: -30%;
}
.rm {
  background: white;
  border-radius: 50%;
  border: 0;
  top: -85px;
  left: 800px;
}
button:focus {
  outline: none;
}
</style>

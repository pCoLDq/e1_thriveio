<template>
  <div class="tender-block">
    <h4 v-if="isUserOwner">YOU ARE OWNER:</h4>
    <h4>Farmer's username: {{ tender.farmerUsername }}</h4>
    <h4>Required num of hives: {{ tender.required_num_of_hives }}</h4>
    <h4>Salary: {{ tender.salary }}$</h4>

    <button v-if="isUserOwner" type="submit" @click="onEdit">Edit</button>
    <button v-if="userData.userType == 'beekeeper'" type="submit" @click="onOffer">Offer myself</button>
  </div>
</template>

<script>
export default {
  props: ['tender', 'userData'],
  data() {
    return {
      isUserOwner: this.userData.id == this.tender.farmer_id,
    };
  },
  methods: {
    onOffer() {
      this.$emit('send-offer', this.tender.id);
    },
    onEdit() {
      //do smething
    },
  },
};
</script>

<style scoped>
.tender-block {
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
  left: 88%;
  top: -30%;
}
</style>

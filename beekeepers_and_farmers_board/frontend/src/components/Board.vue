<template>
  <div class="board">
    <Tender
      v-for="tender in tenders"
      :key="tender.id"
      v-bind:tender="tender"
      v-bind:userData="userData"
      @send-offer="onSendOffer"
    />

    <p v-if="!tenders">no tender have been created yet</p>
  </div>
</template>

<script>
import Tender from '@/components/Tender';

export default {
  props: ['tenders', 'userData'],
  components: {
    Tender,
  },
  methods: {
    onSendOffer(tenderId) {
      this.$emit('send-offer', tenderId);
    },
  },
};
</script>

<style scoped>
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

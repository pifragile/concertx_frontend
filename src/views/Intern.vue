<template>
  <div id="home-view">
    <Concert
      v-for="(concert, index) in concerts"
      v-on:concertDeleted="removeConcert"
      :domId="index"
      :key="concert.id"
      :concert="concert"
      :userId="userId"></Concert>
  </div>
</template>

<script>
import Concert from '../components/Concert';
import concerts from '../api/concerts';
import auth from '../api/auth';

export default {
  name: 'home',
  components: {
    Concert,
  },
  data() {
    return {
      concerts: [],
      userId: null,
    };
  },
  async beforeCreate() {
    this.concerts = (await concerts.listConcerts())
      .data
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    this.userId = (await auth.getAccountDetails()).data.pk;
  },
  methods: {
    removeConcert(id) {
      this.concerts = this.concerts.filter(concert => concert.id !== id);
    },
  },
};
</script>

<style>
  #home-view {
    margin-top: 30px;
  }
</style>

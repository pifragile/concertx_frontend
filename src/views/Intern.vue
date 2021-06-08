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
  updated() {
    // can use anchor-<concert-id> to directly jump to the specified concert
    // this is done because anchors are not working on initial page load
    const section = window.location.hash.replace('#', '')
    console.log(this.$children)
    if (section) {
      const split = section.split('anchor-')
      if (split.length > 1) {
        const key = parseInt(split[1])
        let el = null
        for (let i = 0; i < this.$children.length; i++){
          const child = this.$children[i]
          console.log(child.$vnode.key)
          if (child.$vnode.key === key) {
            el = child.$el
            break
          }
        }

        if (el) {
          this.$nextTick(() => el.scrollIntoView())
        }
      }
    }
  },
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

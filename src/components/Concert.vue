<template lang ="pug">
  .concert-container.container(:class="{ confirmed }" :id="'c-' + domId")
    .inner.d-flex.justify-content-between.flex-wrap
      div
        h3
          input(size="25" v-model="location" @input="updateConcert" v-if="isOwner" type="text")
          span(v-else) {{location}}
      .inner.d-flex.justify-content-right.flex-wrap
        div
          .dateTimeInputContainer(v-if="isOwner")
            date-picker(v-model="date" :config="dateTimeOptions").marginTopBot
          p.dateTime(v-else) {{date}}
        div
          label.switch.marginTopBot
            input.success(type="checkbox" v-model="attending")
            span.slider.round
    .inner
      .marginTopBot(v-if="isOwner")
        span bestätigt&nbsp;
        span
          input(type="checkbox" id="checkbox" v-model="confirmed" v-on:change="updateConcert")
      .marginTopBot(v-else) organisiert vom {{owner.username}}
    .inner
      span zuegseit:&nbsp;&nbsp;&nbsp;
      span(
        v-for="(user, index) in acceptedBy"
        :key="'accepted-by-' + index"
        v-if="isNotSelf(user)") {{user.username}} &nbsp;&nbsp;&nbsp;
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import Moment from 'moment';
import '../assets/css/toggle.css';
import concerts from '../api/concerts';

export default {
  name: 'home',
  components: {
    datePicker,
  },
  props: {
    concert: Object,
    userId: Number,
    domId: Number,
  },
  data() {
    return {
      ...this.concert,
      acceptedBy: this.concert.accepted_by,
      date: new Moment(this.concert.date).format('DD/MM/YYYY HH:mm'),
      dateTimeOptions: {
        format: 'DD/MM/YYYY HH:mm',
        useCurrent: false,
      },
    };
  },
  computed: {
    isOwner() {
      return this.owner.id === this.userId;
    },
    attending: {
      get() {
        return this.acceptedBy.filter(user => user.id === this.userId).length > 0 ? 'on' : null;
      },
      async set(val) {
        const updatedConcert = val ?
          await concerts.accept(this.id) :
          await concerts.cancel(this.id);
        this.acceptedBy = updatedConcert.data.accepted_by;
      },
    },
  },
  watch: {
    date() {
      this.updateConcert();
    },
  },
  methods: {
    updateConcert() {
      const { location, date, owner, id, confirmed } = this;
      const dbDateString = new Moment(date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ssZ');
      concerts.modifyConcert(this.id, { location, date: dbDateString, owner, id, confirmed });
    },
    isNotSelf(user) {
      return user.id !== this.userId;
    },
  },
};
</script>

<style scoped>
  @media screen and (max-width: 768px) { .inner {flex-direction: column;} }
  .concert-container {
    border-radius: 5px;
    border: solid 1px;
    margin-bottom: 10px;
  }
  .dateTimeInputContainer {
    width: 154px;
    position: relative;
  }
  .dateTime{
    margin: 8px 16px 0px 13px;
  }
  .container {
    width: 800px;
    padding: 2px;
  }
  .marginLeft {
    margin-left: 30px;
  }
  .marginTopBot {
    margin: 3px 0 3px 0;
  }
  .confirmed {
    background-color: rgba(116, 255, 38, 0.25);
  }

  .green {
    background-color: #cc0000;
  }
  input[type="text"]
  {
    background: transparent;
    border: none;
  }
</style>

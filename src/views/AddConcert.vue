<template lang ="pug">
  .container.d-flex.justify-content-center
    form(@submit.prevent="addConcert")
      .form-group
        label ort
        div
          input(size="25" v-model="location" type="text")
      .form-group
        label datum und zit
        .dateTimeInputContainer
          date-picker(v-model="date" :config="dateTimeOptions").marginTopBot
      button(type="submit") Ok
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import Moment from 'moment/moment';
import concerts from '../api/concerts';
import config from '../../config';

export default {
  name: 'home',
  components: {
    datePicker,
  },
  data() {
    return {
      location: '',
      date: Moment().format('DD/MM/YYYY HH:mm'),
      dateTimeOptions: config.dateTimeOptions,
    };
  },
  methods: {
    async addConcert() {
      const { location, date } = this;
      const dbDateString = new Moment(date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ssZ');
      const response = await concerts.addConcert(location, dbDateString);
      if (response.status - 200 < 10) this.$router.push('/intern');
    },
  },
};
</script>

<style scoped>
  .dateTimeInputContainer {
    width: 154px;
    position: relative;
  }
  .container {
    width: 800px;
    padding: 2px;
    margin-top: 100px;
  }
  .marginTopBot {
    margin: 3px 0 3px 0;
  }
  @media screen and (max-width: 768px) {
    .container {width: 300px;}
  }
</style>

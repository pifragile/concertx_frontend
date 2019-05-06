<template lang ="pug">
  .container.d-flex.justify-content-center
    form(@submit.prevent="submit")
      .form-group
        label ort
        div
          input(size="25" v-model="location" type="text")
      .form-group
        label datum und zit
        .dateTimeInputContainer
          date-picker(v-model="date" :config="dateTimeOptions").marginTopBot
      button(@click="addConcert") Ok
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import Moment from 'moment/moment';
import concerts from '../api/concerts';

export default {
  name: 'home',
  components: {
    datePicker,
  },
  data() {
    return {
      location: '',
      date: Moment().format('DD/MM/YYYY HH:mm'),
      dateTimeOptions: {
        format: 'DD/MM/YYYY HH:mm',
        useCurrent: false,
      },
    };
  },
  methods: {
    async addConcert() {
      const { location, date } = this;
      const dbDateString = new Moment(date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ssZ');
      const response = await concerts.addConcert(location, dbDateString);
      if (response.status - 200 < 10) this.$router.push('/');
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

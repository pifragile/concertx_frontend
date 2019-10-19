<template lang ="pug">
  .concert-container.container(:class="{ confirmed }" :id="'c-' + domId")
    v-dialog
    .inner.d-flex.justify-content-between.flex-wrap
      div
        h3
          a.icono-cross.delete-icon(v-if="isOwnerAndCanChange" @click="deleteConcert")
          input.location-input(
            size="25"
            v-model="location"
            @input="updateConcert"
            v-if="isOwnerAndCanChange"
            type="text")
          span(v-else) {{location}}
      .inner.d-flex.justify-content-right.flex-wrap
        div
          .date-time-input-container(v-if="isOwnerAndCanChange")
            date-picker(v-model="date" :config="dateTimeOptions").margin-top-bot
          p.date-time(v-else) {{date}}

        .btn-group.btn-group-toggle.yes-no(role="group")
          button.btn.btn-outline-secondary(
            type="button"
            :class="{active: accepted}"
            @click="accept") JA
          button.btn.btn-outline-secondary(
            type="button"
            :class="{active: canceled}"
            @click="cancel") NEI
    .inner
      .margin-top-bot(v-if="isOwnerAndCanChange")
        span bestätigt&nbsp;
        span
          input(type="checkbox" id="checkbox" v-model="confirmed" v-on:change="updateConcert")
      .margin-top-bot(v-else) organisiert vom {{owner.username}}
    .inner(v-if="someAccepted")
      span.small-margin-right.text-bold zuegseit:
      span
        span.small-margin-right(
          v-for="(user, index) in acceptedBy"
          :key="'accepted-by-' + index") {{user.username}}
    .inner(v-if="someCanceled")
      span.small-margin-right.text-bold abgseit:
      span
        span.small-margin-right(
          v-for="(user, index) in canceledBy"
          :key="'canceled-by-' + index") {{user.username}}
  </template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import Moment from 'moment';
import '../assets/css/toggle.css';
import '../assets/css/icono.min.css';
import concerts from '../api/concerts';
import config from '../../config';

const DATE_FORMAT = 'DD/MM/YYYY HH:mm';

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
      canceledBy: this.concert.canceled_by,
      date: new Moment(this.concert.date).format(DATE_FORMAT),
      dateTimeOptions: {
        ...config.dateTimeOptions,
        widgetParent: `#c-${this.domId}`,
      },
    };
  },
  computed: {
    isOwnerAndCanChange() {
      const ONE_HOUR = 60 * 60 * 1000;
      return this.owner.id === this.userId &&
        Moment() - new Moment(this.date, DATE_FORMAT) < 12 * ONE_HOUR;
    },
    accepted() {
      return this.acceptedBy.filter(user => user.id === this.userId).length > 0;
    },
    canceled() {
      return this.canceledBy.filter(user => user.id === this.userId).length > 0;
    },
    someAccepted() {
      return this.acceptedBy.length > 0;
    },
    someCanceled() {
      return this.canceledBy.length > 0;
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
      const dbDateString = new Moment(date, DATE_FORMAT).format('YYYY-MM-DDTHH:mm:ssZ');
      concerts.modifyConcert(this.id, { location, date: dbDateString, owner, id, confirmed });
    },
    deleteConcert() {
      const self = this;
      this.$modal.show('dialog', {
        title: 'Achtung!',
        text: 'Wetsch wükki lösche?',
        buttons: [
          {
            title: 'ja',
            handler: async () => {
              try {
                const res = await concerts.deleteConcert(self.id);
                if (res.status - 200 < 10) this.$emit('concertDeleted', self.id);
              } catch (err) {
                this.$modal.hide('dialog');
              } finally {
                this.$modal.hide('dialog');
              }
            },
          },
          {
            title: 'nei',
          },
        ],
      });
    },
    isNotSelf(user) {
      return user.id !== this.userId;
    },
    async accept() {
      const {
        accepted_by: acceptedBy,
        canceled_by: canceledBy,
      } = (await concerts.accept(this.id)).data;
      this.updateAcceptedCanceled(acceptedBy, canceledBy);
    },
    async cancel() {
      const {
        accepted_by: acceptedBy,
        canceled_by: canceledBy,
      } = (await concerts.cancel(this.id)).data;
      this.updateAcceptedCanceled(acceptedBy, canceledBy);
    },
    updateAcceptedCanceled(acceptedBy, canceledBy) {
      this.acceptedBy = acceptedBy;
      this.canceledBy = canceledBy;
    },
  },
};
</script>

<style scoped>
  .text-bold{
    font-weight: 500;
  }
  .concert-container {
    position: relative;
    border-radius: 5px;
    border: solid 1px;
    margin-bottom: 10px;
  }
  .date-time-input-container {
    width: 154px;
    position: relative;
  }
  .date-time{
    margin: 8px 16px 4px 13px;
  }
  .container {
    width: 800px;
    padding: 2px;
  }
  .margin-top-bot {
    margin: 3px 0 3px 0;
  }
  .confirmed {
    background-color: rgba(116, 255, 38, 0.25);
  }
  .small-margin-right{
    margin-right: 20px;
  }
  input[type="text"]
  {
    background: transparent;
    border: none;
  }
  .btn:focus, .btn:active {
    outline: none !important;
    box-shadow: none !important;
  }
  .yes-no{
    width: 100px;
  }
  .delete-icon{
    margin-right: 15px;
    vertical-align:middle;
  }
  .location-input {
    vertical-align:middle;
  }
  @media screen and (max-width: 768px) {
    .inner {
      flex-direction: column;
      justify-content: center;
      display: flex;
      align-items: center;
    }
    .location-input {
      width: 300px;
      text-align: center;
    }
  }
  @media screen and (max-width: 600px){
    .container {width: 480px;}
  }
  @media screen and (max-width: 500px){
    .container {width: 310px;}
  }
</style>

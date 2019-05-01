<template>
  <div id="change-password-view">
    <h1>Passwort ändere</h1>
    <form @submit.prevent="submit">
      <input v-model="inputs.password" type="password" id="password" placeholder="password">
      <input
        v-model="inputs.password2"
        type="password" id="password2"
        placeholder="confirm password">
    </form>
    <button @click="changePassword(inputs)" id="change-password-button">
      passwort ändere
    </button>
    <p v-for="(error, index) in errors" v-bind:key="'error' + index">{{error}}</p>
  </div>
</template>

<script>
import auth from '../api/auth';

export default {
  data() {
    return {
      inputs: {
        password: '',
        password2: '',
      },
      errors: [],
    };
  },
  methods: {
    changePassword({ password, password2 }) {
      auth.changeAccountPassword(password, password2)
        .then(() => this.$router.push('/'))
        .catch((error) => {
          this.errors = error.response.data.new_password2;
        });
    },
  },
};
</script>

<style>
form input {
  display: block
}
</style>

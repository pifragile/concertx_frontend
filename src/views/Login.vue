<template>
  <div id="login-view" class="container d-flex flex-column justify-content-center">
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input v-model="inputs.username" type="text" id="username" placeholder="username">
      <input v-model="inputs.password" type="password" id="password" placeholder="password">
    </form>
    <button @click="login(inputs)" id="login-button">
      login
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login({ username, password }) {
      this.$store.dispatch('auth/login', { username, password })
        .then(() => this.$router.push('/'));
    },
  },
};
</script>

<style scoped>
form input {
  display: block
}
.container {
  width: 205px;
  margin-top: 100px;
}
</style>

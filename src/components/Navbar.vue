<template>
  <ul class="navbar" id="navbar">
    <li><span>sali {{username}}</span></li>
    <li><router-link to="/intern">home</router-link></li>
    <li><router-link to="/add_concert">neus konzert</router-link></li>
    <li><router-link to="/change_password">passwort ändere</router-link></li>
    <li><router-link to="/logout">logout</router-link></li>
    <li><span>beta v1.0</span></li>
  </ul>
</template>

<script>
import auth from '../api/auth'

export default {
  name: 'navbar',
  data() {
    return {
      username: '',
    }
  },
  async created() {
    this.username = (await auth.getAccountDetails()).data.username
  },
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  display: inline;
  float: right;
}

a, span {
  color: #1a1a1a;
  display: inline-block;
  text-align: center;
  padding: 6px 12px;
  text-decoration: none;
  font-size: 14px;
}

a:hover {
  color: #cc0000;
  text-decoration: none;
}
</style>

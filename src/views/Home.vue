<template>
  <div id="home-view" class="overlay">
    <div class="text">
      <h1>Mariachi de Jesús Guatemala</h1>
      <h4>Dini Partyband usem Herz vom Chreis 4</h4>
      <p>Für booking am loro alüüte!</p>
  </div>
  </div>
</template>

<script>
export default {
  name: 'lost',
};
</script>

<style scoped>
  #home-view{
    text-align: center;
  }
  .text {
    color: red;
    position: relative;
    font-weight: bold;
  }
  .overlay {
    padding-top: 100px;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-size:100% auto;
    background: url("../assets/stall6.jpg") no-repeat fixed;
    z-index: 10;
  }
  .overlay:before{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(200,200,200,0.8);
  }
  @media screen and (max-width: 500px) {
    .overlay {
      background-size:100% auto;
      background: url("../assets/stall6_schmal.jpg") no-repeat fixed;
    }
  }
</style>

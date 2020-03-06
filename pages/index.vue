<template>
  <v-layout class="bagon flex justify-center align-center">
    <div class="text-center white--text">
      <h1 class="display-4">Добро пожаловать!</h1>
      <p class="headline mt-6">
        Добавляйте свои и просматривайте приключения других людей
      </p>
      <v-btn
        to="/adventures"
        outlined
        x-large
        color="blue-grey lighten-5"
        class="mt-3 white--text"
        >Начать просмотр</v-btn
      >
    </div>
  </v-layout>
</template>

<script>
export default {
  layout: "clearLayout"
};
</script>

<style>
.bagon {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../static/background.jpg");
  background-size: cover;
}
</style>

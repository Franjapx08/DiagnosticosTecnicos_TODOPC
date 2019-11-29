<template>
  <v-app id="app">
    <CoreAppBar />
    <core-view />
  </v-app>
</template>

<script>
export default {
  components: {
    CoreView: () => import("@/components/core/View"),
    CoreAppBar: () => import("@/components/core/NavBar")
  }
};
</script>


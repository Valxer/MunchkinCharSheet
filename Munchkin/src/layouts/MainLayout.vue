<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="isHome">
      <q-toolbar>
        <q-toolbar-title class="title q-my-md">
          Munchkin Character Sheet
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  computed: {
    isHome() {
      return this.$route.name == 'home'
    }
  }
})
</script>

<style lang="scss" scoped>
  .title {
    color: secondary;
    text-align: center;
  }
</style>

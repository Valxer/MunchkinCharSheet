<template>
  <div class="fullscreen bg-primary text-secondary text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 20vh">
        Fight
      </div>

      <q-btn
        class="q-mt-xl"
        color="secondary"
        text-color="primary"
        to="/"
        label="Retour aux personnages"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'fight'
})
</script>

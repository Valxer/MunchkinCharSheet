<template>
  <q-page class="fight flex flex-center page-container fight">
    <div>
      <fightCard v-if="idFetched" :key="id" v-bind:char="char" />
      <q-btn
        class="q-mt-xl"
        color="secondary"
        text-color="primary"
        to="/"
        label="Annuler le Combat"
        no-caps
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import fightCard from "../components/Fightcard.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "fight",
  components: {
    fightCard,
  },
  data() {
    return {
      id: "",
      char: "",
      lvlUp: [],
      idFetched: false,
    };
  },
  computed: {
    ...mapState("chars", ["chars"]),
  },
  mounted() {
    const url = window.location.pathname;
    this.id = parseInt(url.substring(url.lastIndexOf("/") + 1), 10);
    this.lvlUp.push(this.id);
    for (let i = 0; i < this.chars.length; i++) {
      if (this.chars[i].id == this.id) {
        console.log(this.chars[i]);
        this.char = this.chars[i];
      }
    }
    this.idFetched = true;
  },
});
</script>

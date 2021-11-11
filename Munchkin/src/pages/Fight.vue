<template>
  <q-page class="fight flex flex-center page-container">
    <div class="fighters versus-box">
      <fightCard
        v-if="idFetched"
        :key="id"
        v-bind:char="char"
        class="fighter" />  
    </div>
    <div class="monsters versus-box">
      <ul class="monster">
        <li>dsq</li>
        <li>sss</li>
        <li>qsqq</li>
      </ul>
    </div>
    <q-page-sticky position="bottom-left" :offset="[30,30]">
        <q-btn
          class="q-mt-xl"
          color="secondary"
          text-color="primary"
          to="/"
          label="Annuler"
          no-caps
        />
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[30,30]">
        <q-btn
          class="q-mt-xl"
          color="secondary"
          text-color="primary"
          to="/"
          label="Valider"
          no-caps
        />
      </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import fightCard from "../components/Fightcard.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "fight",
  data() {
    return {
    }
  },
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

<style lang="scss" scoped>
  .fight {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .monster {
    background-color: $accent;
  }
</style>

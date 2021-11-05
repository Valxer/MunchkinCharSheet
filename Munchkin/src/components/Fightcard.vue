<template>
  <q-card flat bordered class="bg-accent">
    <q-card-section class="char-box">
      <!-- name, races and classes of character -->
      <div class="row items-center no-wrap char-name">
        <div class="col">
          <div class="text-h4 name-box">
            {{ char.name }}
            <q-icon class="text-h5 q-ml-sm" v-if="!char.sex" name="male" />
            <q-icon class="text-h5 q-ml-sm" v-else name="female" />
          </div>
          <div class="text-subtitle2 q-my-sm">
            <div class="race-block">
              <span>
                {{ char.race }}
              </span>
              <span v-if="char.race2 != 'Aucune'"> /{{ char.race2 }} </span>
            </div>
            <div class="job-block q-mb-sm">
              <span v-if="char.job != 'Aucune'">
                {{ char.job }}
              </span>
              <span v-if="char.job2 != 'Aucune'"> /{{ char.job2 }} </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Adding lvl and bonuses to asses power -->
      <div class="power-box text-h6">PUISSANCE : {{ char.power }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "charCard",
  props: {
    char: Object,
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.my-card {
  margin: 15px;
  @media (max-width: $breakpoint-xs-max) {
    max-width: 365px;
    min-width: 250px;
  }
}
.menu-icon {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  &:hover {
    border-radius: 50px;
    background-color: darken($color: $accent, $amount: 5);
  }
}
.char-box {
  padding-bottom: 5px;
}
.char-name {
  height: 100px;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
.name-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.power-box {
  width: 250px;
  margin: 15px auto;
  margin-bottom: 0px;
}
</style>

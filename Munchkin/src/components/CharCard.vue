<template>
  <q-card flat bordered class="my-card bg-accent">
    <div class="menu-icon">
      <q-btn color="primary" round flat icon="eva-edit-outline">
        <q-menu cover auto-close>
          <q-list>
            <q-item clickable @click="deleteChar(char.id)">
              <q-item-section>Supprimmer personnage</q-item-section>
            </q-item>
            <q-item clickable @click="edRaces(char.id, char.race, char.race2)">
              <q-item-section>Modifier races</q-item-section>
            </q-item>
            <q-item clickable @click="edJobs(char.id, char.job, char.job2)">
              <q-item-section>Modifier classes</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <!-- Modal form to edit races-->
    <q-dialog v-model="edRace" persistent class="dialog-container">
      <q-card class="dialog-box">
        <q-btn
          class="close-btn"
          v-close-popup
          text-color="dark"
          flat
          icon-right="eva-close-outline"
        />
        <q-card-section class="column items-center q-mt-sm">
          <q-avatar
            icon="eva-edit-outline"
            color="primary"
            text-color="accent"
          />
          <q-select
            class="q-my-md formField"
            standout="bg-accent text-secondary"
            v-model="race"
            :options="races"
            label="Race"
          />
          <q-select
            class="q-mb-md formField"
            standout="bg-accent text-secondary"
            v-model="race2"
            :options="races2"
            label="Seconde race"
          />
        </q-card-section>
        <div v-if="edRaceError" class="error-msg">
          Informations incorrectes :<br />
          Les deux races doivent être différentes<br />
        </div>
        <q-card-actions align="center" class="q-mb-md">
          <q-btn
            flat
            label="Confirmer"
            color="primary"
            @click="editRaces(id)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal form to edit jobs-->
    <q-dialog v-model="edJob" persistent class="dialog-container">
      <q-card class="dialog-box">
        <q-btn
          class="close-btn"
          v-close-popup
          text-color="dark"
          flat
          icon-right="eva-close-outline"
        />
        <q-card-section class="column items-center q-mt-sm">
          <q-avatar
            icon="eva-edit-outline"
            color="primary"
            text-color="accent"
          />
          <q-select
            class="q-my-md formField"
            standout="bg-accent text-secondary"
            v-model="job"
            :options="jobs"
            label="Classe"
          />
          <q-select
            class="q-mb-md formField"
            standout="bg-accent text-secondary"
            v-model="job2"
            :options="jobs"
            label="Seconde classe"
          />
        </q-card-section>
        <div v-if="edJobError" class="error-msg">
          Informations incorrectes :<br />
          Les deux classes doivent être différentes<br />
          La deuxième classe ne peut pas exister sans première classe
        </div>
        <q-card-actions align="center" class="q-mb-md">
          <q-btn flat label="Confirmer" color="primary" @click="editJobs(id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Character description section -->
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

      <!-- Level box -->
      <div class="stat-section">
        <div class="box1">
          <div class="text-subtitle2">Niveau</div>
          <q-btn-group class="stat-box bg-secondary">
            <q-btn
              icon="eva-minus-outline"
              color="primary"
              @click="subLvl(char.id)"
            />
            <span class="text-h6">
              {{ char.lvl }}
            </span>
            <q-btn
              icon="eva-plus-outline"
              color="primary"
              @click="addLvl(char.id)"
            />
          </q-btn-group>
        </div>

        <!-- Bonus box -->
        <div>
          <div class="text-subtitle2">Bonus</div>
          <q-btn-group class="stat-box bg-secondary">
            <q-btn
              icon="eva-minus-outline"
              color="primary"
              @click="subBonus(char.id)"
            />
            <span class="text-h6">
              {{ char.bonus }}
            </span>
            <q-btn
              icon="eva-plus-outline"
              color="primary"
              @click="addBonus(char.id)"
            />
          </q-btn-group>
        </div>
      </div>

      <!-- Adding lvl and bonuses to asses power -->
      <div class="power-box text-h6">PUISSANCE : {{ char.power }}</div>
    </q-card-section>

    <!-- Fight button -->
    <q-card-actions>
      <q-btn
        @click="goToFight(char.id)"
        class="fight-btn"
        color="primary"
        icon-right="mdi-sword-cross"
        label="Combat"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "charCard",
  props: {
    char: Object,
  },
  data() {
    return {
      edJob: ref(false),
      edJobError: false,
      edRace: ref(false),
      edRaceError: false,
      id: "",
      name: "",
      race: "Humain",
      race2: "Aucune",
      job: "Aucune",
      job2: "Aucune",
      races: ["Humain", "Elfe", "Nain", "Halfelin", "Orc"],
      races2: ["Aucune", "Humain", "Elfe", "Nain", "Halfelin", "Orc"],
      jobs: ["Aucune", "Guerrier", "Magicien", "Prêtre", "Voleur"],
    };
  },
  methods: {
    ...mapActions("chars", [
      "addChar",
      "clearState",
      "charDel",
      "racesEd",
      "jobsEd",
      "addLvl",
      "subLvl",
      "addBonus",
      "subBonus",
    ]),
    resetValues() {
      this.id = "";
      this.name = "";
      this.sex = false;
      this.race = "Humain";
      this.race2 = "Aucune";
      this.job = "Aucune";
      this.job2 = "Aucune";
      this.creationError = false;
      this.edRaceError = false;
      this.edJobError = false;
    },
    editRaces(id) {
      if (this.race != this.race2) {
        const updatedRaces = {};
        updatedRaces.id = id;
        updatedRaces.race = this.race;
        updatedRaces.race2 = this.race2;
        this.racesEd(updatedRaces);
        this.resetValues();
        this.edRace = false;
      } else {
        this.edRaceError = true;
      }
    },
    editJobs(id) {
      if (
        (this.job != this.job2 && this.job != "Aucune") ||
        this.job2 == "Aucune"
      ) {
        const updatedJobs = {};
        updatedJobs.id = id;
        updatedJobs.job = this.job;
        updatedJobs.job2 = this.job2;
        this.jobsEd(updatedJobs);
        this.resetValues();
        this.edJob = false;
      } else {
        this.edJobError = true;
      }
    },
    deleteChar(id) {
      this.charDel(id);
    },
    edJobs(id, job, job2) {
      this.id = id;
      this.job = job;
      this.job2 = job2;
      this.edJob = true;
    },
    edRaces(id, race, race2) {
      this.id = id;
      this.race = race;
      this.race2 = race2;
      this.edRace = true;
    },
    goToFight(id) {
      this.$router.push({
        name: "fight",
        params: {
          id: id,
        },
      });
    },
  },
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
.stat-section {
  display: flex;
  @media (max-width: $breakpoint-xs-max) {
    display: block;
  }
}
.stat-box {
  width: 168px;
  span {
    margin: auto auto;
  }
}
.box1 {
  @media (min-width: $breakpoint-xs-max) {
    margin-right: 15px;
  }
  @media (max-width: $breakpoint-xs-max) {
    margin-bottom: 15px;
  }
}
.power-box {
  margin: 15px auto;
  margin-bottom: 0px;
}
.fight-btn {
  margin: 0 auto;
}
.dialog-container {
  width: 80%;
}
.dialog-box {
  width: 100%;
}
.dialog-title {
  color: $primary;
  font-size: 2rem;
  margin-top: 20px;
  margin-bottom: 0px;
}
.error-msg {
  color: red;
  text-align: center;
}
.formField {
  width: 70%;
}
.validate-btn {
  width: 100px;
}
</style>

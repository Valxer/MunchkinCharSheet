<template>
  <q-page class="flex flex-center page-container">

    <!-- Phrase when no character is created -->
    <div v-if="!chars.length" class="background-txt">
      Ajoutez un joueur pour commencer
    </div>

    <!-- Cards display section with level sorting-->
    <div v-else-if="sort == true" class="cards-container">
      <charCard
        v-for="char in lvlSortedChars"    
        :key="char.id"
        v-bind:char= "char"/>
    </div>

    <!-- Cards display section with power sorting-->
    <div v-else-if="sort == false" class="cards-container">
      <charCard
        v-for="char in powerSortedChars"    
        :key="char.id"
        v-bind:char= "char"/>
    </div>

    <!-- Cards display section without sorting-->
    <div v-else class="cards-container">
      <charCard
        v-for="char in chars"    
        :key="char.id"
        v-bind:char= "char"/>
    </div>

    <!-- Sort button -->
    <q-page-sticky
      v-if="chars.length"
      position="top-right"
      :offset="[18,18]" >
      <div class="sort-sticky">
        <div class="col">
          Trier par : <strong>{{ sortOption }}</strong>
        </div>
        <q-toggle
          toggle-indeterminate
          v-model="sort"
          @click="setSortOption()"/>
      </div>
    </q-page-sticky>

    <!-- Reset button -->
    <q-page-sticky
      v-if="chars.length"
      position="bottom-left"
      :offset="[18,18]">
      <q-btn
        class="text-bold reset-btn"
        text-color="secondary"
        color="primary"
        icon-right="mdi-skull-outline"
        label="Reset"
        @click="reset = true"
      />
      <q-dialog v-model="reset" persistent>
        <q-card>
          <q-card-section class="column items-center">
            <q-avatar
              icon="mdi-skull-outline"
              color="primary"
              text-color="accent" />
            <span class="q-mt-md q-ml-sm">
              Êtes-vous sûr de vouloir tuer tous les personnages créés ?
              <br/>
              Pas de retour possible...
            </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Annuler"
              color="primary"
              v-close-popup />
            <q-btn
              flat
              label="Confirmer"
              color="primary"
              @click="resetState" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-sticky>

    <!-- Add char button -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          fab
          class="phone-only"
          icon="eva-plus-outline"
          color="primary"
          text-color="secondary"
          @click="create = true"
        />
        <q-btn
          class="desktop-only text-bold create-btn"
          text-color="secondary"
          color="primary"
          icon-right="eva-plus-outline"
          label="Créer un joueur"
          @click="create = true"
        />
    </q-page-sticky>

    <!-- Modal Form to create a new char -->
    <q-dialog class="dialog-container" v-model="create" persistent>
        <q-card class="bg-secondary dialog-box">
          <q-btn
              class="close-btn"
              v-close-popup
              text-color="dark"
              flat
              icon-right="eva-close-outline"
          />
          <q-card-section class="column items-center">
            <q-input
              class="q-mt-xl formField"
              standout="bg-accent text-secondary"
              v-model="name"
              label="Nom"
              :rules="[val => !!val || 'Field is required']"
              clearable />
            <q-toggle
              v-model="sex"
              size="5rem"
              checked-icon="female"
              color="accent"
              unchecked-icon="male"
            />
            <q-select
              class="q-mb-md formField"
              standout="bg-accent text-secondary"
              v-model="race"
              :options="races"
              label="Race" />
            <q-select
              class="q-mb-md formField"
              standout="bg-accent text-secondary"
              v-model="race2"
              :options="races2"
              label="Seconde race" />
            <q-select
              class="q-mb-md formField"
              standout="bg-accent text-secondary"
              v-model="job"
              :options="jobs"
              label="Classe" />
            <q-select
              class="formField"
              standout="bg-accent text-secondary"
              v-model="job2"
              :options="jobs"
              label="Seconde classe" />
          </q-card-section>
          <div v-if="creationError" class="error-msg">
            Informations incorrectes :<br/>
            Nom obligatoire : max 10 caractères<br/>
            Les deux races doivent être différentes<br/>
            Les deux classes doivent être différentes<br/>
            La deuxième classe ne peut pas exister sans première classe
          </div>
          <q-card-actions align="center">
            <q-btn
              class="q-mb-md bg-accent validate-btn"
              flat
              label="Valider"
              color="primary"
              @click="createUser" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import charCard from '../components/CharCard.vue'

export default defineComponent({
  name: 'home',
  components: {
    charCard
  },
  data() {
    return {
      creationError: false,
      create: ref(false),
      reset: ref(false),
      sort: ref(null),
      sortOption:'Ordre de création',
      //form storage
      sex: ref(false),
      id: '',
      name: '',
      race:'Humain',
      race2: 'Aucune',
      job:'Aucune',
      job2: 'Aucune',
      races: [
        'Humain',
        'Elfe',
        'Nain',
        'Halfelin',
        'Orc'
      ],
      races2: [
        'Aucune',
        'Humain',
        'Elfe',
        'Nain',
        'Halfelin',
        'Orc'
      ],
      jobs: [
        'Aucune',
        'Guerrier',
        'Magicien',
        'Prêtre',
        'Voleur'
      ],
      // provisionnal char sheet
      character: {
          name: 'Valxer',
          race: 'Elfe',
          race2: 'Orc',
          job: 'Voleur',
          job2: 'Guerrier',
          sex: 'Homme',
          lvl: 1,
          bonus: 2
      }
    }
  },
  computed: {
    ...mapState('chars', ['chars']),
    ...mapGetters('chars', ['lvlSortedChars', 'powerSortedChars'])
  },
  methods: {
    ...mapActions('chars', ['addChar', 'clearState']),
    setSortOption() {
      if (this.sort == true)
        this.sortOption = 'Niveau'
      else if (this.sort  == false)
        this.sortOption = 'Puissance'
      else
        this.sortOption = "Ordre de création"
    },
    resetValues() {
      this.id = ''
      this.name = ''
      this.sex = false
      this.race = 'Humain'
      this.race2 = 'Aucune'
      this.job = 'Aucune'
      this.job2 = 'Aucune'
      this.creationError = false
      this.edRaceError = false
      this.edJobError = false
    },
    createUser() {
      if ((this.name && this.name.length < 11)
          && (this.race != this.race2) 
          && ((this.job != this.job2)
              && this.job != 'Aucune'
              || this.job2 == 'Aucune')) {
        const newChar = {}
        newChar.name = this.name.toUpperCase()
        newChar.sex = this.sex
        newChar.race = this.race
        newChar.race2 = this.race2
        newChar.job = this.job
        newChar.job2 = this.job2
        newChar.lvl = 1
        newChar.bonus = 0
        newChar.power = 1
        this.addChar(newChar)
        this.resetValues()
        this.create = false
      }
      else {
        this.creationError = true
      }
    },
    resetState() {
      this.clearState()
      this.reset = false
    }
  }
})
</script>

<style lang="scss" scoped>
  .background-txt {
    font-size: 2rem;
    color: $primary;
  }
  .cards-container {
    margin-top: 25px;
    margin-bottom: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .sort-sticky {
    display: flex;
    align-items: center;
  }
  .create-btn {
    height: 45px;
    display: flex;
    align-items: center;
  }
  .close-btn {
    position: absolute;
    z-index: 1;
    right: 0;
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
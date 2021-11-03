<template>
  <q-page class="flex flex-center page-container">
    <div v-if="!chars.length" class="background-txt">
      Ajoutez un joueur pour commencer
    </div>

    <div v-else class="cards-container">
      <q-card
        v-for="char in chars"
        :key="char.id"
        flat
        bordered
        class="my-card bg-accent"
      >
        <div class="menu-icon">
          <q-btn color="dark" round flat icon="eva-edit-outline">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable @click="deleteChar(char.id)">
                  <q-item-section>Supprimmer personnage</q-item-section>
                </q-item>
                <q-item clickable @click="edRace = true">
                  <q-item-section>Modifier races</q-item-section>
                </q-item>
                <q-item clickable @click="edJob = true">
                  <q-item-section>Modifier classes</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <q-card-section class="char-box">
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h4">
                {{char.name}}
                <q-icon v-if="!char.sex" name="male"/>
                <q-icon v-else name="female"/>
              </div>
              <div class="text-subtitle2 q-mb-sm">
                <span>{{char.race}}</span>
                <span v-if="char.race2 != 'Aucune'">/{{char.race2}}</span>
                <span v-if="char.job != 'Aucune'" class="q-ml-xl">{{char.job}}</span>
                <span v-if="char.job2 != 'Aucune'">/{{char.job2}}</span>
              </div>
            </div>
          </div>
          <div class="stat-section">
            <div class="box1">
              <div class="text-subtitle2">Niveau</div>
              <q-btn-group class="stat-box bg-secondary">
                <q-btn icon="eva-minus-outline" color="primary"/>
                <span>{{char.lvl}}</span>
                <q-btn icon="eva-plus-outline" color="primary"/>
              </q-btn-group>
            </div>
            <div>
              <div class="text-subtitle2">Bonus</div>
              <q-btn-group class="stat-box bg-secondary">
                <q-btn icon="eva-minus-outline" color="primary"/>
                <span>{{char.bonus}}</span>
                <q-btn icon="eva-plus-outline" color="primary"/>
              </q-btn-group>
            </div>
          </div>
          <div class="power-box text-h6">PUISSANCE : {{char.bonus + char.lvl}}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn class="fight-btn" color="primary" icon-right="mdi-sword-cross" label="Combat" />
        </q-card-actions>
      </q-card>
    </div>

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
            <q-avatar icon="mdi-skull-outline" color="primary" text-color="accent" />
            <span class="q-mt-md q-ml-sm">Êtes-vous sûr de vouloir tuer tous les personnages créés ?<br/>Pas de retour possible...</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Annuler" color="primary" v-close-popup />
            <q-btn flat label="Confirmer" color="primary" @click="resetState"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-sticky>

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
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { mapActions, mapState } from 'vuex'

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      creationError: false,
      create: ref(false),
      reset: ref(false),
      delChar: ref(false),
      edRace: ref(false),
      edJob: ref(false),
      //form storage
      sex: ref(false),
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
    ...mapState('chars', ['chars'])
  },
  methods: {
    ...mapActions('chars', ['addChar', 'clearState', 'charDel']),
    resetValues() {
      this.name = ''
      this.sex = false
      this.race = 'Humain'
      this.race2 = 'Aucune'
      this.job = 'Aucune'
      this.job2 = 'Aucune'
    },
    createUser() {
      if ((this.name && this.name.length < 11) && (this.race != this.race2) && ((this.job != this.job2) && this.job != 'Aucune' || this.job2 == 'Aucune')) {
        const newChar = {}
        newChar.name = this.name.toUpperCase()
        newChar.sex = this.sex
        newChar.race = this.race
        newChar.race2 = this.race2
        newChar.job = this.job
        newChar.job2 = this.job2
        newChar.lvl = 1
        newChar.bonus = 0
        console.log('User :', newChar)
        this.addChar(newChar)
        this.resetValues()
        this.create = false

      }
      else {
        this.creationError = true
      }
    },
    deleteChar(id) {
      this.charDel(id)
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .my-card{
    margin: 15px;
    @media (max-width: $breakpoint-xs-max){
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
  .stat-section {
    display: flex;
    @media (max-width: $breakpoint-xs-max){
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
    @media (max-width: $breakpoint-xs-max){
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
  .create-btn {
    height: 45px;
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
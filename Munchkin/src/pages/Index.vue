<template>
  <q-page class="flex flex-center page-container">
    <div v-if="isEmpty" class="background-txt">
      Ajoutez un joueur pour commencer
    </div>

    <q-card v-else flat bordered class="my-card bg-accent">
      <q-card-section class="char-box">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h4">
              {{characters.name}}
              <q-icon v-if="characters.sex == 'Homme'" name="male"/>
              <q-icon v-else name="female"/>
            </div>
            <div class="text-subtitle2 q-mb-sm">
              <span>{{characters.race}}</span>
              <span v-if="characters.race2 != 'Aucune'">/{{characters.race2}}</span>
              <span class="q-ml-xl">{{characters.job}}</span>
              <span v-if="characters.job2 != 'Aucune'">/{{characters.job2}}</span>
            </div>
          </div>
        </div>
        <div class="stat-section">
          <div class="box1">
            <div class="text-subtitle2">Niveau</div>
            <q-btn-group class="stat-box bg-secondary">
              <q-btn icon="eva-minus-outline" color="primary"/>
              <span>{{characters.lvl}}</span>
              <q-btn icon="eva-plus-outline" color="primary"/>
            </q-btn-group>
          </div>
          <div>
            <div class="text-subtitle2">Bonus</div>
            <q-btn-group class="stat-box bg-secondary">
              <q-btn icon="eva-minus-outline" color="primary"/>
              <span>{{characters.bonus}}</span>
              <q-btn icon="eva-plus-outline" color="primary"/>
            </q-btn-group>
          </div>
        </div>
        <div class="power-box text-h6">PUISSANCE : {{characters.bonus + characters.lvl}}</div>
      </q-card-section>

      <q-card-actions>
        <q-btn class="fight-btn" color="primary" icon-right="mdi-sword-cross" label="Combat" />
      </q-card-actions>
    </q-card>

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
              :options="races"
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

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      isEmpty: false,
      create: ref(false),
      sex: ref(false),
      name: '',
      race:'Humain',
      race2: 'Acune',
      job:'Aucune',
      job2: 'Aucune',
      races: [
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
      characters: {
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
  }
})
</script>

<style lang="scss" scoped>
  .background-txt {
    font-size: 2rem;
    color: $primary;
  }
  .my-card{
    @media (max-width: $breakpoint-xs-max){
        max-width: 365px;
        min-width: 250px;
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
  .formField {
    width: 70%;
  }
  .validate-btn {
    width: 100px;
  }
</style>
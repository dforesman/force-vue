<template>
  <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
    <mdl-button class="randPlanetBtn" v-mdl-ripple-effect colored icon raised v-on:click="fetchRandomPlanet">
      <i class="material-icons">public</i> Random planet
    </mdl-button>
    <mdl-textfield data-qa="nameTextbox" floating-label="Name" :value.sync="planetData.name"></mdl-textfield>
    <mdl-textfield data-qa="rotationPeriodTextbox" floating-label="Rotation Period" :value.sync="planetData.rotation_period"></mdl-textfield>
    <mdl-textfield data-qa="orbitalPeriodTextbox" floating-label="Orbital Period" :value.sync="planetData.orbital_period"></mdl-textfield>
    <mdl-textfield data-qa="diameterTextbox" floating-label="Diameter" :value.sync="planetData.diameter"></mdl-textfield>
    <mdl-textfield data-qa="climateTextbox" floating-label="Climate" :value.sync="planetData.climate"></mdl-textfield>
    <mdl-textfield data-qa="gravityTextbox" floating-label="Gravity" :value.sync="planetData.gravity"></mdl-textfield>
    <mdl-textfield data-qa="terrainTextbox" floating-label="Terrain" :value.sync="planetData.terrain"></mdl-textfield>
    <mdl-textfield data-qa="surfaceWaterTextbox" floating-label="Surface Water" :value.sync="planetData.surface_water"></mdl-textfield>
    <mdl-textfield data-qa="populationTextbox" floating-label="Population" :value.sync="planetData.population"></mdl-textfield>
  </div>
  <div class="mdl-cell mdl-card mdl-shadow--4dp">
    <figure class="mdl-card__media">
      <div v-show="loading" class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
      <img v-show="imageShow" :src.sync="planetImage">
      <span>{{planetImageMsg}}</span>
    </figure>
  </div>
</template>

<script>
import { MdlButton, MdlTextfield, directives } from 'vue-mdl';
import planet from '../api/planet';

export default {
  components: {
    MdlButton,
    MdlTextfield,
  },
  directives,
  data() {
    return {
      planetData: {
        name: '',
        rotation_period: '',
        orbital_period: '',
        diameter: '',
        climate: '',
        gravity: '',
        terrain: '',
        surface_water: '',
        population: '',
      },
      planetImage: '',
      planetImageMsg: '',
      imageShow: false,
      loading: false,
    };
  },
  methods: {
    fetchRandomPlanet() {
      this.loading = true;
      this.imageShow = false;
      this.planetImageMsg = '';
      this.planetImage = '';
      const randomPlanetId = Math.floor((Math.random() * 61) + 1);
      planet.fetch(randomPlanetId).then((planetData) => {
        this.planetData = Object.assign(this.planetData, planetData);
        planet.getPicture(this.planetData.name).then((data) => {
          this.loading = false;
          if (data) {
            this.planetImage = data;
            this.imageShow = true;
          } else {
            this.planetImage = '';
            this.planetImageMsg = 'No image found.';
          }
        });
      });
    },
  },
};
</script>


<style scoped>
h1 {
  color: black;
}
figure img {
  width: 285px;
}
.mdl-card__media {
  background-color: #FFF;
}
</style>
<template>
  <div class="posters h-100">
    <div class="d-flex flex-column h-100">
      <navbar></navbar>
      <!-- header -->
      <header class="masthead">
        <div class="container masthead-title">
          <h1 class="text-uppercase mb-0">CCA 2019 Posters!</h1>
        </div>
      </header>
      <div class="container poster-grid">
        <div class="grid">
          <div v-masonry transition-duration="1.5s" fit-width="true" style="margin: 0 auto;" item-selector=".item">
            <div v-masonry-tile class="item" v-for="item in items" :key="item.name">
              <img class="poster-image" :src="item.path" />
            </div>
          </div>
        </div>
      </div>
      <copyright></copyright>
    </div>
  </div>
</template>

<style>
@import url("../assets/style.css");
</style>

<script>
import navbar from "../components/navbar";
import copyright from "../components/footer";

export default {
  components: {
    navbar,
    copyright
  },
  data() {
    return {
      items: [
        {
          name: "akido",
          path: require("@/assets/posters/akido.png")
        },
        {
          name: "anglerpg1",
          path: require("@/assets/posters/anglerpg1.png")
        },
        {
          name: "anglerpg2",
          path: require("@/assets/posters/anglerpg2.png")
        },
        {
          name: "cheerleadpg1",
          path: require("@/assets/posters/cheerleadpg1.png")
        },
        {
          name: "cheerleadpg2",
          path: require("@/assets/posters/cheerleadpg2.png")
        },
        {
          name: "chinesesocietypg1",
          path: require("@/assets/posters/chinesesocietypg1.png")
        },
        {
          name: "chinesesocietypg2",
          path: require("@/assets/posters/chinesesocietypg2.png")
        },
        {
          name: "judo",
          path: require("@/assets/posters/judo.png")
        },
        {
          name: "koreancultural",
          path: require("@/assets/posters/koreancultural.png")
        },
        {
          name: "motoring",
          path: require("@/assets/posters/motoring.png")
        },
        {
          name: "nanyangartemsemblepg1",
          path: require("@/assets/posters/nanyangartemsemblepg1.png")
        },
        {
          name: "nanyangartemsemblepg2",
          path: require("@/assets/posters/nanyangartemsemblepg2.png")
        },
        {
          name: "ntuarcherypg1",
          path: require("@/assets/posters/ntuarcherypg1.png")
        },
        {
          name: "ntuarcherypg2",
          path: require("@/assets/posters/ntuarcherypg2.png")
        },
        {
          name: "redcrosspg1",
          path: require("@/assets/posters/redcrosspg1.png")
        },
        {
          name: "redcrosspg2",
          path: require("@/assets/posters/redcrosspg2.png")
        },
                {
          name: "uymcapg1",
          path: require("@/assets/posters/uymcapg1.png")
        },
        {
          name: "uymcapg2",
          path: require("@/assets/posters/uymcapg2.png")
        },
        {
          name: "uymcapg3",
          path: require("@/assets/posters/uymcapg3.png")
        },
        {
          name: "wakeboarding",
          path: require("@/assets/posters/wakeboarding.png")
        },
        {
          name: "winesociety",
          path: require("@/assets/posters/winesociety.png")
        },
        {
          name: "wscpg1",
          path: require("@/assets/posters/wscpg1.png")
        },
        {
          name: "wscpg2",
          path: require("@/assets/posters/wscpg2.png")
        },
        {
          name: "breakers",
          path: require("@/assets/posters/breakers.png")
        },
        {
          name: "chinesedrums",
          path: require("@/assets/posters/chinesedrums.png")
        },
                {
          name: "choir",
          path: require("@/assets/posters/choir.png")
        },
        {
          name: "concert",
          path: require("@/assets/posters/concert.png")
        },
        {
          name: "hiphop",
          path: require("@/assets/posters/hiphop.png")
        },
        {
          name: "jazz",
          path: require("@/assets/posters/jazz.png")
        },
        {
          name: "lindyhop",
          path: require("@/assets/posters/lindyhop.png")
        },
        {
          name: "navigators",
          path: require("@/assets/posters/navigators.png")
        },
        {
          name: "piano",
          path: require("@/assets/posters/piano.png")
        },
        {
          name: "sedspg1",
          path: require("@/assets/posters/sedspg1.png")
        },
        {
          name: "sedspg2",
          path: require("@/assets/posters/sedspg2.png")
        },
                {
          name: "shitoryukarate",
          path: require("@/assets/posters/shitoryukarate.png")
        },
        {
          name: "soulfunky",
          path: require("@/assets/posters/soulfunky.png")
        },
        {
          name: "sportstaekwondo",
          path: require("@/assets/posters/sportstaekwondo.png")
        },
        {
          name: "symphonicband",
          path: require("@/assets/posters/symphonicband.png")
        },
        {
          name: "symphony",
          path: require("@/assets/posters/symphony.png")
        },
        {
          name: "tradtaekwondo",
          path: require("@/assets/posters/tradtaekwondo.png")
        },
        {
          name: "visualarts",
          path: require("@/assets/posters/visualarts.png")
        }                        
      ]
    };
  }
};
</script>

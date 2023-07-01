<template>
    <div class="App"  id="app">
        <header class="header">
            <div class="screen-monitor" v-if="DEBUG">
                {{ screen.type }}<br/>
                {{ screen.width }}px
            </div>
            <nav>
                <router-link :to="{name: 'Sumplete'}">Sumplete</router-link>
                |
                <router-link :to="{name: 'BSResearch'}">BSResearch</router-link>

            </nav>
        </header>
        <router-view/>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "App",
    data() {
        return {
            DEBUG: process.env.NODE_ENV === 'development',
        }
    },
    computed: {
        ...mapState(['screen',q2wwwwwwwwwwwwwwwwwwwwwwwww 'screenBreakpoints']),
    },
    methods: {
        onResize() {
            let screen = {};
            this.$set(screen, "width", window.innerWidth);
            this.$set(screen, "height", window.innerHeight);
            let t = "";
            switch (true) {
                case screen.width <= this.screenBreakpoints.sm:
                    t = "xs";
                    break;
                case screen.width <= this.screenBreakpoints.md:
                    t = "sm";
                    break;
                case screen.width <= this.screenBreakpoints.lg:
                    t = "md";
                    break;
                case screen.width <= this.screenBreakpoints.xl:
                    t = "lg";
                    break;
                default:
                    t = "xl";
                    break;
            }
            this.$set(screen, "type", t);
            this.$store.commit("screen", screen);
        }
    },

    mounted() {
        this.onResize();
        window.addEventListener("resize", this.onResize);
    },
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";

.App {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;

  .header {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: sticky;
      .screen-monitor {
          position: absolute;
          left: 10px;
          top: 10px;
          font-size: 12px;
          color: black;
      }
    nav {
      padding: 30px;

      a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }
  }
}


</style>
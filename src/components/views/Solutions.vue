<template>
    <div class="Solutions">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 mb-4">
                    <div class="controls">
                        <b-dd size="sm"
                              class="size-selector"
                              variant="outline-primary"
                              :text="newSizeHor.toFixed(0)">
                            <b-dd-item
                                    v-for="i of sizeRange"
                                    @click="ddClickSizeHor(i)">
                                {{ i }}
                            </b-dd-item>
                        </b-dd>

                        <b-dd size="sm"
                              class="size-selector"
                              variant="outline-primary"
                              :text="newSizeVer.toFixed(0)">
                            <b-dd-item
                                    v-for="j of sizeRange"
                                    @click="ddClickSizeVer(j)">
                                {{ j }}
                            </b-dd-item>
                        </b-dd>

                        <b-button size="sm"
                                  variant="primary"
                                  @click="createNewGame(newSizeHor, newSizeVer)">
                            New
                        </b-button>
                    </div>
                </div>
                <div class="d-flex gap-3 col-12 col-sm-8 col-md-8 col-lg-8 mb-4">
                    <div class="field-values">
                        <div class="horizontal" v-if="game.arrayValues"
                             v-for="(hor, j) of game.arrayValues" :key="j">
                            <div class="cell"
                                 :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                                 v-for="(value, i) of hor" :key="i">
                                {{ value }}
                            </div>
                            <div class="cell-sum">
                                <div class="sum-border"></div>
                                {{ game.arraySumHor[j] }}
                            </div>
                            <div class="cell-sum">
                                {{ game.arraySumAllHor[j] }}
                            </div>
                        </div>

                        <div class="horizontal" v-if="game.arraySumVer">
                            <div class="cell-sum"
                                 v-for="i of game.sizeHor">
                                <div class="sum-border"></div>
                                {{ game.arraySumVer[i - 1] }}

                            </div>
                        </div>
                        <div class="horizontal" v-if="game.arraySumVer">
                            <div class="cell-sum"
                                 v-for="i of game.sizeHor">
                                {{ game.arraySumAllVer[i - 1] }}

                            </div>
                        </div>

                    </div>

                    <div class="field-values">
                        <div class="horizontal" v-if="game.arrayAlives"
                             v-for="(hor, j) of game.arrayAlives" :key="j">
                            <div class="cell"
                                 :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                                 v-for="(value, i) of hor" :key="i">
                                {{ value }}
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-12">
                    <nav class="d-flex justify-content-center">
                        <router-link class="px-3" :to="{name: 'Resolver_1'}">Resolver_1</router-link>
                        |
                        <router-link class="px-3" :to="{name: 'Resolver_2'}">Resolver_2</router-link>
                    </nav>
                </div>

            </div>

        </div>

        <router-view/>

    </div>
</template>

<script>
import Resolver_1 from '@/components/views/Resolver_1.vue';
import Resolver_2 from '@/components/views/Resolver_2.vue';
import {mapState} from "vuex";


const maxCellValue = 9;

export default {
    name: "Solutions",
    components: {Resolver_1, Resolver_2},
    props: [],
    data() {
        return {
            sizeRange: [3, 4, 5, 6, 7, 8, 9],
            newSizeHor: 4,
            newSizeVer: 4,

            game: {
                sizeHor: 0,
                sizeVer: 0,
                arrayValues: [],
                arraySumHor: [],
                arraySumVer: [],
                arrayAlives: [],
            },
            arraySumAllHor: [],
            arraySumAllVer: [],

        }
    },
    computed: {
        ...mapState(["currentTask"]),
    },
    methods: {
        createNewGame(maxI, maxJ) {
            let i, j;
            this.game.sizeHor = maxI;
            this.game.sizeVer = maxJ;
            this.game.arrayValues = new Array(maxJ);
            this.game.arrayAlives = new Array(maxJ);
            for (j = 0; j < maxJ; j++) {
                this.game.arrayValues[j] = new Array(maxI);
                this.game.arrayAlives[j] = new Array(maxI);
            }
            this.game.arraySumHor = new Array(maxJ);
            this.game.arraySumVer = new Array(maxI);
            this.game.arraySumAllHor = new Array(maxJ);
            this.game.arraySumAllVer = new Array(maxI);
            for (j = 0; j < maxJ; j++) {
                this.game.arraySumHor[j] = 0;
                this.game.arraySumAllHor[j] = 0;
                for (i = 0; i < maxI; i++) {
                    this.game.arrayValues[j][i] = Math.trunc(Math.random() * maxCellValue);
                    this.game.arrayAlives[j][i] = Math.floor(Math.random() + 0.5);
                    this.game.arraySumHor[j] += this.game.arrayValues[j][i] * this.game.arrayAlives[j][i];
                    this.game.arraySumAllHor[j] += this.game.arrayValues[j][i];
                }
            }
            for (i = 0; i < maxI; i++) {
                this.game.arraySumVer[i] = 0;
                this.game.arraySumAllVer[i] = 0;
                for (j = 0; j < maxJ; j++) {
                    this.game.arraySumVer[i] += this.game.arrayValues[j][i] * this.game.arrayAlives[j][i];
                    this.game.arraySumAllVer[i] += this.game.arrayValues[j][i];
                }
            }
            const  {sizeHor, sizeVer, arrayValues, arraySumHor, arraySumVer} = this.game;
            this.$store.commit('currentTask',
                {sizeHor, sizeVer, arrayValues, arraySumHor, arraySumVer});
        },

        ddClickSizeHor(v) {
            this.newSizeHor = v;
        },
        ddClickSizeVer(v) {
            this.newSizeVer = v;
        },
    },
    mounted() {
    },
}
</script>

<style lang="scss">
:root {
  --max-cell-size: 100px;
  --min-cell-size: 20px;
}

.Solutions {
  width: 100%;
  height: auto;

  .controls {
    height: auto;
    width: 100%;
    //margin: 20px 0px;
    padding: 10px;
    display: flex;
    flex-flow: column;
    gap: 10px;
    align-items: center;
    //background-color: hsl(210, 78%, 91%);
  }

  .size-selector {
    width: 40px;

    & > .dropdown-toggle {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .horizontal {
    display: flex;
    flex-flow: row;
  }

  .cell {
    position: relative;
    min-width: var(--min-cell-size);
    min-height: var(--min-cell-size);
    max-width: var(--max-cell-size);
    max-height: var(--max-cell-size);
    width: 40px;
    height: 40px;
    font-weight: normal;
    color: black;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px 3px lightgrey;
    }


    &.bordertop {
      border-top: 1px solid gray;
    }

    &.borderleft {
      border-left: 1px solid gray;
    }
  }

  .cell-sum {
    position: relative;
    max-width: var(--max-cell-size);
    max-height: var(--max-cell-size);
    min-width: var(--min-cell-size);
    min-height: var(--min-cell-size);
    width: 40px;
    height: 40px;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .sum-border {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    height: 75%;
    border: 3px solid hsla(0, 0%, 50%, 0.2);
    border-radius: 25%;
    cursor: pointer;

    &:hover {
      border-color: hsla(0, 0%, 50%, 0.5);
    }
  }
    .router-link-exact-active {
        font-weight: bold;
        color: black;
        pointer-events: none;
    }
}
</style>
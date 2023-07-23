<template>
    <div class="Solutions">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 mb-4">
                    <div class="controls">
                        <b-dd size="sm"
                              class="size-selector"
                              variant="outline-primary"
                              :text="newSizeRows.toFixed(0)">
                            <b-dd-item
                                    v-for="i of sizeRange"
                                    @click="ddClickSizeHor(i)">
                                {{ i }}
                            </b-dd-item>
                        </b-dd>

                        <b-dd size="sm"
                              class="size-selector"
                              variant="outline-primary"
                              :text="newSizeCols.toFixed(0)">
                            <b-dd-item
                                    v-for="j of sizeRange"
                                    @click="ddClickSizeVer(j)">
                                {{ j }}
                            </b-dd-item>
                        </b-dd>

                        <b-button size="sm"
                                  variant="primary"
                                  @click="createNewGame(newSizeRows, newSizeCols)">
                            New
                        </b-button>
                    </div>
                </div>
                <div class="d-flex gap-3 col-12 col-sm-8 col-md-8 col-lg-8 mb-4">
                    <div class="field-values">
                        <div class="row" v-if="game.arrRows"
                             v-for="(hor, j) of game.arrRows" :key="j">
                            <div class="cell"
                                 :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                                 v-for="(value, i) of hor" :key="i">
                                {{ value }}
                            </div>
                            <div class="cell-sum">
                                <div class="sum-border"></div>
                                {{ game.arrSumRows[j] }}
                            </div>
                            <div class="cell-sum">
                                {{ arrSumAllRows[j] }}
                            </div>
                        </div>

                        <div class="row" v-if="game.arrSumCols">
                            <div class="cell-sum"
                                 v-for="i of game.sizeRows">
                                <div class="sum-border"></div>
                                {{ game.arrSumCols[i - 1] }}

                            </div>
                        </div>
                        <div class="row" v-if="game.arrSumCols">
                            <div class="cell-sum"
                                 v-for="i of game.sizeRows">
                                {{ arrSumAllCols[i - 1] }}

                            </div>
                        </div>

                    </div>

                    <div class="field-values">
                        <div class="row" v-if="arrAlives"
                             v-for="(hor, j) of arrAlives" :key="j">
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
            newSizeRows: 4,
            newSizeCols: 4,

            game: {
                sizeRows: 0,
                sizeCols: 0,
                arrRows: [],
                arrCols: [],
                arrSumRows: [],
                arrSumCols: [],

            },
            arrAlives: [],
            arrSumAllRaws: [],
            arrSumAllCols: [],

        }
    },
    computed: {
        ...mapState(["currentTask"]),
    },
    methods: {
        createNewGame(maxI, maxJ) {
            let i, j;
            this.game.sizeRows = maxI;
            this.game.sizeCols = maxJ;
            this.game.arrRows = new Array(maxJ);
            this.game.arrCols = new Array(maxI);
            this.arrAlives = new Array(maxJ);

            this.game.arrSumRows = new Array(maxJ);
            this.game.arrSumCols = new Array(maxI);
            this.arrSumAllRows = new Array(maxJ);
            this.arrSumAllCols = new Array(maxI);
            for (j = 0; j < maxJ; j++) {
              this.game.arrRows[j] = new Array(maxI);
              this.arrAlives[j] = new Array(maxI);
                this.game.arrSumRows[j] = 0;
                this.arrSumAllRows[j] = 0;
                for (i = 0; i < maxI; i++) {
                    this.game.arrRows[j][i] = Math.trunc(Math.random() * maxCellValue);
                    this.arrAlives[j][i] = Math.floor(Math.random() + 0.5);
                    this.game.arrSumRows[j] += this.game.arrRows[j][i] * this.arrAlives[j][i];
                    this.arrSumAllRows[j] += this.game.arrRows[j][i];
                }
            }
            for (i = 0; i < maxI; i++) {
                this.game.arrSumCols[i] = 0;
                this.arrSumAllCols[i] = 0;
                for (j = 0; j < maxJ; j++) {
                    this.game.arrCols[i][j] = this.game.arrRows[j][i];
                    // console.log(this.game.arrRows[j][i]);
                    this.game.arrSumCols[i] += this.game.arrRows[j][i] * this.arrAlives[j][i];
                    this.arrSumAllCols[i] += this.game.arrRows[j][i];
                }
            }
            this.$store.commit('currentTask', this.game);
        },

        ddClickSizeHor(v) {
            this.newSizeRows = v;
        },
        ddClickSizeVer(v) {
            this.newSizeCols = v;
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

  .row {
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
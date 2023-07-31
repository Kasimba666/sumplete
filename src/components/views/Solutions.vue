<template>
    <div class="Solutions">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 mb-4">
                    <div class="controls">
                        <b-dd size="sm"
                              class="size-selector"
                              variant="outline-primary"
                              :text="newCountCols.toFixed(0)">
                            <b-dd-item
                                    v-for="i of sizeRange"
                                    @click="ddClickCountCols(i), ddClickCountRows(i)">
                                {{ i }}
                            </b-dd-item>
                        </b-dd>

<!--                        <b-dd size="sm"-->
<!--                              class="size-selector"-->
<!--                              variant="outline-primary"-->
<!--                              :text="newCountRows.toFixed(0)">-->
<!--                            <b-dd-item-->
<!--                                    v-for="j of sizeRange"-->
<!--                                    @click="ddClickCountRows(j)">-->
<!--                                {{ j }}-->
<!--                            </b-dd-item>-->
<!--                        </b-dd>-->

                        <b-button size="sm"
                                  variant="primary"
                                  @click="createNewGame()">
                            New
                        </b-button>
                    </div>
                </div>
                <div class="d-flex col-12 col-sm-8 col-md-8 col-lg-8 mb-4">
                    <div class="field-values">
                        <div class="task-row" v-if="game.arrRows"
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

                        <div class="task-row" v-if="game.arrSumCols">
                            <div class="cell-sum"
                                 v-for="i of game.countRows">
                                <div class="sum-border"></div>
                                {{ game.arrSumCols[i - 1] }}

                            </div>
                        </div>
                        <div class="task-row" v-if="game.arrSumCols">
                            <div class="cell-sum"
                                 v-for="i of game.countRows">
                                {{ arrSumAllCols[i - 1] }}

                            </div>
                        </div>

                    </div>

                    <div class="field-values">
                        <div class="task-row" v-if="game.arrAlives"
                             v-for="(hor, j) of game.arrAlives" :key="j">
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


const maxCellValue = 6;

export default {
    name: "Solutions",
    components: {Resolver_1, Resolver_2},
    props: [],
    data() {
        return {
            sizeRange: [3, 4, 5, 6, 7, 8, 9, 12],
            newCountRows: 4,
            newCountCols: 4,

            game: {
                countRows: 0,
                countCols: 0,
                arrRows: [],
                arrCols: [],
                arrSumRows: [],
                arrSumCols: [],
                arrAlives: [],
            },

            arrSumAllRaws: [],
            arrSumAllCols: [],

        }
    },
    computed: {
        ...mapState(["currentTask"]),
    },
    methods: {
        createNewGame(lastGame) {
            let maxI = this.newCountCols;
            let maxJ = this.newCountRows;
            let g = {};
            if (!!lastGame) {
                maxJ = lastGame.countCols;
                maxI = lastGame.countRows;
                g.countRows = maxI;
                g.countCols = maxJ;
                g.arrRows = [...lastGame.arrRows];
                g.arrCols = [...lastGame.arrCols];
                g.arrAlives = [...lastGame.arrAlives];
            } else {
                g.countRows = maxI;
                g.countCols = maxJ;
                g.arrRows = new Array(maxJ);
                g.arrCols = new Array(maxI);
                g.arrAlives = new Array(maxJ);
            }
            g.arrSumRows = new Array(maxJ);
            g.arrSumCols = new Array(maxI);
            this.arrSumAllRows = new Array(maxJ);
            this.arrSumAllCols = new Array(maxI);
            let i, j;
            for (j = 0; j < maxJ; j++) {
                g.arrRows[j] = new Array(maxI);
                g.arrAlives[j] = new Array(maxI);
                g.arrSumRows[j] = 0;
                this.arrSumAllRows[j] = 0;
                for (i = 0; i < maxI; i++) {
                    g.arrRows[j][i] = !!lastGame ? +lastGame.arrRows[j][i] : Math.ceil(Math.random() * maxCellValue);
                    g.arrAlives[j][i] = !!lastGame ? +lastGame.arrAlives[j][i] : Math.round(Math.random());
                    g.arrSumRows[j] += g.arrRows[j][i] * g.arrAlives[j][i];
                    this.arrSumAllRows[j] += g.arrRows[j][i];
                }
            }
            for (i = 0; i < maxI; i++) {
                g.arrSumCols[i] = 0;
                this.arrSumAllCols[i] = 0;
                for (j = 0; j < maxJ; j++) {
                    // g.arrCols[i][j] = g.arrRows[j][i];
                    // console.log(g.arrRows[j][i]);
                    g.arrSumCols[i] += g.arrRows[j][i] * g.arrAlives[j][i];
                    this.arrSumAllCols[i] += g.arrRows[j][i];
                }
            }
            this.game = g;
            this.$store.commit('currentTask', this.game);
        },

        ddClickCountCols(v) {
            this.newCountCols = v;
        },
        ddClickCountRows(v) {
            this.newCountRows = v;
        },
    },
    mounted() {
        setTimeout(() => {
            this.createNewGame(this.currentTask);
        }, 100);
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

  .task-row {
    display: flex;
    flex-flow: row nowrap;
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


  .field-values {
    width: auto;
    max-width: 500px;
  }

  .router-link-exact-active {
    font-weight: bold;
    color: black;
    pointer-events: none;
  }
}
</style>
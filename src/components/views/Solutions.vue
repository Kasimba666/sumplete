<template>
    <div class="Solutions">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 mb-4">
                    <div class="controls">
                        <b-dd
                                size="sm"
                                class="size-selector"
                                variant="outline-primary"
                                :text="newSizeHor.toFixed(0)"
                        >

                            <b-dd-item
                                    v-for="i of sizeRange"
                                    @click="ddClickSizeHor(i)"
                            >
                                {{ i }}
                            </b-dd-item>
                        </b-dd>

                        <b-dd
                                size="sm"
                                class="size-selector"
                                variant="outline-primary"
                                :text="newSizeVer.toFixed(0)"
                        >

                            <b-dd-item
                                    v-for="j of sizeRange"
                                    @click="ddClickSizeVer(j)"
                            >
                                {{ j }}
                            </b-dd-item>
                        </b-dd>

                        <b-button
                                variant="primary"
                                size="sm"
                                @click="createNewGame(newSizeHor, newSizeVer)"
                        >
                            New
                        </b-button>

                    </div>
                </div>
                <div class="col-12 col-sm-8 col-md-8 col-lg-8 mb-4">
                    <div class="row">
                        <div class="field-values">
                            <div class="horizontal" v-if="game.arrayValues"
                            v-for="(hor, j) of game.arrayValues" :key="j"
                            >
                                <div class="cell"
                                     :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                                     v-for="(value, i) of hor" :key="i"
                                >
                                    {{ value }}
                                </div>
                                <div class="cell-alive-sum">

                                    {{ game.arraySumHor[j] }}

                                </div>
                            </div>

                            <div class="horizontal" v-if="game.arrayValues">
                                <div class="cell-alive-sum"
                                     v-for="i of game.arrayValues">
                                    <div class="sum-border"></div>
                                    {{ game.arraySumVer[i - 1] }}

                                </div>
                            </div>

                        </div>

                        <div class="field-values">
                            <div class="horizontal" v-if="game.arrayAlives"
                            v-for="(hor, j) of game.arrayAlives" :key="j"
                            >
                                <div class="cell"
                                     v-for="(value, i) of hor" :key="i"
                                >
                                    {{ value }}
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

const maxCellValue = 9;

export default {
    name: "Solutions",
    components: {},
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
                arrayAlives: [],
                arraySumHor: [],
                arraySumVer: [],
            },
            arraySumAllHor: [],
            arraySumAllVer: [],

        }
    },
    computed: {},
    methods: {
        createNewGame (maxI, maxJ) {
            let i, j;
            this.game.arrayValues = new Array(maxJ);
            for (j = 0; j < maxJ; j++) {
                this.game.arrayValues[j] = new Array(maxI);
            }
            this.game.arrayAlives = new Array(maxJ);
            for (j = 0; j < maxJ; j++) {
                this.game.arrayAlives[j] = new Array(maxI);
            }
            this.game.arraySumHor = new Array(maxI);
            this.game.arraySumVer = new Array(maxJ);

            for (j = 0; j < maxJ; j++) {
                for (i = 0; i < maxI; i++) {
                   this.game.arrayValues[j][i] = Math.trunc(Math.random() * maxCellValue);
                   this.game.arrayAlives[j][i] = Math.floor(Math.random() + 0.5);
                   this.game.arraySumHor[j] += this.game.arrayValues[j][i] * this.game.arrayAlives[j][i];
                   this.game.arraySumVer[i] += this.game.arrayValues[j][i] * this.game.arrayAlives[j][i];
                }

            }

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

    .cell-alive-sum {
        position: relative;
        max-width: var(--max-cell-size);
        max-height: var(--max-cell-size);
        min-width: var(--min-cell-size);
        min-height: var(--min-cell-size);
        font-weight: normal;
        display: flex;
        align-items: center;
        justify-content: center;

        }

}
</style>
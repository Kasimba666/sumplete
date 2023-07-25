<template>
    <div class="Resolver_1">
        <b-container>
            <b-row>
                <div class="d-flex col-12">
                    <div class="field-values" v-if="!!computed_rows">
                        <div class="task-row"
                             v-for="(row, j) of computed_rows" :key="j">
                            <div class="cell"
                                 :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                                 v-for="(value, i) of row" :key="i">
                                {{ value }}
                            </div>
                            <div class="cell-sum">
                                <div class="sum-border"></div>
                                {{ computed_rowSums[j] }}
                            </div>

                        </div>

                        <div class="task-row" v-if="!!cols.values">
                            <div class="cell-sum"
                                 v-for="item of computed_colSums">
                                <div class="sum-border"></div>
                                {{ item }}

                            </div>
                        </div>

                    </div>
                    <div class="field-values">

                    </div>

                </div>

            </b-row>
            <b-row>
                <div class="d-flex col-12">
                    <b-button size="sm"
                              variant="secondary"
                              @click="init">
                        Init
                    </b-button>
                </div>
            </b-row>
            <div>
                <!--                {{ allHsCols }}-->
            </div>
            <div>
                <!--                {{ hsBySumCols }}-->
            </div>
        </b-container>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Resolver_1",
    components: {},
    props: [],
    data() {
        return {
            rows: [],
            cols: [],
            solution: [],

            allHsCols: [],
            allHsRows: [],
            hsBySumCols: [],
            hsBySumRows: [],
        };
    },
    computed: {
        ...mapState(["currentTask"]),
        game() {
            return this.currentTask;
        },

        computed_cols() {
            if (!this.game) {
                return null;
            }
            let c = [];
            for (let i = 0; i < this.game.sizeRows; i++) {
                let col = [];
                for (let j = 0; j < this.game.sizeCols; j++) {
                    col.push(this.game.arrRows[j][i]);
                }
                c.push(col);
            }
            return c;
        },
        computed_colSums() {
            if (!this.game) {
                return null;
            }
            let cs = [];
            for (let i = 0; i < this.game.sizeRows; i++) {
                let sum = 0;
                for (let j = 0; j < this.game.sizeCols; j++) {
                    sum += this.game.arrRows[j][i] * this.game.arrAlives[j][i];
                    ;
                }
                cs.push(sum);
            }
            return cs;
        },

        computed_rows() {
            if (!this.game) {
                return null;
            }
            let r = [];
            for (let j = 0; j < this.game.sizeCols; j++) {
                let row = [];
                for (let i = 0; i < this.game.sizeRows; i++) {
                    row.push(this.game.arrRows[j][i]);
                }
                r.push(row);
            }
            return r;
        },
        computed_rowSums() {
            if (!this.game) {
                return null;
            }
            let rs = [];
            for (let j = 0; j < this.game.sizeCols; j++) {
                let sum = 0;
                for (let i = 0; i < this.game.sizeRows; i++) {
                    sum += this.game.arrRows[j][i] * this.game.arrAlives[j][i];
                }
                rs.push(sum);
            }
            return rs;
        },


    },
    methods: {
        decimalToBitVector(decimal, length) {
            return ('0'.repeat(length) + decimal.toString(2)).slice(-length);
        },
        dotProduct(vector, num) {
            return vector.reduce((sum, v, i) => sum += v * ((num >> i) & 1), 0);
        },
        filterBySum(line) {
            line.hs = line.hs.filter((v) => {
                return this.dotProduct(line.values, v) === line.sum;
            });
        },

        init() {
            if (!this.game) {
                return null;
            }
            let sizeCols = this.game.sizeCols;
            let sizeRows = this.game.sizeRows;

            this.allHsCols = [];
            for (let i = 0; i < 2 ** sizeCols; i++) {
                this.allHsCols.push(i);
            }
            this.cols = this.computed_cols.map((v, i) => {
                return {
                    values: [...v],
                    hs: [...this.allHsCols],
                    sum: this.computed_colSums[i]
                };
            });

            if (sizeCols === sizeRows) {
                this.allHsRows = this.allHsCols;
            } else {
                this.allHsRows = [];
                for (let j = 0; j < 2 ** this.rows.length; j++) {
                    this.allHsRows.push(j);
                }
            }
            this.rows = this.computed_rows.map((v, i) => {
                return {
                    values: [...v],
                    hs: [...this.allHsRows],
                    sum: this.computed_rowSums[i]
                };
            });
            this.rows.forEach(v => this.filterBySum(v));
            this.cols.forEach(v => this.filterBySum(v));
        },

        calcFilteredHsBySum() {
            if (this.cols.length) {

                // debugger;
                this.hsBySumCols = [];
                for (let i = 0; i < this.cols.length; i++) {
                    this.hsBySumCols[i] = [];
                    for (let k = 0; k < this.allHsCols.length; k++) {
                        console.log(k + ':' + this.decimalToBitVector(k, this.cols.length) + ' ' + ' ' + this.dotProductSum(this.cols[i], this.allHsCols[k]) + ' ' + this.colSums[i]);
                        if (this.dotProductSum(this.cols[i], this.allHsCols[k]) === this.colSums[i]) {
                            this.hsBySumCols[i].push(this.allHsCols[k]);
                        }
                    }
                }
            }


            this.hsBySumRows = [];
            for (let j = 0; j < this.rows.length; j++) {
                this.hsBySumRows[j] = [];
                for (let k = 0; k < this.allHsRows.length; k++) {
                    if (this.dotProductSum(this.rows[j], this.allHsRows[k]) === this.rowSums[j]) {
                        this.hsBySumRows[j].push(this.allHsRows[k]);
                    }
                }
            }
        }
    },

    mounted() {
    },
}
</script>

<style lang="scss">
/****  Resolver_1  ****/
.Resolver_1 {
  width: 100%;
  height: auto;
}
</style>
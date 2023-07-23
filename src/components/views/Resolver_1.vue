<template>
    <div class="Resolver_1">
        <b-container>
            <b-row>
                <b-col>
                    <h2>Resolver_1</h2>
                </b-col>
                <div class="col-12">
                    <div class="field-values" v-if="!!rows">
                        <div class="row" v-if="rows"
                             v-for="(row, j) of rows" :key="j">
                            <div class="cell"
                                 :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                                 v-for="(value, i) of row" :key="i">
                                {{ value }}
                            </div>
                            <div class="cell-sum">
                                <div class="sum-border"></div>
                                {{ rowSums[j] }}
                            </div>

                        </div>

                        <div class="row" v-if="!!cols">
                            <div class="cell-sum"
                                 v-for="i of cols.length">
                                <div class="sum-border"></div>
                                {{ colSums[i - 1] }}

                            </div>
                        </div>

                    </div>

                </div>
            </b-row>
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

        };
    },
    computed: {
        ...mapState(["currentTask"]),
      game() {
        return this.currentTask;
      },

      rows() {
        let r = [];
        for (let j = 0; j < this.game.sizeRows; j++) {
          let row = [];
          for (let i = 0; i < this.game.sizeCols; i++) {
            row.push(this.game.arrRows[j][i]);
          }
          r.push(row);
        }
        return r;
      },
      rowSums() {
        let rs = [];
        for (let j = 0; j < this.game.sizeRows; j++) {
          let sum = 0;
          for (let i = 0; i < this.game.sizeCols; i++) {
            sum += this.game.arrRows[j][i];
          }
          rs.push(sum);
        }
        return rs;
      },

      cols() {
        let c = [];
        for (let i = 0; i < this.game.sizeCols; i++) {
          let col = [];
          for (let j = 0; j < this.game.sizeRows; j++) {
            col.push(this.game.arrRows[j][i]);
          }
          c.push(col);
        }
        return c;
      },
      colSums() {
        let cs = [];
        for (let i = 0; i < this.game.sizeCols; i++) {
          let sum = 0;
          for (let j = 0; j < this.game.sizeRows; j++) {
            sum += this.game.arrRows[j][i];
          }
          cs.push(sum);
        }
        return cs;
      },

    },
    methods: {
        decimalToBitVector(decimal, length) {
            return Array.from('0'.repeat(length) + decimal.toString(2)).slice(-length);
        },
        dotProductSum(vector, decimal) {
          return vector.reduce((sum, v, i) => {
                this.sum += v * ((decimal >> i) & 1)
            });
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
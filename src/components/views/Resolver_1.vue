<template>
    <div class="Resolver_1">
        <b-container>
            <b-row>
                <b-col>
                    <h2>Resolver_1</h2>
                </b-col>
                <div class="col-12">
                    <div class="field-values" v-if="!!game">
                        <div class="horizontal" v-if="game.arrRows"
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

                        </div>

                        <div class="horizontal" v-if="game.arrSumCols">
                            <div class="cell-sum"
                                 v-for="i of game.sizeRows">
                                <div class="sum-border"></div>
                                {{ game.arrSumCols[i - 1] }}

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
        return {};
    },
    computed: {
        ...mapState(["currentTask"]),
        game() {
            return this.currentTask;
        },
    },
    methods: {
        decimalToBitVector(decimal, length) {
            return Array.from('0'.repeat(length) + decimal.toString(2)).slice(-length);
        },
    //     dotProductSum(vector, bitVector {
    //         vector.reduce(sum, v, i) {
    //             this.sum += v & (i >> i)
    //         }
    //         return;
    //     }
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
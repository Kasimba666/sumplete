<template>
    <div class="Resolver_1">
        <b-container>
            <b-row>
                <b-col>
                    <h2>Resolver_1</h2>
                </b-col>
                <div class="col-12">
                    <div class="field-values" v-if="!!game">
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

                        </div>

                        <div class="horizontal" v-if="game.arraySumVer">
                            <div class="cell-sum"
                                 v-for="i of game.sizeHor">
                                <div class="sum-border"></div>
                                {{ game.arraySumVer[i - 1] }}

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
    methods: {},
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
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
            <div class="field-values" v-if="!!solution">
              <div class="task-row"
                   v-for="(row, j) of solution" :key="j">
                <div class="cell"
                     :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                     v-for="(value, i) of row" :key="i">
                  {{ value }}
                </div>
              </div>
            </div>
          </div>

        </div>

      </b-row>
      <b-row>
        <div class="d-flex col-12">
          <b-button class="task-btn"
                    size="sm"
                    variant="secondary"
                    @click="init">
            Init
          </b-button>
          <b-button class="task-btn"
                    size="sm"
                    variant="primary"
                    @click="startTask">
            Start
          </b-button>

          <b-button class="task-btn"
                    size="sm"
                    variant="danger"
                    @click="stopTask">
            Abort
          </b-button>
          <div class="task-btn">
            {{ timer.deltaValue }}
          </div>
        </div>

      </b-row>
      <div>
        {{ cols }}
      </div>
      <div>
        {{ rows }}
      </div>
    </b-container>
  </div>
</template>

<script>
import {mapState} from "vuex";

const timeInterval = 100;

export default {
  name: "Resolver_1",
  components: {},
  props: [],
  data() {
    return {
      rows: [],
      cols: [],
      solution: [],

      timer: {
        startValue: 0,
        deltaValue: 0,
        idTimer: 0,

        stopTimer() {
          clearInterval(this.idTimer);
        },
        startTimer() {
          this.deltaValue = 0;
          this.startValue = Date.now();
          this.idTimer = setInterval(() => {
            this.deltaValue =  ((Date.now() - this.startValue) / 1000).toFixed(1);
          }, timeInterval);
        },

      }
    }
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
      for (let i = 0; i < this.game.countRows; i++) {
        let col = [];
        for (let j = 0; j < this.game.countCols; j++) {
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
      for (let i = 0; i < this.game.countRows; i++) {
        let sum = 0;
        for (let j = 0; j < this.game.countCols; j++) {
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
      for (let j = 0; j < this.game.countCols; j++) {
        let row = [];
        for (let i = 0; i < this.game.countRows; i++) {
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
      for (let j = 0; j < this.game.countCols; j++) {
        let sum = 0;
        for (let i = 0; i < this.game.countRows; i++) {
          sum += this.game.arrRows[j][i] * this.game.arrAlives[j][i];
        }
        rs.push(sum);
      }
      return rs;
    },
  },
  methods: {
    dotProduct(vector, num) {
      return vector.reduce((sum, v, i) => sum += v * ((num >> i) & 1), 0);
    },
    filterBySum(line) {
      line.hs = line.hs.filter((v) => {
        return this.dotProduct(line.values, v) === line.sum;
      });
    },
    filterByPos(line, pos, value) {
      line.hs = line.hs.filter((v) => {
        return ((v >> pos) & 1) == value
      })
    },

    init() {
      if (!this.game) {
        return null;
      }
      let countCols = this.game.countCols;
      let countRows = this.game.countRows;
      let allHsCols = [];
      let allHsRows = [];

      for (let i = 0; i < 2 ** countCols; i++) {
        allHsCols.push(i);
      }
      this.cols = this.computed_cols.map((v, i) => {
        return {
          index: i,
          values: [...v],
          hs: [...allHsCols],
          sum: this.computed_colSums[i]
        };
      });

      if (countCols === countRows) {
        allHsRows = allHsCols;
      } else {
        for (let j = 0; j < 2 ** this.rows.length; j++) {
          allHsRows.push(j);
        }
      }
      this.rows = this.computed_rows.map((v, i) => {
        return {
          index: i,
          values: [...v],
          hs: [...allHsRows],
          sum: this.computed_rowSums[i]
        };
      });
      this.rows.forEach(v => this.filterBySum(v));
      this.cols.forEach(v => this.filterBySum(v));

      this.solution = [];
      for (let j = 0; j < countRows; j++) {
        this.solution[j] = [];
        for (let i = 0; i < countCols; i++) {
          this.solution[j][i] = null;
        }
      }

    },

    startTask() {
      this.timer.startTimer();
    },

    stopTask() {
      this.timer.stopTimer();
    },


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

  .task-btn {
    width: 60px;
    margin: 10px;
    align-items: center;
  }
}
</style>
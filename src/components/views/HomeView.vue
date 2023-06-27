<template>
    <div class="Home">
        <div class="controls">
            <label for="field_size">Размер поля:</label>
            <input id="field_size"
                   style="width: 40px;"
                   min="3"
                   max="9"
                   v-model.number="field_size" type="number">
            <button @click="createNewGame(field_size)">Создать</button>
        </div>

        <div class="main">
            <div class="field-all">
                <div class="field-cell">
                    <div class="horizontal"
                         v-for="(hor, j) of arrayField" :key="j">
                        <div class="cell" :class="[marks[cell.status], {isAlive:cell.isAlive}]"
:style="{fontStyle: (i+j)%2 ? 'italic':'normal', color: (i+j)%2 ? 'red':'green'}"
                             v-for="(cell, i) of hor" :key="i"
                             @click="cellClick(cell)">
                            {{ cell.value }}
                        </div>
                        <div class="cell-alive-sum">
                            {{ arraySumAliveHorizontal[j] }}
                        </div>
                        <div class="cell-marked-sum">
                            {{ arraySumMarkedHorizontal[j] }}
                        </div>
                    </div>

                    <div class="horizontal">
                        <div class="cell-alive-sum"
                             v-for="i of this.field_size">
                            {{ arraySumAliveVertical[i - 1] }}
                        </div>
                    </div>

                    <div class="horizontal">
                        <div class="cell-marked-sum"
                             v-for="i of this.field_size">
                            {{ arraySumMarkedVertical[i - 1] }}
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div>{{ this.arraySumMarkedVertical }}</div>
        <div>{{ this.arraySumMarkedHorizontal }}</div>

    </div>

</template>

<script>

const cell = JSON.stringify({value: null, isAlive: null, status: null});

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            field_size: 4,
            arrayField: [],
            arraySumAliveHorizontal: [],
            arraySumAliveVertical: [],
            arraySumMarkedHorizontal: [],
            arraySumMarkedVertical: [],
            marks: ['', 'mark-no', 'mark-yes'],
        }
    },
    computed: {},
    methods: {
        cellClick(cell) {
            cell.status++;
            cell.status %= 3;
            this.recalc(this.field_size);
        },
        recalc() {
            const size = this.field_size;
            let i, j;
            let sumMarkedHorizontal = 0;
            let sumMarkedVertical = 0;


            for (j = 0; j < size; j++) {
                for (i = 0, sumMarkedHorizontal = 0; i < size; i++) {

                    if (this.arrayField[j][i].status !== 1) {
                        sumMarkedHorizontal += this.arrayField[j][i].value;
                    }
                }

                this.arraySumMarkedHorizontal[j] = sumMarkedHorizontal;
            }

            for (i = 0; i < size; i++) {
                for (j = 0, sumMarkedVertical = 0; j < size; j++) {
                    if (this.arrayField[j][i].status !== 1) {
                        sumMarkedVertical += this.arrayField[j][i].value;
                    }
                }
                this.arraySumMarkedVertical[i] = sumMarkedVertical;
            }

        },
        createNewGame: function (size) {
            this.arrayField = [];
            this.arraySumAliveHorizontal = [];
            this.arraySumAliveVertical = [];
            this.arraySumMarkedVertical = [];
            this.arraySumMarkedHorizontal = [];
            let i, j;
            let horizontal = [];
            let sumAliveHorizontal = 0;
            let sumAliveVertical = 0;

            for (j = 0; j < size; j++) {
                horizontal = [];
                sumAliveHorizontal = 0;
                for (i = 0; i < size; i++) {
                    horizontal.push({
                        value: (Math.trunc(Math.random() * 9) + 1),
                        isAlive: (Math.random() < 0.5),
                        status: 0
                    });
                    if (horizontal[i].isAlive) {
                        sumAliveHorizontal += horizontal[i].value
                    }
                    ;

                }
                ;

                this.arrayField.push(horizontal);
                this.arraySumAliveHorizontal.push(sumAliveHorizontal);
                this.arraySumMarkedHorizontal.push(0);
            }
            ;
            for (i = 0; i < size; i++) {
                sumAliveVertical = 0;
                for (j = 0; j < size; j++) {
                    if (this.arrayField[j][i].isAlive) {
                        sumAliveVertical += this.arrayField[j][i].value
                    }
                    ;
                    if (this.arrayField[j][i].status == 2) {
                        sumAliveVertical += this.arrayField[j][i].value
                    }
                    ;

                }
                ;
                this.arraySumAliveVertical.push(sumAliveVertical);
                this.arraySumMarkedVertical.push(0);

            }

            this.recalc();
        },

    },
}
</script>

<style lang="scss">

.Home {
  width: 100%;
  height: auto;
  padding: 50px 30px;

  .common {
    border-style: solid;
    border-color: gray;
    border-radius: 20px;
  }

  .controls {
    height: 30px;
    width: 100%;
    margin: 50px 0px;
    display: flex;
    flex-flow: row;
    gap: 10px;
  }

  .main {
    height: auto;
    width: auto;
  }

  .field-all {
    width: 600px;
    display: flex;
    flex-flow: row;
  }

  .field-cell {
    width: 500px;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    display: flex;
    flex-flow: column;
  }

  .horizontal {
    display: flex;
    flex-flow: row;
  }

  .cell {
    width: 50px;
    height: 50px;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;


    &.mark-no {
      background-color: hsla(0, 100%, 50%, .3);
    }

    &.mark-yes {
      background-color: hsla(120, 100%, 25%, .3);
    }

    &.isAlive {
        font-weight: bold;
    }

    &:hover {
      box-shadow: 0 0 10px 3px lightgrey;
    }

  }

  .cell-alive-sum {
    width: 50px;
    height: 50px;
    font-style: normal;
    //background-color: lightyellow;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cell-marked-sum {
    width: 50px;
    height: 50px;
    font-style: normal;

    display: flex;
    align-items: center;
    justify-content: center;

  }

  .button-control {

  }
}
</style>
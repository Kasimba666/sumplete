<template>
  <div class="home">
    <div class="control">
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
              v-for="hor in field">
            <div class="cell"
                 v-for="i in hor">
              {{ i.value }}
            </div>
          </div>
        </div>
      </div>
    </div> {{field}}
  </div>

</template>

<script>

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      field_size: 4,
      cell: {value: null, isAlive: null, mark: null},
      field: [],

    }
  },
  computed: {},
  methods: {
    createNewGame: function (size) {
      this.field = [];
      let i, j;
      let horizontal = [];
      for (j = 0; j < size; j++) {
        horizontal = [];
        for (i = 0; i < size; i++) {
          horizontal.push({value: (Math.trunc(Math.random() * 8) + 1), isAlive: (Math.trunc(Math.random() + 0.5)), mark: 0})
        }
        this.field.push(horizontal);
      }
    },

  },
}
</script>

<style lang="scss">
.common {
  border-style: solid;
  border-color: gray;
  border-radius: 20px;
}

.control {
  height: 30px;
  width: 100%;
  margin: 10px;
  display: flex;
  flex-flow: row;
  gap: 10px;
}

.main {
  height: 100%;
  width: 100%;
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
}

.button-control {

}

</style>
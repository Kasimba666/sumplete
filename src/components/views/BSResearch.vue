<template>
    <div class="BSResearch">
        <h2>BSResearch</h2>

        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 col-lg-6 mb-4">
                    <div class="block -b1">col-12 col-md-8 col-lg-6
                        <div class="container px-0">
                            <div class="row">
                                <div class="col-12 col-md-8 col-lg-6 mb-4">
                                    <div class="block -b1">col-12 col-md-8 col-lg-6</div>
                                </div>
                                <div class="col-12 col-md-4 col-lg-3">
                                    <div class="block -b2">col-12 col-md-4 col-lg-3</div>
                                </div>
                                <div class="d-none d-lg-block col-lg-3 offset-lg-2">
                                    <div class="block -b3 ">d-none d-lg-block col-lg-3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4 col-lg-3">
                    <div class="block -b2">col-12 col-md-4 col-lg-
                        <br>
                      <button class="btn btn-primary">Ok!</button>
                      <button class="btn btn-secondary">cancel</button>
                      <button class="btn">cancel</button>
                    </div>
                </div>
                <div class="d-none d-lg-block col-lg-3 offset-lg-2">
                    <div class="block -b3 ">d-none d-lg-block col-lg-3</div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-8 col-lg-6 mb-4">
                    <div class="block -b1">col-12 col-md-8 col-lg-6</div>
                </div>
                <div class="col-12 col-md-4 col-lg-3">
                    <div class="block -b2">col-12 col-md-4 col-lg-3</div>
                </div>
                <div class="d-none d-lg-block col-lg-3 offset-lg-2">
                    <div class="block -b3 ">d-none d-lg-block col-lg-3</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BSResearch",
    components: {},
    props: [],
    data() {
        return {}
    },
    computed: {},
    methods: {},
    mounted() {
    },
}
</script>

<style lang="scss">
/****  BSResearch  ****/
.BSResearch {
  width: 100%;
  height: auto;

  .container {
    border: 1px solid red;
  }

  .block {
    width: 100%;
    height: auto;
    min-height: 150px;
      border: 1px solid green;
    //display: flex;
    //align-items: center;
    //justify-content: center;
    &.-b1 {
      background-color: hsl(210, 78%, 91%);
    }

    &.-b2 {
      background-color: hsl(8, 78%, 91%);
    }

    &.-b3 {
      background-color: hsl(108, 78%, 91%);
    }

    &.-b4 {
      background-color: hsl(288, 78%, 91%);
    }

    &.-b5 {
      background-color: hsl(38, 78%, 91%);
    }

    &.-b6 {
      background-color: hsl(158, 78%, 91%);
    }

    &.-b7 {
      background-color: hsl(338, 78%, 91%);
    }
  }
}
</style>
new Vue({
  el: "#vue-toggle",
  data: {},
  methods: {
    toggleReadMoreLess: function() {
      console.log(this.$refs.myToggleButton.innerHTML);

      if (this.$refs.myToggleButton.innerText == "more ") {
        this.$refs.myToggleButton.innerHTML =
          "less <i class='fas fa-arrow-up' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample' role='none presentation'></i>";
      } else {
        this.$refs.myToggleButton.innerHTML =
          "more <i class='fas fa-arrow-down'data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample' role='none presentation'></i>";
      }
    }
  },
  computed: {}
});

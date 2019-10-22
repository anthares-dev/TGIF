new Vue({
  el: "#vue-table",
  data: {
    members: data.results[0].members,

    partyValues: []
  },
  methods: {
    filterEngine: function() {
      data.members ==
        data.members.filter(senator => partyValues.includes(senator.party));
    }
  },
  computed: {}
});

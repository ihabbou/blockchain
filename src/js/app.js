App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
    console.log("web3:", App.web3Provider)
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

  //  App.listenForEvents();  
    return App.render();
    });

  //  return App.bindEvents();
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();
/*
    // Load account data
    console.log("cb:", web3.eth);
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        console.log("accs:", web3.eth.accounts);
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      } else {
        console.error(err);
      }
    });
    */
    console.log("web3.eth ", web3.eth);
    web3.eth.getAccounts().then(console.log);


    const web3 = new Web3(window.web3.currentProvider);
    console.log("???",web3.eth.accounts)

    var account = web3.eth.accounts[0];
    console.log("accs:", web3.eth.accounts);
    var accountInterval = setInterval(function() {
      if (web3.eth.accounts[0] !== account) {
        account = web3.eth.accounts[0];
        updateInterface();
      }
    }, 100);


    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidateCount();
    }).then(function(candidateCount) {
      var candidateResults = $("#candidateResults");
      candidateResults.empty();

      var contestantsSelect = $('#contestantsSelect');
      contestantsSelect.empty();

      for (var i = 1; i <= candidateCount; i++) {
        electionInstance.contestants(i).then(function(contestant) {
          var id = contestant[0];
          var name = contestant[1];
          var voteCount = contestant[2];

          // Render contestant Result
          var contestantTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          contestantsResults.append(contestantTemplate);

          // Render candidate voting option
          var contestantOption = "<option value='" + id + "' >" + name + "</ option>"
          contestantsSelect.append(contestantOption);

        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

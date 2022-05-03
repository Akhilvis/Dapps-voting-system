

$(document).ready(function() {
	$('#add_cand_btn').click(function() {
		$("#cand_add_div").append("<span class='label label-success label-custom'>"+ $('#add_cand').val() +"</span>");
		App.candidates_list.push($('#add_cand').val())
		$('#add_cand').val("")
	});

});



App = {

    contracts: {},
	candidates_list: [],
    loading: false,


	load: async () =>{
        // Loading app
        console.log("App loading....")
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()

      },

	// https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
	loadWeb3: async () => {
		if (typeof web3 !== 'undefined') {
		App.web3Provider = web3.currentProvider
		web3 = new Web3(web3.currentProvider)
		} else {
		window.alert("Please connect to Metamask.")
		}
		// Modern dapp browsers...
		if (window.ethereum) {
		window.web3 = new Web3(ethereum)
		try {
			// Request account access if needed
			await ethereum.enable()
			// Acccounts now exposed
			web3.eth.sendTransaction({/* ... */})
		} catch (error) {
			// User denied account access...
		}
		}
		// Legacy dapp browsers...
		else if (window.web3) {
		App.web3Provider = web3.currentProvider
		window.web3 = new Web3(web3.currentProvider)
		// Acccounts always exposed
		web3.eth.sendTransaction({/* ... */})
		}
		// Non-dapp browsers...
		else {
		console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
	},
	loadAccount: async () => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
        console.log(App.account)
        web3.eth.defaultAccount = web3.eth.accounts[0]
        // personal.unlockAccount(web3.eth.defaultAccount)
    },

    loadContract:  async() => {
      const elctionList = await $.getJSON('ElectionList.json')
      console.log(elctionList)
      App.contracts.ElectionList = TruffleContract(elctionList)
      App.contracts.ElectionList.setProvider(App.web3Provider)

      // Hydrate the smart contract with values from the blockchain
      App.electionList = await App.contracts.ElectionList.deployed()
    },
	
    render: async() =>{
        // Prevent double render
        if (App.loading) {
          return
        }

        // Update app loading state
        // App.setLoading(true)

        // Render Account
		console.log(">>>>>>>> ", App.account)
        $('#account').html(App.account)

        // await App.renderTasks()


        // Update loading state
        // App.setLoading(false)
    },

	setupElection: async () =>{
        // App.setLoading(true)
		const election_title = $('#ele_title').val()
		console.log(election_title)

        await App.electionList.createElection(election_title, App.candidates_list)
        window.location.reload()

    },
	
}


$(() => {

	$(window).on('load', function(){
		App.load()
	});

});
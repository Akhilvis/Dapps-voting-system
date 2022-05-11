

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
	electionCount : 0 ,


	load: async () =>{
        // Loading app
        console.log("App loading....")
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
		await App.renderTasks()

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

	renderTasks: async () => {
		// Load the total task count from the blockchain
		electionCount = await App.electionList.electionCount()
		const candidatesCount = await App.electionList.candidatesCount()

		console.log("electionCount ........    ", electionCount.toNumber())
		console.log("candidatesCount ........    ", candidatesCount.toNumber())

		const $taskTemplate = $('.about_card')
	
		// Render out each task with a new task template
		for (var i = 1; i <= electionCount; i++) {
		  // Fetch the task data from the blockchain
		  const election = await App.electionList.elections(i)
		  console.log('>>>>> election names >>>>>>   ', election[1])
		  const electionId = election[0].toNumber()

		
			  // Create the html for the task
			  const $newTaskTemplate = $taskTemplate.clone()

			  $newTaskTemplate.removeClass("hide-div")
			  $newTaskTemplate.find('.election_name').html(election[1])
			  $newTaskTemplate.find('.vote-link').append('<a href="./vote.html/22">Vote</a>');

			  for (var j = 1; j <= candidatesCount; j++) {
				// Fetch the task data from the blockchain
				const cands = await App.electionList.candidates(j)
				console.log('>>>>> candidates names >>>>>>   ',cands[0].toNumber(),  cands[1])
				if(cands[0].toNumber() == electionId){
					let cand_name = cands[1]
					let num_of_votes = cands[2]
					let cand_ele = '<li class="list-group-item">'+cand_name +'<span class="badge">'+num_of_votes+'</span></li>'
					$newTaskTemplate.find('.candidates-names').append(cand_ele)

				}
	
			}
			 
			  $('#ele_list_container').append($newTaskTemplate)

		
		

		}



	  },

		addElectionName: async () =>{
			// App.setLoading(true)
			const election_title = $('#ele_title').val()

			await App.electionList.createElectionTitle(election_title)
			// window.location.reload()

		},
		addCandidate: async () =>{
			const election_id = electionCount.toNumber()+1
			const cand_name = $('#cand_name').val()

			console.log("election count in fun .... ", election_id)
			console.log("Candidates name .... ", cand_name)
			await App.electionList.addCandidates(election_id, cand_name)

		}
	
}


$(() => {

	$(window).on('load', function(){
		App.load()
	});

});
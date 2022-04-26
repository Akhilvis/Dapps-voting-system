

$(document).ready(function() {

	$('#add_cand_btn').click(function() {
		$("#cand_add_div").append("<span class='label label-success label-custom'>"+ $('#add_cand').val() +"</span>");
		$('#add_cand').val("")
	});

});
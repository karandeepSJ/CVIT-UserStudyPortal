window.onload = getscore;
function getscore() {
	$.ajax({
		url: 'getscore',
		type: 'GET',
		success: function(response){
			$('#correct').html(response.score)
			$('#total').html(response.total)
		},
		error: function(response){
		}
	});
}
window.onload = getscore;
function getscore() {
	$.ajax({
		url: 'getscore2',
		type: 'GET',
		success: function(response){
			$('#correct').html(response.score)
			$('#total').html(response.total)
			$('#roundnumber').html(response.total/5)
		},
		error: function(response){
		}
	});
}
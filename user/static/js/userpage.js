function abc(){
	$('#userform').submit(function(e) {
		e.preventDefault();
		submitUD();
	});
}
window.onload = abc;
function submitUD() {
	name = $('#name').val();
	age = $('#age').val();
	aff = $('#aff').val();
	$.ajax({
		url: 'getdet',
		type: 'POST',
		data: {
			'name': name,
			'age': age,
			'aff': aff,
		},
		success: function(response){
			window.location=response;
		},
		error: function(response){
		}
	});
}
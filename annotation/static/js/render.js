var clock = new THREE.Clock();

var camera, controls, scene, renderer, animation;
var mixer, skeletonHelper;
var use_vr = false;
var pause = false;
var pause_time = 0;
var maxTime = 30;
var pause_cnt = 0;
var replays = 0;
init();
animate();

var bvhLoader = new THREE.BVHLoader();
var fbxLoader = new THREE.FBXLoader();
var boneContainer = new THREE.Group();

function load_fbx(filename) {
	console.log("loading fbx: start")
	fbxLoader.load('/media/' + filename, function(result) {
		mixer = new THREE.AnimationMixer( result );
		var action = mixer.clipAction( result.animations[ 0 ] );
		action.play();
		result.traverse( function ( child ) {
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		} );
		scene.add( result );		

	}, console.log, console.log);
}

function load_bvh(filename){

	// Load predicted bvh file
	bvhLoader.load( '/media/' + filename, function ( result ) {
		skeletonHelper = new THREE.SkeletonHelper( result.skeleton.bones[ 0 ] );
		skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to SkeletonHelper directly

		
		boneContainer.add( result.skeleton.bones[ 0 ] );

		scene.add( skeletonHelper );
		scene.add( boneContainer );

		// play animation

		mixer = new THREE.AnimationMixer( skeletonHelper );
		animation = mixer.clipAction( result.clip )
		animation.setEffectiveWeight( 1.0 ).play();
		animation.setLoop(THREE.LoopOnce);
	});

}

function init() {

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 10, 1000 );
	camera.position.set( 400, 200, 200 );

	controls = new THREE.OrbitControls( camera );
	controls.minDistance = 200;
	controls.maxDistance = 500;

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xeeeeee );

	scene.add( new THREE.GridHelper( 400, 10 ) );

	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 0.8*window.innerWidth, 0.8*window.innerHeight );

	// VR settings
	effect = new THREE.StereoEffect(renderer);

	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	effect.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

	requestAnimationFrame( animate );

	if(!pause) {
		var delta = clock.getDelta();
		document.getElementById("time").innerHTML = "Time left: " + (30 - Math.min(30, parseInt(clock.elapsedTime - pause_time))) + " seconds"

		if ( mixer ) mixer.update( delta );

		if(use_vr){
			effect.render(scene,camera);
		}
		else{
			renderer.render( scene, camera );
		}

	}

	else
		pause_time += clock.getDelta();

	if(clock.elapsedTime - pause_time> maxTime) 
	{
		subForm();
		maxTime = 1000;
	}
}


var options_selected = []

function toggle_pause(){

	pause = !pause;
	
	pause_cnt += 1;

}

function replay(){
	replays += 1;
	// console.log(animation.enabled);
	animation.reset();
}

function toggle_vr(){
	use_vr = !use_vr;
}

function subForm()
{
	sel = $('input[name=guess]:checked').val();
	$.ajax({
		url: 'submit',
		type: 'POST',
		data: {
			'guess': sel,
			'num_pause': pause_cnt,
			'num_replay': replays,
		},
		success: function(response){
			if (response.status)
				$('.' + sel.replace(' ','_')).css('color','green');
			else
			{
				$('.' + sel.replace(' ','_')).css('color','red');
				$('.' + response.correctAnswer.replace(' ','_')).css('color','green');
			}
			var timeleft = 1;
			pause = true;
			var ttt = setInterval(function(){
			  timeleft -= 1;
			  if(timeleft<=0){
			  	on();
			  }

			  else if(timeleft <= -1){
			    clearInterval(timer);
			  }
			}, 1000);
		},
		error: function(response){
			location.reload();
		}
	})
}

function abc(){
	// load_fbx('files/fbx_files/ZombieKicking.fbx');
	load_fbx('files/fbx_files/untitled.fbx');
	console.log('hello')
	// $.ajax({
	// 	url: 'newvideo',
	// 	type: 'POST',
	// 	success: function(response){
	// 		bvh = response.bvhPath;
	// 		load_bvh(bvh);
	// 		$('#o1').html(response.o1);
	// 		$('#o2').html(response.o2);
	// 		$('#o3').html(response.o3);
	// 		$('#o4').html(response.o4);
	// 		$('#o1').addClass(response.o1.replace(' ', '_'));
	// 		$('#o2').addClass(response.o2.replace(' ', '_'));
	// 		$('#o3').addClass(response.o3.replace(' ', '_'));
	// 		$('#o4').addClass(response.o4.replace(' ', '_'));
	// 		$('#option1').val(response.o1);
	// 		$('#option2').val(response.o2);
	// 		$('#option3').val(response.o3);
	// 		$('#option4').val(response.o4);
	// 		$('#score').html("Score: " + response.correct + '/' + response.total);
	// 		curr_round = Math.floor(response.total/5)
	// 		if(response.total%5==0 && curr_round==response.round)
	// 		{
	// 			window.location = 'nextround';
	// 		}
	// 	},
	// 	error: function(response){
	// 		window.location = response.responseText;
	// 		// alert("There seems to be some error!")
	// 	}
	// })

	$('#formResponse').submit(function(e) {
		e.preventDefault();
		subForm();
	});
}
window.onload = abc;

function on() {
  document.getElementById("overlay").style.display = "block";
  pause_interval();
}

function off() {
  document.getElementById("overlay").style.display = "none";
} 

function pause_interval()
{
	var timeleft = 3;
	var timer = setInterval(function(){
	  document.getElementById("countdown").innerHTML = timeleft;
	  timeleft -= 1;
	  if(timeleft<=0){
		location.reload();    	  	
	  }

	  else if(timeleft <= -1){
	    clearInterval(timer);
	    document.getElementById("countdown").innerHTML = "";
	    off();
	  }
	}, 1000);
}
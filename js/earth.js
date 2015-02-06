// Created by Bjorn Sandvik - thematicmapping.org
(function () {

	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var width  = 1333,
		height = window.innerHeight;

	// Earth params
	var radius   = 5,
		segments = 32,
		starting = 20;
		rotation = 6;  

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 50;
	camera.position.y = 10;

	var renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5,3,5);
	scene.add(light);
 
    var sphere = createmercury(radius/5, segments);
	sphere.rotation.y = rotation;
    sphere.position.x=starting+10; 
	//scene.add(sphere)
	var clouds = createClouds(radius/5, segments);
	clouds.rotation.y = rotation;
	clouds.position.x=starting+10;
	//scene.add(clouds);
	var tgeometry = new THREE.TorusGeometry(starting+10, 0.01,5,100);
    var tmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    var torus = new THREE.Mesh( tgeometry, tmaterial );
    torus.rotation.x=0.5*Math.PI;
    torus.position.x=0;
    torus.add(sphere);
    torus.add(clouds);
    scene.add( torus );

    var venus = createvenus(radius/4, segments);
	venus.rotation.y = rotation;
    venus.position.x=starting+15; 
	var clouds_venus = createClouds(radius/5, segments);
	clouds_venus.rotation.y = rotation;
	clouds_venus.position.x=starting+15;
	var tgeometry_venus = new THREE.TorusGeometry(starting+15, 0.01,5,100);
	var torus_venus = new THREE.Mesh(tgeometry_venus, tmaterial );
    torus_venus.rotation.x=0.5*Math.PI;
    torus_venus.position.x=0;
    torus_venus.add(clouds_venus);
    torus_venus.add(venus)
    scene.add(torus_venus);
    
    var earth = createSphere(radius/3.5, segments);
	earth.rotation.x =-0.5*Math.PI;
    earth.position.x=starting+20; 
	var clouds_earth = createClouds(radius/3.5, segments);
	clouds_earth.rotation.y = rotation;
	clouds_earth.position.x=starting+20;
	var tgeometry_earth = new THREE.TorusGeometry(starting+20, 0.01,5,100);
	var torus_earth = new THREE.Mesh(tgeometry_earth, tmaterial );
    torus_earth.rotation.x=0.5*Math.PI;
    torus_earth.position.x=0;
    torus_earth.add(clouds_earth);
    torus_earth.add(earth)
    scene.add(torus_earth);


    var mars = createmars(radius/3.2, segments);
    mars.position.x=starting+25; 
    mars.rotation.x =-0.5*Math.PI;
	var tgeometry_mars = new THREE.TorusGeometry(starting+25, 0.01,5,100);
	var torus_mars = new THREE.Mesh(tgeometry_mars, tmaterial );
    torus_mars.position.x=0;
    torus_mars.rotation.x=0.5*Math.PI;
    torus_mars.add(mars)
    scene.add(torus_mars);
  

    var jupiter = createjupiter(radius, segments);
	jupiter.rotation.x =-0.5*Math.PI;
    jupiter.position.x=starting+35; 
	var clouds_jupiter = createClouds(radius, segments);
	clouds_jupiter.rotation.y = rotation;
	clouds_jupiter.position.x=starting+35;
	var tgeometry_jupiter = new THREE.TorusGeometry(starting+35, 0.01,5,100);
	var torus_jupiter = new THREE.Mesh(tgeometry_jupiter, tmaterial );
    torus_jupiter.rotation.x=0.5*Math.PI;
    torus_jupiter.position.x=0;
    torus_jupiter.add(clouds_jupiter);
    torus_jupiter.add(jupiter)
    scene.add(torus_jupiter);

    var ring_material = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('images/saturn_ring.jpg')}); 
    var circleGeometry = new THREE.CircleGeometry( radius, 32 );  
    var circleGeometry2 = new THREE.CircleGeometry( radius, 32 );  
    var circle = new THREE.Mesh(circleGeometry,ring_material ); 
    var circle2 = new THREE.Mesh(circleGeometry2,ring_material ); 
    circle2.rotation.x=-Math.PI;
    circle.rotation.z=Math.PI;
    circle.rotation.x=-Math.PI/2;
    circle2.rotation.x=Math.PI/2;

    var saturn = createsaturn(radius/1.7, segments);
    saturn.position.x=starting+45; 
    saturn.rotation.x =-0.5*Math.PI;
    saturn.add(circle);
    saturn.add(circle2);
	var tgeometry_saturn = new THREE.TorusGeometry(starting+45, 0.01,5,100);
	var torus_saturn = new THREE.Mesh(tgeometry_saturn, tmaterial );
    torus_saturn.position.x=0;
    torus_saturn.rotation.x=0.5*Math.PI;
    saturn.rotation.x=-Math.PI/3;
    torus_saturn.add(saturn)
    scene.add(torus_saturn);


    var U_ring_material = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('images/uranus_ring.png')}); 
    var U_circleGeometry = new THREE.CircleGeometry( radius, 32 );  
    var U_circleGeometry2 = new THREE.CircleGeometry( radius, 32 );  
    var U_circle = new THREE.Mesh(U_circleGeometry,U_ring_material ); 
    var U_circle2 = new THREE.Mesh(U_circleGeometry2,U_ring_material ); 
    U_circle2.rotation.x=-Math.PI;
    U_circle.rotation.z=Math.PI;
    U_circle.rotation.x=-Math.PI/2;
    U_circle2.rotation.x=Math.PI/2;

    var uranus = createuranus(radius/1.7, segments);
    uranus.position.x=starting+55; 
    uranus.rotation.x =-0.5*Math.PI;
    uranus.add(U_circle);
    uranus.add(U_circle2);
	var tgeometry_uranus = new THREE.TorusGeometry(starting+55, 0.01,5,100);
	var torus_uranus = new THREE.Mesh(tgeometry_uranus, tmaterial );
    torus_uranus.position.x=0;
    torus_uranus.rotation.x=0.5*Math.PI;
    uranus.rotation.x=-Math.PI/6;
    torus_uranus.add(uranus)
    scene.add(torus_uranus);


    var neptune = createneptune(radius/3.2, segments);
    neptune.position.x=starting+65; 
    neptune.rotation.x =-0.5*Math.PI;
	var tgeometry_neptune = new THREE.TorusGeometry(starting+65, 0.01,5,100);
	var torus_neptune = new THREE.Mesh(tgeometry_neptune, tmaterial );
    torus_neptune.position.x=0;
    torus_neptune.rotation.x=0.5*Math.PI;
    torus_neptune.add(neptune)
    scene.add(torus_neptune);

    var textureFlare0 = THREE.ImageUtils.loadTexture("images/lensflare/lensflare0.png");
    var textureFlare3 = THREE.ImageUtils.loadTexture("images/lensflare/lensflare3.png");

    var flareColor = new THREE.Color(0xffaacc);
    var lensFlare = new THREE.LensFlare(textureFlare0, 800, 0.0, THREE.AdditiveBlending, flareColor);

    lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);

    lensFlare.position.x=0;
    lensFlare.position.y=0;
    lensFlare.position.z=0;
    scene.add(lensFlare);
	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render(); 
	function render() {
		var speed=0.001;
		controls.update();
		sphere.rotation.z += 0.01;
		torus.rotation.z+=speed;
		clouds.rotation.z += 0.01;
		torus_venus.rotation.z+=speed/1.3;
		venus.rotation.z+=0.01;
		clouds_venus.rotation.z+=0.01;
		torus_earth.rotation.z+=speed/1.7;
		earth.rotation.y-=0.01;
		clouds_earth.rotation.z+=0.01;
        mars.rotation.y-=0.01;
        torus_mars.rotation.z+=speed/2;

        torus_jupiter.rotation.z+=speed/2.3;
		jupiter.rotation.y-=0.005;
		clouds_jupiter.rotation.z+=0.005;
        
        saturn.rotation.y+=0.005;  
        torus_saturn.rotation.z+=speed/2.7; 

        uranus.rotation.y+=0.0050;  
        torus_uranus.rotation.z+=speed/3; 
        
        neptune.rotation.y-=0.01;
        torus_neptune.rotation.z+=speed/3.5;

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				specular:    new THREE.Color('grey')								
			})
		);
	}
	function createmercury(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/mercury.jpg'),
			})
		);
	}
    function createvenus(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/venus.jpg'),
			})
		);
	}
	function createjupiter(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/jupiter2_1k.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpeg'),
			})
		);
	}
	function createmars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/mars.jpg'),
			})
		);
	}
	function createsaturn(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/saturn.jpg'),
			})
		);
	}
	function createuranus(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/uranus.jpg'),
				specularMap: THREE.ImageUtils.loadTexture('images/glow.jpg'),
				specular:    new THREE.Color('grey')
			})
		);
	}
    function createneptune(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/new_neptune.jpg'),
				specularMap: THREE.ImageUtils.loadTexture('images/glow.jpg'),
				specular:    new THREE.Color('grey')
			})
		);
	}

	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.005, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);		
	}
	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}

}());
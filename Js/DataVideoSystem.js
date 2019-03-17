//Funcion para crear la base de datos
//Creamos dos arrays von recursos y temporadas del sistema
var arrayResources = new Array();
var arraySeasons = new Array();

var version = 1;
nameDB = "VideoSystemDB";
//Funcion que crea la base de datos y las tablas que necesitamos
function createTables(){

	if(!window.indexedDB){
		window.alert("El navegador no implementa IndexedDB.");
	}

	var db = indexedDB.open(nameDB, version);

	//El onupgradneed se ejecutara la primera vez y nos establecera la estructura del IndexDB
	db.onupgradeneeded = function (e) {  
		
		var active = db.result;

		active.createObjectStore("categorias", { keyPath: 'name' });	
		active.createObjectStore("producciones", { keyPath: 'title'	});
		active.createObjectStore("actores", { keyPath: 'name' });
		active.createObjectStore("directores", { keyPath: 'name' });
		active.createObjectStore("usuarios", { keyPath: 'user' });

		active.createObjectStore("categoriaProduccion", { keyPath: 'category' });
		active.createObjectStore("directorProduccion", { keyPath: 'name' });
		active.createObjectStore("actorProduccion", { keyPath: 'name' });
	};
}

//Funcion que nos carga los valores iniciales desde el init en un tabla con los objets en un array
function loadDates(table,array) {
	
	var request = indexedDB.open(nameDB);
	
	request.onsuccess = function(event) {

		//La variable db es la base de datos, y abre la tabla con el nombre pasado en lectura/escritura
		var db = event.target.result;         
		
		var addObject = db.transaction([table],"readwrite").objectStore(table);
		
		for (var i in array) {
			
			var addObjectStore = addObject.add(array[i].getObject());
		
		}
		
	};
}

//Funcion que nos carga las relaciones iniciales entre objetos desde el init en una tabla
function loadRelations(table,objets) {

	var request = indexedDB.open(nameDB);

	request.onsuccess = function(event) {
		
		var db = event.target.result;         
		
		var addObject = db.transaction([table],"readwrite").objectStore(table);

		var addObjectStore = addObject.add(objets);

	};
}


//Funcion init que no proporcionara los datos iniciales que carga el videoSystem en la base
function initPopulate(){
	
	//Se crean los Person
	try {
		var persona1 = new Person("Shinkai","Makoto",new Date(1973,02,09),"","Img/Shinkai_Makoto.jpg");
		var persona2 = new Person("Martin","Campbell",new Date(1943,10,24),"","Img/Martin_Campbell.jpg");
		var persona3 = new Person("James","Cameron",new Date(1954,08,16),"","Img/James_Cameron.jpg");
		var persona4 = new Person("Todd", "Phillips",new Date(1970,12,20),"","Img/Todd_Phillips.jpg");
		var persona5 = new Person("Pete", "Docter",new Date(1968,10,09),"","Img/Pete_Docter.jpg");
		var persona6 = new Person("Chris", "Columbus", new Date(1958,09,10),"","Img/Chris_Columbus.jpg");
		var persona7 = new Person("Andy", "Muschietti", new Date(1973,08,26),"","Img/Andy_Muschietti.jpg");
		var persona8 = new Person("Kenji","Nagasaki",new Date(1979,02,12),"","Img/Kenji_Nagasaki.jpg");
		var persona9 = new Person("Vanesa","Romero",new Date(1978,06,04),"Torres","Img/Vanesa_Romero.jpg");
		var persona10 = new Person("Eva Maria","Isanta",new Date(1971,06,19),"Foncuberta","Img/Eva_Maria_Isanta.jpg");
		var persona11 = new Person("Katheryn","Winnick",new Date(1977,12,17),"","Img/Katheryn_Winnick.jpg");
		var persona12 = new Person("Jessalyn","Gilsig",new Date(1971,11,30),"","Img/Jessalyn_Gilsig.jpg");
	} catch (error) {
		console.log("" + error);
	}
    //Se crean los Category
	try {
		var category1 = new Category("Anime" , "Genero que representa los dibujos animados de procedencia japonesa.");
		var category2 = new Category("Accion" , "Es un género cinematográfico en el que prima la espectacularidad de las imágenes por medio de efectos especiales de estilo clásico");
		var category3 = new Category("Ciencia ficcion" , "Es un género cuyos contenidos se encuentran basados en supuestos logros científicos o técnicos que podrían lograrse en el futuro.");
		var category4 = new Category("Comedia" , "La comedia es un genero que presenta una mayoría de escenas y situaciones humorísticas o festivas, que buscan entretener al público y generar risas, con finales que suelen ser felices.");
		var category5 = new Category("Infantil","Es un genero destinado a un público de corta edad, adaptado a sus intereses y a su nivel de comprensión");
		var category6 = new Category("Fantasia", "Es un genero que se caracteriza por contener algún elemento de fantasía, por tenue que sea.");
		var category7 = new Category("Terror" , "Es un genero que se caracteriza por su voluntad de provocar en el espectador sensaciones de pavor, terror, miedo, disgusto, repugnancia, horror, incomodidad o preocupación.");
		
	} catch (error) {
		console.log("" + error);
	}
	//Se crean los Movie
    try {
		var movie1 = new Movie("Your name (Kimi no Na wa)",new Date(2016,08,26),"Japonesa","La “historia de milagros y amor” gira en torno a Mitsuha y Taki.","img/Your Name.jpg",null,null);
		var movie2 = new Movie("Casino Royale",new Date(2006,05,20),"Inglesa" ," La trama aborda los comienzos de James Bond como espía secreto, justo después de haber obtenido su licencia para matar. Tras prevenir un ataque terrorista en el Aeropuerto Internacional de Miami","img/Casino Royale.jpg",null,null);
		var movie3 = new Movie("Avatar",new Date(2009,02,15),"Americana","Ambientada en el año 2154 los acontecimientos que narra se desarrollan en Pandora","img/Avatar.jpg",null,coordenadas1);
		var movie4 = new Movie("Resacon en las Vegas",new Date(2009,06,05),"Americana","Doug Billings va a casarse con Tracy. Doug realizará una despedida de soltero en Las Vegas con sus amigos.","img/Resacon.jpg",null,null);
		var movie5 = new Movie("Up",new Date(2009,05,29),"Americana","La película comienza mostrando la vida de Carl Fredricksen, un niño que un día volviendo del cine conoce a una alocada niña, Ellie, que acabaría siendo su esposa.","img/Up.jpg",null,null);
		var movie6 = new Movie("Harry Potter y la piedra filosofal",new Date(2001,01,18),"Inglesa","Se describen las aventuras del joven aprendiz de magia y hechicería Harry Potter y sus amigos Hermione Granger y Ron Weasley, en su primer año en Hogwarts. ","img/Harry Potter.jpg",null,coordenadas2);
		var movie7 = new Movie("It",new Date(2017,09,09),"Americana","La película cuenta la historia de siete niños en Derry, Maine, que son aterrorizados por un ser epónimo, solo para hacer frente a sus propios demonios personales en el proceso.","img/It.jpg",null,null);
    } catch (error) {
        console.log("" + error);
	}
	//Se crean los Serie
	try {
		var serie1 = new Serie("Boku No Hero Academia",new Date(2016,04,03),"Japonesa","La historia tiene lugar en un mundo donde el 80% de la población ha desarrollado superpoderes, surgiendo así héroes y villanos, tal como en los cómics","img/Boku No Hero.jpg",[season1]);
		var serie2 = new Serie("La que se avecina",new Date(2007,04,22),"Española","La serie narra las aventuras y problemas cotidianos de una peculiar comunidad de vecinos de «alto standing» de la urbanizaciónn Mirador de Montepinar, un edificio ubicado en Madrid.","img/LQSA.jpg",[season1,season2,season3]);
		var serie3 = new Serie("Vikings",new Date(2013,03,03),"Canadiense","Vikings es una serie que está basada en las leyendas sobre el vikingo Ragnar Lodbrok, uno de los héroes más famosos de la cultura nórdica que saqueó Northumbria, Francia y Bretaña.","img/Vikings.jpg",[season1,season2]);

	} catch (error) {
		console.log("" + error);
    }
    //Se crean los Resource
	try {
		var recurso1 = new Resource("120","https://recurso1.com",["Español","Ingles"],["Español","Ingles"]);
		var recurso2 = new Resource("90","https://recurso2.com",["Español"],);
		var recurso3 = new Resource("60","https://recurso3.com",["Español"],["Español","Ingles"]);
		var recurso4 = new Resource("30","https://recurso4.com",["Español","Japones"],["Español","Japones"]);
	} catch (error) {
		console.log("" + error);
	}
    
	//Se crean los User
	try {
		var user1 = new User("usuario1","usuario1@gmail.com","usuario1");
		var user2 = new User("usuario2","usuario2@gmail.com","usuario2");
		var user3 = new User("usuario3","usuario3@gmail.com","usuario3");
		var user4 = new User("usuario4","usuario4@gmail.com","usuario4");
	} catch (error) {
		console.log("" + error);
	}
	//Se crean los Season
	try {
		var season1 = new Season("Temporada 1",["Episodio 1","Episodio 2","Episodio 3"]);
		var season2 = new Season("Temporada 2",["Episodio 1","Episodio 2",]);
		var season3 = new Season("Temporada 3",["Episodio 1",]);
        
	} catch (error) {
		console.log("" + error);
	}
    //Se crean los Coordinate
	try {
		var coordenadas1 = new Coordinate("29.326815","110.462510");
		var coordenadas2 = new Coordinate("51.691841","0.417538");
	} catch (error) {
		console.log("" + error);
	}

	//Se crean los Usuarios
	try {
		var user1 = new User("andres","andres@gmail.com","admin1");
		var user2 = new User("alba","alba@gmail.com","admin2");
		var userPrueba = new User("prueba","prueba@gmail.com","prueba");
	} catch (error) {
		console.log("" + error);
	}

	//Creamos VideoSystem
	try {
		var video = VideoSystem.getInstance();
	} catch (error) {
		console.log("" + error);
	}
	
	//Despues de crear los objetos se añaden al indexDB
	var arrayCategories = [category1,category2,category3,category4,category5,category6,category7];
	loadDates("categorias",arrayCategories);

	var arrayProductions = [movie1,movie2,movie3,movie4,movie5,movie6,movie7,serie1,serie2,serie3];
	loadDates("producciones",arrayProductions);
	
	var arrayDirectors = [persona1,persona2,persona3,persona4,persona5,persona6,persona7,persona8];
	loadDates("directores",arrayDirectors);

	var arrayActors = [persona9,persona10,persona11,persona12];
	loadDates("actores",arrayActors);
	
	//Se crea el array con los usuarios y se pasa a la funcion
	var arrayUsers = [user1,user2,userPrueba];
	loadDates("usuarios",arrayUsers);

	//Aparte de cargar datos a la base los mantendremos en el videoSystem para agilizar
	//Añadimos las categorias 
	try {
		video.addCategory(category1);
		video.addCategory(category2);
		video.addCategory(category3);
		video.addCategory(category4);
		video.addCategory(category5);
		video.addCategory(category6);
		video.addCategory(category7);
	} catch (error) {
		console.log("" + error);
	}

	//Añadimos las producciones
	try {
		video.addProduction(movie1);
		video.addProduction(movie2);
		video.addProduction(movie3);
		video.addProduction(movie4);
		video.addProduction(movie5);
		video.addProduction(movie6);
		video.addProduction(movie7);
		video.addProduction(serie1);
		video.addProduction(serie2);
		video.addProduction(serie3);
	} catch (error) {
		console.log("" + error);
	}

	//Añadimos los actores
	try {
		video.addActor(persona9);
		video.addActor(persona10);
		video.addActor(persona11);
		video.addActor(persona12);
	} catch (error) {
		console.log("" + error);
	}

	//Añadimos los directores
	try {
		video.addDirector(persona1);
		video.addDirector(persona2);
		video.addDirector(persona3);
		video.addDirector(persona4);
		video.addDirector(persona5);
		video.addDirector(persona6);
		video.addDirector(persona7);
		video.addDirector(persona8);
	} catch (error) {
		console.log("" + error);
	}

	//Añadimos los usuarios
	try {
		video.addUser(user1);
		video.addUser(user2);
		video.addUser(userPrueba);
	} catch (error) {
		console.log("" + error);
	}

	//Aqui tambien mantendremos las relaciones en el videoSystem aparte de cargarlos en la base de datos
	//Asociamos las categorias y las producciones
	try {
		var prodCategory1 = {category: category1.name, productions: [movie1.getObject(),serie1.getObject()] };
		loadRelations("categoriaProduccion",prodCategory1);
		video.assignCategory(category1,movie1);
		video.assignCategory(category1,serie1);

		var prodCategory2 = {category: category2.name, productions: [movie2.getObject(),serie3.getObject()] };
		loadRelations("categoriaProduccion",prodCategory2);
		video.assignCategory(category2,movie2);
		video.assignCategory(category2,serie3);

		var prodCategory3 = {category: category3.name, productions: [movie3.getObject()] };
		loadRelations("categoriaProduccion",prodCategory3);
		video.assignCategory(category3,movie3);

		var prodCategory4 = {category: category4.name, productions: [movie4.getObject(),serie2.getObject()] };
		loadRelations("categoriaProduccion",prodCategory4);
		video.assignCategory(category4,movie4);
		video.assignCategory(category4,serie2);

		var prodCategory5 = {category: category5.name, productions: [movie5.getObject()] };
		loadRelations("categoriaProduccion",prodCategory5);
		video.assignCategory(category5,movie5);

		var prodCategory6 = {category: category6.name, productions: [movie6.getObject()] };
		loadRelations("categoriaProduccion",prodCategory6);
		video.assignCategory(category6,movie6);

		var prodCategory7 = {category: category7.name, productions: [movie7.getObject()] };
		loadRelations("categoriaProduccion",prodCategory7);
		video.assignCategory(category7,movie7);
		//video.deassignCategory(category7,movie7);
	} catch (error) {
		console.log("" + error);
	}

	//Asociamos los actores y las producciones
	try {
		var actorProd1 = {name: persona9.name, productions: [serie2.getObject()] };
		loadRelations("actorProduccion",actorProd1);
		video.assignActor(persona9,serie2);

		var actorProd2 = {name: persona10.name, productions: [serie2.getObject()] };
		loadRelations("actorProduccion",actorProd2);
		video.assignActor(persona10,serie2);

		var actorProd3 = {name: persona11.name, productions: [serie3.getObject()] };
		loadRelations("actorProduccion",actorProd3);
		video.assignActor(persona11,serie3);

		var actorProd4 = {name: persona12.name, productions: [serie3.getObject()] };
		loadRelations("actorProduccion",actorProd4);
		video.assignActor(persona12,serie3);
		//video.deassignActor(persona12,serie3);
	} catch (error) {
		console.log("" + error);
	}

	//Asociamos los directores y las producciones
	try {
		var directorProd1 = {name: persona1.name, productions: [movie1.getObject()] };
		loadRelations("directorProduccion",directorProd1);
		video.assignDirector(persona1,movie1);

		var directorProd2 = {name: persona2.name, productions: [movie2.getObject()] };
		loadRelations("directorProduccion",directorProd2);
		video.assignDirector(persona2,movie2);

		var directorProd3 = {name: persona3.name, productions: [movie3.getObject()] };
		loadRelations("directorProduccion",directorProd3);
		video.assignDirector(persona3,movie3);

		var directorProd4 = {name: persona4.name, productions: [movie4.getObject()] };
		loadRelations("directorProduccion",directorProd4);
		video.assignDirector(persona4,movie4);

		var directorProd5 = {name: persona5.name, productions: [movie5.getObject()] };
		loadRelations("directorProduccion",directorProd5);
		video.assignDirector(persona5,movie5);

		var directorProd6 = {name: persona6.name, productions: [movie6.getObject()] };
		loadRelations("directorProduccion",directorProd6);
		video.assignDirector(persona6,movie6);

		var directorProd7 = {name: persona7.name, productions: [movie7.getObject()] };
		loadRelations("directorProduccion",directorProd7);
		video.assignDirector(persona7,movie7);
		
		var directorProd8 = {name: persona8.name, productions: [serie1.getObject()] };
		loadRelations("directorProduccion",directorProd8);
		video.assignDirector(persona8,serie1);
		//video.deassignDirector(persona8,serie1);
	} catch (error) {
		console.log("" + error);
	}
	
}

//Funcion que mostrara el menu navegable
function menuPopulate(){

	var menu = document.getElementById("menu");

	while (menu.firstChild) {
		menu.removeChild(menu.firstChild);
		}

	var array = ["Inicio","Categorias","Producciones","Actores","Directores"];
	var arrayHref = [showHomePage,showCategories,showProductions,showActors,ShowDirectors];

	var ul = document.createElement("ul");
	ul.setAttribute("class","nav nav-tabs");

	for (var cont=0 ; cont< 5; cont++) {
		
		var li = document.createElement("li");
		li.setAttribute("class","nav-item btn");
		var a = document.createElement("a");
		a.setAttribute("class","nav-link font-weight-bold text-white");
		li.addEventListener("click",arrayHref[cont]);
		var text = document.createTextNode(array[cont]);
		a.appendChild(text);

		menu.appendChild(ul);
		ul.appendChild(li);
		li.appendChild(a);
	}

}

//funcion que nos mostrara la pagina de incio 
function showHomePage() {
	
	var show = document.getElementById("Nombre");
	show.innerHTML = "Ustream Tv";

	var contentP = document.getElementById("principal");
	contentP.setAttribute("class","d-flex");

	while (contentP.firstChild) {
		contentP.removeChild(contentP.firstChild);
		}

	var divList = document.createElement("ul");
	divList.setAttribute("class","list-group mt-5 mr-5");
	divList.setAttribute("style","width:20%");

	contentP.appendChild(divList);

	//Aqui estableceremos como se han de recorrer los datos, ahora se hara desde indexDb de la siguiente manera
	var request = indexedDB.open(nameDB);

	request.onsuccess = function(event) {

		var db = event.target.result;         
		var objectStore = db.transaction(["categorias"],"readonly").objectStore("categorias");
		//Abre un cursor y reccorre los datos devueltos 
		objectStore.openCursor().onsuccess = function(event) {
			
			var category = event.target.result;

			if (category) {

				var butEle = document.createElement("button");
				butEle.setAttribute("class","list-group-item list-group-item-action text-center btn");
				butEle.setAttribute("value",category.value.name);
				var textB = document.createTextNode(category.value.name);
				butEle.appendChild(textB);
		
				divList.appendChild(butEle);
		
				butEle.addEventListener("click",showProductionsC);

			category.continue();
			}
		}
	}

	var divCatd = document.createElement("div");
	divCatd.setAttribute("style","width:80%;");
	divCatd.setAttribute("class","d-flex flex-column align-items-center border boder-secondary");

	var prodDes = document.createElement("h5");
	prodDes.setAttribute("class","text-center mb-3");
	var textP = document.createTextNode("Producciones destacadas");
	prodDes.appendChild(textP);

	var div1 = document.createElement("div");
	div1.setAttribute("class","carousel slide mb-5");
	div1.setAttribute("data-ride","carousel");
	div1.setAttribute("style","width:50%")

	var div2 = document.createElement("div");
	div2.setAttribute("class","carousel-inner");

	divCatd.appendChild(prodDes);
	divCatd.appendChild(div1);
	div1.appendChild(div2);

	var count = 0;

	var request2 = indexedDB.open(nameDB);

	request2.onsuccess = function(event) {

		var db = event.target.result;         
		var objectStore = db.transaction(["producciones"],"readonly").objectStore("producciones");
		//Abre un cursor y reccorre los datos devueltos 
		objectStore.openCursor().onsuccess = function(event) {
			
			var production = event.target.result;

			if (production) {

				if ( count <= 0 ) {

					var div3 = document.createElement("div");
					div3.setAttribute("class","carousel-item active");

					var imgC = document.createElement("img");
					imgC.setAttribute("class","d-block w-100");
					imgC.setAttribute("src",production.value.image);
					imgC.setAttribute("alt",production.value.title);

					
					div2.appendChild(div3);
					div3.appendChild(imgC);

					count = count+1;

				} else {

					var div3 = document.createElement("div");
					div3.setAttribute("class","carousel-item");

					var imgC = document.createElement("img");
					imgC.setAttribute("class","d-block w-100");
					imgC.setAttribute("src","img/"+production.value.title+".jpg");
					imgC.setAttribute("alt",production.value.title);

					div2.appendChild(div3);
					div3.appendChild(imgC);
				}
				production.continue();
			}
		}
	}			

	var titleF = document.createElement("h5");
	titleF.setAttribute("class","text-center mb-1");
	var textF = document.createTextNode("Iniciar Sesion.");
	titleF.appendChild(textF);

	var formS = document.createElement("form");
	formS.setAttribute("class","mb-1 mt-2");
	formS.setAttribute("style","width:80%");
	formS.setAttribute("name","iniSesion");
	formS.setAttribute("id","formSesion");
	
	var divF1 = document.createElement("div");
	divF1.setAttribute("class","form-group");
	var labF1 = document.createElement("label");
	labF1.setAttribute("for","inputUser");
	var inpF1 = document.createElement("input");
	inpF1.setAttribute("type","text");
	inpF1.setAttribute("id","inputUser");
	inpF1.setAttribute("name","inputUser");
	inpF1.setAttribute("class","form-control");
	inpF1.setAttribute("placeholder","Usuario");
	
	var divF2 = document.createElement("div");
	divF2.setAttribute("class","form-group");
	var labF2 = document.createElement("label");
	labF2.setAttribute("for","inputPasswd");
	var inpF2 = document.createElement("input");
	inpF2.setAttribute("type","password");
	inpF2.setAttribute("id","inputPasswd");
	inpF2.setAttribute("name","inputPasswd");
	inpF2.setAttribute("class","form-control");
	inpF2.setAttribute("placeholder","Contraseña");

	var brIse = document.createElement ("button");
	brIse.setAttribute("class","btn btn-secondary btn-lg mb-3");
	brIse.setAttribute("id","buttonIse");
	brIse.setAttribute("type","button");
	brIse.setAttribute("value","");
	var textBIse = document.createTextNode("Iniciar Sesion");
	brIse.appendChild(textBIse);

	divCatd.appendChild(titleF);
	divCatd.appendChild(formS);
	formS.appendChild(divF1);
	divF1.appendChild(labF1);
	divF1.appendChild(inpF1);
	formS.appendChild(divF2);
	divF2.appendChild(labF2);
	divF2.appendChild(inpF2);
	formS.appendChild(brIse);

	brIse.addEventListener("click", initSession);

	var divInS = document.createElement("div");
	divInS.setAttribute("id","divinfose");
	divInS.setAttribute("class","mb-3 text-primary text-center");

	divCatd.appendChild(divInS);

	var closeT = document.createElement("h5");
	closeT.setAttribute("class","text-center mb-3");
	var textC = document.createTextNode("Cerrar todas las ventanas abiertas.");
	closeT.appendChild(textC);

	var brCs = document.createElement ("button");
	brCs.setAttribute("class","btn btn-secondary btn-lg mb-3");
	brCs.setAttribute("id","buttonP");
	brCs.setAttribute("type","button");
	brCs.setAttribute("value","");
	var textBCs = document.createTextNode("Cerrar");
	brCs.appendChild(textBCs);

	brCs.addEventListener("click", closeWindows);

	divCatd.appendChild(closeT);
	divCatd.appendChild(brCs);

	contentP.appendChild(divCatd);

	window.onload = checkCookie();
}

//Ahora Crearemos una funcion que nos mostrara las categorias
function showCategories(){

	var cookieExist = getCookie("userName");

	var show = document.getElementById("Nombre");
	show.innerHTML = "Categorias";

	var contentP = document.getElementById("principal");
	contentP.setAttribute("class","row");

	while (contentP.firstChild) {
	contentP.removeChild(contentP.firstChild);
	}

	if (cookieExist !== "") {
		
		var columN = document.createElement("div");
		columN.setAttribute("class","col-6 col-md-4 mb-4");
		var contentN = document.createElement("div");
		contentN.setAttribute("class","card");
		var image = document.createElement("img");
		image.setAttribute("class","card-img-top");

		image.setAttribute("src","img/categorias.jpg");
		image.setAttribute("alt","Gestionar categoria");

		var body = document.createElement("div");
		body.setAttribute("class","card-body");
		var paragraph = document.createElement("h5");
		paragraph.setAttribute("class","card-text font-weight-bold");
		paragraph.setAttribute("style","max-height:45px; overflow:hidden; min-height:45px");
		var text = document.createTextNode("Gestionar categorias");
		paragraph.appendChild(text);

		var divbuttons = document.createElement("div");
		divbuttons.setAttribute = ("class","d-flex justify-content-between");

		var button1 = document.createElement("button");
		button1.setAttribute("class","btn btn-primary");
		button1.setAttribute("id","buttonC");
		button1.setAttribute("type","button");
		button1.setAttribute("value","");
		var textB = document.createTextNode("Gestionar");
		button1.appendChild(textB);
		
		contentP.appendChild(columN);
		columN.appendChild(contentN);
		contentN.appendChild(body);
		body.appendChild(image);
		body.appendChild(paragraph);
		body.appendChild(divbuttons);
		divbuttons.appendChild(button1);

		button1.addEventListener("click",formCategory);

	}

	var request = indexedDB.open(nameDB);

	request.onsuccess = function(event) {

		var db = event.target.result;         
		var objectStore = db.transaction(["categorias"],"readonly").objectStore("categorias");
		//Abre un cursor y reccorre los datos devueltos 
		objectStore.openCursor().onsuccess = function(event) {
			
			var category = event.target.result;

			if (category) {

				var colum = document.createElement("div");
				colum.setAttribute("class","col-6 col-md-4 mb-4");
				var content = document.createElement("div");
				content.setAttribute("class","card");
				var image = document.createElement("img");
				image.setAttribute("class","card-img-top");

				image.setAttribute("src","img/"+category.value.name+".jpg");
				image.setAttribute("alt",category.value.name);

				var body = document.createElement("div");
				body.setAttribute("class","card-body");
				var paragraph = document.createElement("h5");
				paragraph.setAttribute("class","card-text font-weight-bold");
				paragraph.setAttribute("style","max-height:45px; overflow:hidden; min-height:45px");
				var text = document.createTextNode(category.value.name);
				paragraph.appendChild(text);

				var divbuttons = document.createElement("div");
				divbuttons.setAttribute("class","d-flex justify-content-between");

				var button = document.createElement("button");
				button.setAttribute("class","btn btn-primary");
				button.setAttribute("id","buttonC");
				button.setAttribute("type","button");
				button.setAttribute("value",category.value.name);
				var textB = document.createTextNode("Ver Producciones");
				button.appendChild(textB);

				contentP.appendChild(colum);
				colum.appendChild(content);
				content.appendChild(body);
				body.appendChild(image);
				body.appendChild(paragraph);
				body.appendChild(divbuttons);
				divbuttons.appendChild(button);
				
				button.addEventListener("click",showProductionsC);
				category.continue();
			}
		}
	}
	
}

//Funcion que mostrara las producciones a partir de una categoria. FALTA MODIFICAR POR NO RELACIONES
function showProductionsC(){
	
	var cat = this.value;
	var show = document.getElementById("Nombre");
	show.innerHTML = "Producciones de "+cat;

	var contentP = document.getElementById("principal");
	contentP.setAttribute("class","row");

	while (contentP.firstChild) {
	contentP.removeChild(contentP.firstChild);
	}

	//Se tienen que poner las producciones de una categoria en concreto.
	var search = false;
	video = VideoSystem.getInstance();
	var categories = video.categories;
	var category = categories.next();
	while ((category.done !== true) && (!search)){

		if (category.value.name == this.value) {
			
			//comienza el iterador de las categorias del boton seleccionado
			var productions = video.getProductionsCategory(category.value);
			var production = productions.next();
			while (production.done !== true){

				var colum = document.createElement("div");
				colum.setAttribute("class","col-6 col-md-4 mb-4");
				var content = document.createElement("div");
				content.setAttribute("class","card");
				var image = document.createElement("img");
				image.setAttribute("class","card-img-top");

				image.setAttribute("src",production.value.image);
				image.setAttribute("alt",production.value.title);

				var body = document.createElement("div");
				body.setAttribute("class","card-body");
				var paragraph = document.createElement("p");
				paragraph.setAttribute("class","card-text font-weight-bold");
				paragraph.setAttribute("style","min-height:45px ; max-height:45px ; overflow:hidden");
				var text = document.createTextNode(production.value.title);
				paragraph.appendChild(text);

				var button = document.createElement("button");
				button.setAttribute("class","btn btn-primary");
				button.setAttribute("id","buttonC");
				button.setAttribute("type","button");
				button.setAttribute("value",production.value.title);
				var textB = document.createTextNode("Ver Produccion");
				button.appendChild(textB);
				
				contentP.appendChild(colum);
				colum.appendChild(content);
				content.appendChild(body);
				body.appendChild(image);
				body.appendChild(paragraph);
				body.appendChild(button);

				button.addEventListener("click",showProductionAlone);
				
				production = productions.next();
			}

			search = true;
		}
		
		category = categories.next();
	}
}

//Funcion que mostrara las producciones desde el menu
function showProductions(){

	var cookieExist = getCookie("userName");

	var show = document.getElementById("Nombre");
	show.innerHTML = "Producciones";

	var contentP = document.getElementById("principal");
	contentP.setAttribute("class","row");

	while (contentP.firstChild) {
	contentP.removeChild(contentP.firstChild);
	}

	if (cookieExist !== "") {
		
		var columN = document.createElement("div");
		columN.setAttribute("class","col-6 col-md-4 mb-4");
		var contentN = document.createElement("div");
		contentN.setAttribute("class","card");
		var image = document.createElement("img");
		image.setAttribute("class","card-img-top");

		image.setAttribute("src","img/producciones.jpg");
		image.setAttribute("alt","Gestionar Producciones");

		var body = document.createElement("div");
		body.setAttribute("class","card-body");
		var paragraph = document.createElement("h5");
		paragraph.setAttribute("class","card-text font-weight-bold");
		paragraph.setAttribute("style","max-height:45px; overflow:hidden; min-height:45px");
		var text = document.createTextNode("Gestionar producciones");
		paragraph.appendChild(text);

		var divbuttons = document.createElement("div");
		divbuttons.setAttribute = ("class","d-flex justify-content-between");

		var button1 = document.createElement("button");
		button1.setAttribute("class","btn btn-primary");
		button1.setAttribute("id","buttonC");
		button1.setAttribute("type","button");
		button1.setAttribute("value","");
		var textB = document.createTextNode("Gestionar");
		button1.appendChild(textB);
		
		contentP.appendChild(columN);
		columN.appendChild(contentN);
		contentN.appendChild(body);
		body.appendChild(image);
		body.appendChild(paragraph);
		body.appendChild(divbuttons);
		divbuttons.appendChild(button1);

		button1.addEventListener("click",formProduction);

	}

	var request = indexedDB.open(nameDB);

    request.onsuccess = function(event) {

        var db = event.target.result;         
        var objectStore = db.transaction(["producciones"],"readonly").objectStore("producciones");
        //Abre un cursor y reccorre los datos devueltos 
        objectStore.openCursor().onsuccess = function(event) {
            
            var production = event.target.result;

            if (production) {

				var colum = document.createElement("div");
				colum.setAttribute("class","col-6 col-md-4 mb-4");
				var content = document.createElement("div");
				content.setAttribute("class","card");
				var image = document.createElement("img");
				image.setAttribute("class","card-img-top");

				image.setAttribute("src",production.value.image);
				image.setAttribute("alt",production.value.title);

				var body = document.createElement("div");
				body.setAttribute("class","card-body");
				var paragraph = document.createElement("p");
				paragraph.setAttribute("class","card-text font-weight-bold");
				paragraph.setAttribute("style","min-height:45px ; max-height:45px ; overflow:hidden");
				var text = document.createTextNode(production.value.title);
				paragraph.appendChild(text);

				var button = document.createElement("button");
				button.setAttribute("class","btn btn-primary");
				button.setAttribute("id","buttonC");
				button.setAttribute("type","button");
				button.setAttribute("value",production.value.title);
				var textB = document.createTextNode("Ver Produccion");
				button.appendChild(textB);
						
				contentP.appendChild(colum);
				colum.appendChild(content);
				content.appendChild(body);
				body.appendChild(image);
				body.appendChild(paragraph);
				body.appendChild(button);

				button.addEventListener("click",showProductionAlone);
				production.continue();
            }
        }
    }
	
}

//Funcion que mostrara los actores desde el menu
function showActors(){

	var cookieExist = getCookie("userName");
	
	var show = document.getElementById("Nombre");
	show.innerHTML = "Actores";

	var contentP = document.getElementById("principal");
	contentP.setAttribute("class","row");

	while (contentP.firstChild) {
	contentP.removeChild(contentP.firstChild);
	}

	if (cookieExist !== "") {
		
		var columN = document.createElement("div");
		columN.setAttribute("class","col-6 col-md-4 mb-4");
		var contentN = document.createElement("div");
		contentN.setAttribute("class","card");
		var image = document.createElement("img");
		image.setAttribute("class","card-img-top");

		image.setAttribute("src","img/persona.png");
		image.setAttribute("alt","Gestionar Actores");

		var body = document.createElement("div");
		body.setAttribute("class","card-body");
		var paragraph = document.createElement("h5");
		paragraph.setAttribute("class","card-text font-weight-bold");
		paragraph.setAttribute("style","max-height:45px; overflow:hidden; min-height:45px");
		var text = document.createTextNode("Gestionar actores");
		paragraph.appendChild(text);

		var divbuttons = document.createElement("div");
		divbuttons.setAttribute = ("class","d-flex justify-content-between");

		var button1 = document.createElement("button");
		button1.setAttribute("class","btn btn-primary");
		button1.setAttribute("id","buttonC");
		button1.setAttribute("type","button");
		button1.setAttribute("value","");
		var textB = document.createTextNode("Gestionar");
		button1.appendChild(textB);
		
		contentP.appendChild(columN);
		columN.appendChild(contentN);
		contentN.appendChild(body);
		body.appendChild(image);
		body.appendChild(paragraph);
		body.appendChild(divbuttons);
		divbuttons.appendChild(button1);

		button1.addEventListener("click",formPerson);

	}

	var request = indexedDB.open(nameDB);

    request.onsuccess = function(event) {

        var db = event.target.result;         
        var objectStore = db.transaction(["actores"],"readonly").objectStore("actores");
        //Abre un cursor y reccorre los datos devueltos 
        objectStore.openCursor().onsuccess = function(event) {
            
            var actor = event.target.result;

            if (actor) {

				var colum = document.createElement("div");
				colum.setAttribute("class","col-6 col-md-4 mb-4");
				var content = document.createElement("div");
				content.setAttribute("class","card");
				var image = document.createElement("img");
				image.setAttribute("class","card-img-top");
				image.setAttribute("src",actor.value.picture);
				image.setAttribute("alt",actor.value.name);

				var body = document.createElement("div");
				body.setAttribute("class","card-body");
				var paragraph = document.createElement("p");
				paragraph.setAttribute("class","card-text font-weight-bold");
				paragraph.setAttribute("style","max-height:45px; overflow:hidden; min-height:45px");
				var text = document.createTextNode(actor.value.name+" "+actor.value.lastName1);
				paragraph.appendChild(text);

				var button = document.createElement("button");
				button.setAttribute("class","btn btn-primary");
				button.setAttribute("id","buttonC");
				button.setAttribute("type","button");
				button.setAttribute("value",actor.value.name);
				var textB = document.createTextNode("Biografia");
				button.appendChild(textB);
				
				contentP.appendChild(colum);
				colum.appendChild(content);
				content.appendChild(body);
				body.appendChild(image);
				body.appendChild(paragraph);
				body.appendChild(button);

				button.addEventListener("click",showActorAlone);
				actor.continue();
            }
        }
    }

	
}

//Funcion que mostrara los directores
function ShowDirectors() {

	var cookieExist = getCookie("userName");
	
	var show = document.getElementById("Nombre");
	show.innerHTML = "Directores";

	var contentP = document.getElementById("principal");
	contentP.setAttribute("class","row");

	while (contentP.firstChild) {
	contentP.removeChild(contentP.firstChild);
	}

	if (cookieExist !== "") {
		
		var columN = document.createElement("div");
		columN.setAttribute("class","col-6 col-md-4 mb-4");
		var contentN = document.createElement("div");
		contentN.setAttribute("class","card");
		var image = document.createElement("img");
		image.setAttribute("class","card-img-top");

		image.setAttribute("src","img/persona.png");
		image.setAttribute("alt","Gestionar Directores");

		var body = document.createElement("div");
		body.setAttribute("class","card-body");
		var paragraph = document.createElement("h5");
		paragraph.setAttribute("class","card-text font-weight-bold");
		paragraph.setAttribute("style","max-height:45px; overflow:hidden; min-height:45px");
		var text = document.createTextNode("Gestionar Directores");
		paragraph.appendChild(text);

		var divbuttons = document.createElement("div");
		divbuttons.setAttribute = ("class","d-flex justify-content-between");

		var button1 = document.createElement("button");
		button1.setAttribute("class","btn btn-primary");
		button1.setAttribute("id","buttonC");
		button1.setAttribute("type","button");
		button1.setAttribute("value","");
		var textB = document.createTextNode("Gestionar");
		button1.appendChild(textB);
		
		contentP.appendChild(columN);
		columN.appendChild(contentN);
		contentN.appendChild(body);
		body.appendChild(image);
		body.appendChild(paragraph);
		body.appendChild(divbuttons);
		divbuttons.appendChild(button1);

		button1.addEventListener("click",formPerson);

	}

	var request = indexedDB.open(nameDB);

    request.onsuccess = function(event) {

        var db = event.target.result;         
        var objectStore = db.transaction(["directores"],"readonly").objectStore("directores");
        //Abre un cursor y reccorre los datos devueltos 
        objectStore.openCursor().onsuccess = function(event) {
            
            var director = event.target.result;

            if (director) {

				var colum = document.createElement("div");
				colum.setAttribute("class","col-6 col-md-4 mb-4");
				var content = document.createElement("div");
				content.setAttribute("class","card");
				var image = document.createElement("img");
				image.setAttribute("class","card-img-top");

				image.setAttribute("src",director.value.picture);
				image.setAttribute("alt",director.value.name);

				var body = document.createElement("div");
				body.setAttribute("class","card-body");
				var paragraph = document.createElement("p");
				paragraph.setAttribute("class","card-text font-weight-bold");
				var text = document.createTextNode(director.value.name+" "+director.value.lastName1);
				paragraph.appendChild(text);

				var button = document.createElement("button");
				button.setAttribute("class","btn btn-primary");
				button.setAttribute("id","buttonC");
				button.setAttribute("type","button");
				button.setAttribute("value",director.value.name);
				var textB = document.createTextNode("Biografia");
				button.appendChild(textB);
				
				contentP.appendChild(colum);
				colum.appendChild(content);
				content.appendChild(body);
				body.appendChild(image);
				body.appendChild(paragraph);
				body.appendChild(button);

				button.addEventListener("click",showDirectorAlone);
                director.continue();
            }
        }
    }


}

//Funcion que muestra a un solo actor con su informacion.
function showActorAlone(){

	var nameActor = this.value;
	
	var show = document.getElementById("Nombre");
	show.innerHTML = "Actores";

	var contentP = document.getElementById("principal");

	while (contentP.firstChild) {
	contentP.removeChild(contentP.firstChild);
	}

	var request1 = indexedDB.open(nameDB);

	request1.onsuccess = function(event) {
	
		var db = event.target.result;         
		var objectStore = db.transaction(["actores"],"readonly").objectStore("actores");
		
		var object = objectStore.get(nameActor);
	
		object.onsuccess = function(event) {
			var actor = object.result;
			
			var content = document.createElement("div");
			content.setAttribute("class", "d-flex")
			content.setAttribute("class","col-3");
			var image = document.createElement("img");

			image.setAttribute("src",actor.picture);
			image.setAttribute("alt",actor.name);
			image.setAttribute("style","max-heigth:150px;");
			image.setAttribute("class", "border border-info");

			var info = document.createElement("div");
			info.setAttribute("class", "ml-3");
			info.setAttribute("class","col-9");

			var title1 = document.createElement("h6");
			var text1 = document.createTextNode("Nombre:");
			title1.appendChild(text1);
			var name = document.createElement("p");
			var textN = document.createTextNode(actor.name);
			name.appendChild(textN);

			var title2 = document.createElement("h6");
			var text2 = document.createTextNode("Apellido:");
			title2.appendChild(text2);
			var surname = document.createElement("p");
			var textS = document.createTextNode(actor.lastName1);
			surname.appendChild(textS);

			var title3 = document.createElement("h6");
			var text3 = document.createTextNode("Fecha de nacimiento:");
			title3.appendChild(text3);
			var date = document.createElement("p");
			var textD = document.createTextNode(actor.born.toLocaleDateString());
			date.appendChild(textD);

			var title4 = document.createElement("h6");
			var text4 = document.createTextNode("Filmografia:");
			title4.appendChild(text4);
				
			contentP.appendChild(content);
			contentP.appendChild(info);
			content.appendChild(image);
			info.appendChild(title1);
			info.appendChild(name);
			info.appendChild(title2);
			info.appendChild(surname);
			info.appendChild(title3);
			info.appendChild(date);
			info.appendChild(title4);

			var prod =document.createElement("div");
			prod.setAttribute("class","d-flex");
			info.appendChild(prod);

			var request2 = indexedDB.open(nameDB);

			request2.onsuccess = function(event) {

				var db = event.target.result;         
				var objectStore = db.transaction(["actorProduccion"],"readonly").objectStore("actorProduccion");

				var object = objectStore.get(nameActor);
				object.onsuccess = function(event) {
					
					//Crea un array con las producciones de ese director
					var prodA = event.target.result.productions;
					for (var i = 0; i < prodA.length; i++) {

						var divI = document.createElement("div");
						divI.setAttribute("class", "mr-2 text-center");

						var image2 = document.createElement("img");
						image2.setAttribute("src",prodA[i].image);
						image2.setAttribute("alt",prodA[i].image);
						image2.setAttribute("style", "height: 80px");
						image2.setAttribute("class","d-block mb-1");

						var b1 = document.createElement ("button");
						b1.setAttribute("class","btn btn-default btn-sm mb-1");
						b1.setAttribute("id","buttonP");
						b1.setAttribute("type","button");
						b1.setAttribute("value",prodA[i].title);
						var textBt = document.createTextNode(prodA[i].title);
						b1.appendChild(textBt);

						b1.addEventListener("click",showProductionAlone);

						prod.appendChild(divI);
						divI.appendChild(image2);
						divI.appendChild(b1);
					}
				};
			};
		};
	};
	
}

//funcion que muestra a un solo director con su informacion
function showDirectorAlone(){

	var nameDirector = this.value;

	var show = document.getElementById("Nombre");
	show.innerHTML = "Actores";

	var contentP = document.getElementById("principal");

	while (contentP.firstChild) {
	contentP.removeChild(contentP.firstChild);
	}

	var request1 = indexedDB.open(nameDB);

	request1.onsuccess = function(event) {
	
		var db = event.target.result;         
		var objectStore = db.transaction(["directores"],"readonly").objectStore("directores");
		
		var object = objectStore.get(nameDirector);
	
		object.onsuccess = function(event) {
			var director = object.result;

			var content = document.createElement("div");
			content.setAttribute("class", "d-flex")
			content.setAttribute("class","col-3");
			var image = document.createElement("img");

			image.setAttribute("src",director.picture);
			image.setAttribute("alt",director.name);
			image.setAttribute("style","max-heigth:300px;");
			image.setAttribute("class", "border border-info");

			var info = document.createElement("div");
			info.setAttribute("class", "ml-3");
			info.setAttribute("class","col-9");

			var title1 = document.createElement("h6");
			var text1 = document.createTextNode("Nombre:");
			title1.appendChild(text1);
			var name = document.createElement("p");
			var textN = document.createTextNode(director.name);
			name.appendChild(textN);

			var title2 = document.createElement("h6");
			var text2 = document.createTextNode("Apellido:");
			title2.appendChild(text2);
			var surname = document.createElement("p");
			var textS = document.createTextNode(director.lastName1);
			surname.appendChild(textS);

			var title3 = document.createElement("h6");
			var text3 = document.createTextNode("Fecha de nacimiento:");
			title3.appendChild(text3);
			var date = document.createElement("p");
			var textD = document.createTextNode(director.born.toLocaleDateString());
			date.appendChild(textD);

			var title4 = document.createElement("h6");
			var text4 = document.createTextNode("Filmografia:");
			title4.appendChild(text4);
				
			contentP.appendChild(content);
			contentP.appendChild(info);
			content.appendChild(image);
			info.appendChild(title1);
			info.appendChild(name);
			info.appendChild(title2);
			info.appendChild(surname);
			info.appendChild(title3);
			info.appendChild(date);
			info.appendChild(title4);

			var prod =document.createElement("div");
			prod.setAttribute("class","d-flex");
			info.appendChild(prod);

			//Abre la conexion con la base de datos
			var request2 = indexedDB.open(nameDB);

			request2.onsuccess = function(event) {

				var db = event.target.result;         
				var objectStore = db.transaction(["directorProduccion"],"readonly").objectStore("directorProduccion");

				var object = objectStore.get(nameDirector);
				object.onsuccess = function(event) {
					
					//Crea un array con las producciones de ese director
					var prodD = event.target.result.productions;
					for (var i = 0; i < prodD.length; i++) {
				
						var divI = document.createElement("div");
						divI.setAttribute("class", "mr-2 text-center");

						var image2 = document.createElement("img");
						image2.setAttribute("src",prodD[i].image);
						image2.setAttribute("alt",prodD[i].image);
						image2.setAttribute("style", "height: 80px");
						image2.setAttribute("class","d-block mb-1");

						var b1 = document.createElement ("button");
						b1.setAttribute("class","btn btn-default btn-sm mb-1");
						b1.setAttribute("id","buttonP");
						b1.setAttribute("type","button");
						b1.setAttribute("value",prodD[i].tile);
						var textBt = document.createTextNode(prodD[i].title);
						b1.appendChild(textBt);

						b1.addEventListener("click",showProductionAlone);

						prod.appendChild(divI);
						divI.appendChild(image2);
						divI.appendChild(b1);
					}
				};
			};
		};
	};			
	
}

//funcion que muestra los datos de una produccion.
function showProductionAlone(){

	var titleProduction = this.value;
	
	var show = document.getElementById("Nombre");
	show.innerHTML = "Produccion";

	var contentP = document.getElementById("principal");

	while (contentP.firstChild) {
	contentP.removeChild(contentP.firstChild);
	}

	var request1 = indexedDB.open(nameDB);

	request1.onsuccess = function(event) {
	
		var db = event.target.result;         
		var objectStore = db.transaction(["producciones"],"readonly").objectStore("producciones");
		
		var object = objectStore.get(titleProduction);
	
		object.onsuccess = function(event) {
			var production = object.result;
			
			var content = document.createElement("div");
			content.setAttribute("class", "d-flex");
			content.setAttribute("class","col-3");
			var image = document.createElement("img");

			image.setAttribute("src",production.image);
			image.setAttribute("alt",production.title);
			image.setAttribute("style","max-heigth:300px;");
			image.setAttribute("class", "border border-info");

			var info = document.createElement("div");
			info.setAttribute("class", "ml-3");
			info.setAttribute("class","col-9");

			var title1 = document.createElement("h6");
			var text1 = document.createTextNode("Titulo:");
			title1.appendChild(text1);
			var name = document.createElement("p");
			name.setAttribute("id","prodN");
			var textN = document.createTextNode(production.title);
			name.appendChild(textN);

			var title2 = document.createElement("h6");
			var text2 = document.createTextNode("Nacionalidad:");
			title2.appendChild(text2);
			var nationality = document.createElement("p");
			var textNa = document.createTextNode(production.nationality);
			nationality.appendChild(textNa);

			
			var title3 = document.createElement("h6");
			title3.setAttribute("class", "mt-2")
			var text3 = document.createTextNode("Publicacion:");
			title3.appendChild(text3);
			var publication = document.createElement("p");
			var textP = document.createTextNode(production.publication.toLocaleDateString());
			publication.appendChild(textP);

			var title4 = document.createElement("h6");
			title4.setAttribute("class", "mt-2")
			var text4 = document.createTextNode("Sinopsis:");
			title4.appendChild(text4);
			var synopsis = document.createElement("p");
			var textS = document.createTextNode(production.synopsis);
			synopsis.appendChild(textS);

			contentP.appendChild(content);
			contentP.appendChild(info);
			content.appendChild(image);
			info.appendChild(title1);
			info.appendChild(name);
			info.appendChild(title2);
			info.appendChild(textNa);
			info.appendChild(title3);
			info.appendChild(publication);
			info.appendChild(title4);
			info.appendChild(synopsis);

			if(production.value instanceof Movie){

				var titleR = document.createElement("h6");
				titleR.setAttribute("class", "mt-2")
				var textR = document.createTextNode("Recurso:");
				titleR.appendChild(textR);

				var br = document.createElement ("button");
				br.setAttribute("class","btn btn-default btn-sm mb-1");
				br.setAttribute("id","buttonP");
				br.setAttribute("type","button");
				br.setAttribute("value",production.title);
				var textBr = document.createTextNode("Ver");
				br.appendChild(textBr);

				info.appendChild(titleR);
				info.appendChild(br);

				br.addEventListener("click", openWindows);

			}else{

				var titleR = document.createElement("h6");
				titleR.setAttribute("class", "mt-2")
				var textR = document.createTextNode("Temporadas:");
				titleR.appendChild(textR);

				var br = document.createElement ("button");
				br.setAttribute("class","btn btn-default btn-sm mb-1");
				br.setAttribute("id","buttonP");
				br.setAttribute("type","button");
				br.setAttribute("value",production.title);
				var textBr = document.createTextNode("Ver");
				br.appendChild(textBr);

				info.appendChild(titleR);
				info.appendChild(br);

				br.addEventListener("click", openWindows);

			}

			var title5 = document.createElement("h6");
			title5.setAttribute("class", "mt-2")
			var text5 = document.createTextNode("Director:");
			title5.appendChild(text5);

			info.appendChild(title5);

			var prod =document.createElement("div");
			prod.setAttribute("class","d-flex");
			info.appendChild(prod);

			//Para mostrar los directores
			var request2 = indexedDB.open(nameDB);

			request2.onsuccess = function(event) {
		
			var db = event.target.result;         
			var objectStore = db.transaction(["directores"],"readonly").objectStore("directores");
				//Abre un cursor y reccorre los datos devueltos 
				objectStore.openCursor().onsuccess = function(event) {
					
					var director = event.target.result;
		
					if (director) {
				
						var Dn = (director.value.name);
						var Di = (director.value.picture);
						var Dn = (director.value.name);
						var Dnl = (director.value.name+" "+director.value.lastName1);
						//Abre la conexion con la base de datos
						var request2 = indexedDB.open(nameDB);

						request2.onsuccess = function(event) {

							var db = event.target.result;         
							var objectStore = db.transaction(["directorProduccion"],"readonly").objectStore("directorProduccion");

							var object = objectStore.get(Dn);

							object.onsuccess = function(event) {
								
								var prodD = event.target.result;
								
								for (var i = 0; i < prodD.productions.length; i++) {
								
									if (prodD.productions[i].title == titleProduction) {
									
									var divI = document.createElement("div");
									divI.setAttribute("class", "mr-2 text-center");

									var image2 = document.createElement("img");
									image2.setAttribute("src",Di);
									image2.setAttribute("alt",Dnl);
									image2.setAttribute("style", "height: 80px");
									image2.setAttribute("class","d-block mb-1");

									var b1 = document.createElement ("button");
									b1.setAttribute("class","btn btn-default btn-sm mb-1");
									b1.setAttribute("id","buttonP");
									b1.setAttribute("type","button");
									b1.setAttribute("value",Dn);
									var textBt = document.createTextNode(Dnl);
									b1.appendChild(textBt);

									b1.addEventListener("click",showDirectorAlone);

									prod.appendChild(divI);
									divI.appendChild(image2);
									divI.appendChild(b1);

									}
								}
							}
								
						}
						director.continue();
					}
				}
			}

			var title6 = document.createElement("h6");
			title6.setAttribute("class", "mt-2")
			var text6 = document.createTextNode("Reparto:");
			title6.appendChild(text6);

			info.appendChild(title6);

			var prod2 =document.createElement("div");
			prod2.setAttribute("class","d-flex");
			info.appendChild(prod2);

			//Para mostrar los actores
			
			var request3 = indexedDB.open(nameDB);

			request3.onsuccess = function(event) {
		
			var db = event.target.result;         
			var objectStore = db.transaction(["actores"],"readonly").objectStore("actores");
				//Abre un cursor y reccorre los datos devueltos 
				objectStore.openCursor().onsuccess = function(event) {
					
					var actor = event.target.result;
		
					if (actor) {
				
						var An = (actor.value.name);
						var Ai = (actor.value.picture);
						var An = (actor.value.name);
						var Anl = (actor.value.name+" "+actor.value.lastName1);
						//Abre la conexion con la base de datos
						var request2 = indexedDB.open(nameDB);

						request2.onsuccess = function(event) {

							var db = event.target.result;         
							var objectStore = db.transaction(["actorProduccion"],"readonly").objectStore("actorProduccion");

							var object = objectStore.get(An);

							object.onsuccess = function(event) {
								
								var prodA = event.target.result;
								
								for (var i = 0; i < prodA.productions.length; i++) {
									
									if (prodA.productions[i].title == titleProduction) {

									var divI = document.createElement("div");
									divI.setAttribute("class", "mr-2 text-center");

									var image2 = document.createElement("img");
									image2.setAttribute("src",Ai);
									image2.setAttribute("alt",An);
									image2.setAttribute("style", "height: 80px");
									image2.setAttribute("class","d-block mb-1");

									var b1 = document.createElement ("button");
									b1.setAttribute("class","btn btn-default btn-sm mb-1");
									b1.setAttribute("id","buttonP");
									b1.setAttribute("type","button");
									b1.setAttribute("value",An);
									var textBt = document.createTextNode(Anl);
									b1.appendChild(textBt);

									b1.addEventListener("click",showActorAlone);

									prod2.appendChild(divI);
									divI.appendChild(image2);
									divI.appendChild(b1);

									}
								}
							}
								
						}
						actor.continue();
					}
				}
			}				
		}
	}
}

var arrayWindows = new Array();

function openWindows() {
	if (window.name.open){

		window.name.focus();

	} else {

	var newWindow = window.open("Window.html",this.value,"toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=250,width=500,height=500");
	arrayWindows.push(newWindow);

	}
}

function closeWindows() {
	
	var index = 0;

	if (!arrayWindows.length !== 0) {
		
		while ( index < arrayWindows.length) {
			console.log("entra al while");
			arrayWindows[index].close();
			arrayWindows.splice(index, 1);
		}
	}
}

function showResource() {

	var prod = document.getElementById("prodN").innerHTML;

	for ( let index = 0 ; index < arrayWindows.length ; index++){
		if (arrayWindows[index].name === prod) {
			var windowS = arrayWindows[index];
		}
	}

	var contentP = windowS.document.getElementById("data");

	var search = false;
	var video = VideoSystem.getInstance();
	var productions = video.productions;
	var production = productions.next();
	while ((production.done !== true) && (!search)){

		if (production.value.title == prod) {

			var content = document.createElement("div");
			content.setAttribute("class", "d-flex");
			content.setAttribute("class","col-3");
			var image = document.createElement("img");

			image.setAttribute("src",production.value.image);
			image.setAttribute("alt",production.value.title);
			image.setAttribute("style","max-heigth:300px;");
			image.setAttribute("class", "border border-info");

			var info = document.createElement("div");
			info.setAttribute("class", "ml-3");
			info.setAttribute("class","col-9");

			var title1 = document.createElement("h6");
			var text1 = document.createTextNode("Titulo:");
			title1.appendChild(text1);
			var name = document.createElement("p");
			var textN = document.createTextNode(production.value.title);
			name.appendChild(textN);

			var title2 = document.createElement("h6");
			var text2 = document.createTextNode("Nacionalidad:");
			title2.appendChild(text2);
			var nationality = document.createElement("p");
			var textNa = document.createTextNode(production.value.nationality);
			nationality.appendChild(textNa);

			
			var title3 = document.createElement("h6");
			title3.setAttribute("class", "mt-2")
			var text3 = document.createTextNode("Publicacion:");
			title3.appendChild(text3);
			var publication = document.createElement("p");
			var textP = document.createTextNode(production.value.publication.toLocaleDateString());
			publication.appendChild(textP);

			var title4 = document.createElement("h6");
			title4.setAttribute("class", "mt-2")
			var text4 = document.createTextNode("Sinopsis:");
			title4.appendChild(text4);
			var synopsis = document.createElement("p");
			var textS = document.createTextNode(production.value.synopsis);
			synopsis.appendChild(textS);

			contentP.appendChild(content);
			contentP.appendChild(info);
			content.appendChild(image);
			info.appendChild(title1);
			info.appendChild(name);
			info.appendChild(title2);
			info.appendChild(textNa);
			info.appendChild(title3);
			info.appendChild(publication);
			info.appendChild(title4);
			info.appendChild(synopsis);

			if(production.value instanceof Movie){

				var titleR = document.createElement("h6");
				titleR.setAttribute("class", "mt-2")
				var textR = document.createTextNode("Recurso:");
				titleR.appendChild(textR);
				var resource = document.createElement("p");
				var textR2 = document.createTextNode(production.value.resource);
				resource.appendChild(textR2);

				var titleL = document.createElement("h6");
				titleL.setAttribute("class", "mt-2")
				var textL = document.createTextNode("Localizaciones:");
				titleL.appendChild(textL);
				var locations = document.createElement("p");
				var textL2 = document.createTextNode(production.value.locations);
				locations.appendChild(textL2);

				info.appendChild(titleR);
				info.appendChild(resource);
				info.appendChild(titleL);
				info.appendChild(locations);

			}

			if(production.value instanceof Serie) {

				var titleS = document.createElement("h6");
				titleS.setAttribute("class", "mt-2")
				var textS = document.createTextNode("Temporadas:");
				titleS.appendChild(textS);
				var seasons = document.createElement("p");
				var textS = document.createTextNode(production.value.seasons);
				seasons.appendChild(textS);

				info.appendChild(titleS);
				info.appendChild(seasons);

			}

			search = true;

		}
		production = productions.next();
	}

}

//Funcion que inicia y carga la base de datos.
function init(){
	createTables();
	initPopulate();
	menuPopulate();
	showHomePage();


}

window.onload = init;
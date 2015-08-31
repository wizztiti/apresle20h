var app = {

	/*================  INIT  ==============*/
	init: function () {

		$(document).ready(function() {
			app.verticalAlignCenter();
		});

		$( window ).resize(function() {
                app.verticalAlignCenter();
            });


		document.widthScreen = $("body").outerWidth(true);
		document.onHome = true;
		document.page = "";
		document.rubrique= "";
		document.zoomImage = new Array(null,false,false,false,false);
		document.audioOnPlay = false;
		document.btnSound = false;
		document.fichiersAudio = ["vide", "01"];
		document.BonFichierAudio = true;

		$(".blackArea .content p").delay(1000).animate({"opacity" : 1},1500);
		//$(".menu .li").on("click", app.clickOnLi);
		audioPlayer.init();
		audioPlayer.loadAudio();
		app.reInitOnClick();
	},


	/*================  REINITIALISATION DES EVENEMENTS ==============*/
	reInitOnClick : function() {  // Reinitialise les écouteurs d'évenement apres chargement d'une page.
		$(".menu .li").off();
		$(".infrarouge_Couverture img").off();
		$(".pauseAudio").off();
		$(".startAudio").off();
		$(".menu .li").on("click", app.clickOnLi);
		$(".infrarouge_Couverture img").on("click", app.clickOnCouvInfrarouge); // clic sur image de couverture	
		$(".pauseAudio").on("click", function() {
			app.pauseAudio();
			app.afficheStartAudio();
			document.audioOnPlay = false;
		});
		$(".startAudio").on("click", function() {
			app.startAudio();
			app.affichePauseAudio();
			document.audioOnPlay = true;
		});
		mybox.init(); // clic sur les liens videos.
	},


	/*================  REINITIALISATION VARIABLES ==============*/
	reInitVariablesPages : function () {
		document.zoomImage = Array(null,false,false,false,false);
	},
	
	/*================  CLIC SUR UN DES MENUS ==============*/
	clickOnLi : function(e) {
		e.preventDefault();
		//$("#"+document.rubrique).css({color: "#444444", "background-color": "#444444"}); // les li du menu reprennent leur color initiale.
		document.page = $(this).attr("id");
		document.rubrique = $(this).attr("class").slice(3);
		mybox.close();

		if(document.rubrique == "references") {
			document.fichiersAudio[1] = "02";
		} else {
			document.fichiersAudio[1] = "01";
		};

		if(document.onHome) {
			app.animeHome();
		} else {
			$(".whiteArea .content").animate({"opacity" : 0},500, function () {
					app.chargePage(document.page);
				});
		};
	},
	

	/*================  CHARGEMENT et AFFICHAGE DES PAGES ==============*/
	chargePage : function(page) {
		app.reInitVariablesPages();
		$(".btn_sound").css({opacity: 1});
		$(".whiteArea .content").load("pages/" + page + ".html");
		//setTimeout(function() {app.reInitOnClick();}, 10); // utilisation de setTimeout résoud bug.
		app.setAudio(document.fichiersAudio[1]);

		// Si la rubrique a changé reload la piste. La joue si lecture était active.
		if(!(app.verifPisteAudio())) {
			audioPlayer.loadAudio();
			if(document.audioOnPlay) {
				app.startAudio();
			} else {
				app.startAudio();
				app.pauseAudio();
			};
		};

		app.affichePage();
	},
	
	affichePage : function() {
		
		$(".whiteArea .content").animate({"opacity" : 0},1, function() {	
    			app.verticalAlignCenter();
			}
		);
		
		$(".whiteArea .content").delay(500).animate({"opacity" : 1},500, function() {
    			app.reInitOnClick();
			}
		);
		// Affiche le bouton PauseSon si pas déjà affiché.
		if(!document.btn_sound) {
			app.startAudio();
			app.affichePauseAudio();
			document.btn_sound = true;
			document.audioOnPlay = true;
		};

		//$("#"+document.rubrique).css({color: "#019ad4", "background-color": "#019ad4"}); // le menu sélectionné garde sa couleur.
	},
	

	/*================  SI 1ER CLIC SUR LE MENU  ==============*/
	animeHome : function() {
		// Le conteneur du logo se déplace à gauche
		$( ".blackArea .content" ).animate({left: -291}, 1000,'easeOutQuart');
		
		// Le conteneur de la zone blanche se déplace à droite puis se vide
		$( ".whiteArea .menu" ).animate({left: 700}, 1300, 'easeOutQuart', function() {
				$(".whiteArea .content").css({
					"opacity" : 0.001
				});
				$(".blackArea .content").append( $(".whiteArea .menu") );
			}
		);

		// La zone noire se déplace à gauche avec une leger retard sur le logo
		$( ".blackArea").delay(300).animate({left: -(document.widthScreen / 2)}, 1000, function() {
				$(this).css({
					left 	: 0, 
					width 	: 350,
					opacity : 0
				});

				$( ".blackArea .content" ).css({
					left 	: 0
				});

				$( ".blackArea .content .menu" ).css({
					"visibility" : "visible"
				});
				
				$(this).animate({
					"opacity" : 1
				}, 2000); // la zone est rendue visible

				$(this).css({position: "fixed"});

				$(".whiteArea").css({
					position: "absolute",
					width: 765,
					float: "left",
					"margin-left": 350
				});

				$(".whiteArea .content").addClass("article");
				document.onHome = false;
				app.chargePage(document.page);
			}
		);
	},
	
	/*================  CLIC SUR COUVERTURE INFRAROUGE  ==============*/
	clickOnCouvInfrarouge : function() {
		var idCouv = parseInt($(this).parent().attr("id"));
		//alert(document.zoomImage);

		if(document.page == "infrarouge") { // code pour la page infrarouge

			if(document.zoomImage[idCouv]){
				$(this).css({width: 110});
			} else {
				$(this).css({width: 230});
			};
			document.zoomImage[idCouv] = !document.zoomImage[idCouv];

			if(document.zoomImage[1] || document.zoomImage[2] || document.zoomImage[3] || document.zoomImage[4]) {
				$("#div_infrarouge_Couverture").css({height: 200});
			} else {
				$("#div_infrarouge_Couverture").css({height: 130});
			};
			app.verticalAlignCenter();

		} else {							// code pour la page welcome

			if(document.zoomImage[idCouv]){
				$(this).css({width: 110});
				$(".infrarouge_Couverture").not("#"+idCouv).css({display:"inline"});
			} else {
				$(this).css({width: 230});
				$(".infrarouge_Couverture").not("#"+idCouv).css({display:"none"});
			}
			document.zoomImage[idCouv] = !document.zoomImage[idCouv];
		};
		
	},


	/*================  GESTION PISTE AUDIO  ==============*/
	pauseAudio : function() {
		audioPlayer.pauseAudio();
	},

	startAudio : function() {
		//alert(document.rubrique + "  " + document.fichiersAudio[0]);
		audioPlayer.startAudio();
		document.fichiersAudio[0] = document.fichiersAudio[1];
	},

	affichePauseAudio : function() {
		$(".startAudio").css({visibility: "hidden"});
		$(".pauseAudio").css({visibility: "visible"});
	},

	afficheStartAudio : function() {
		$(".startAudio").css({visibility: "visible"});
		$(".pauseAudio").css({visibility: "hidden"});
	},

	setAudio : function(file) {
		var fichierSon = file;
		$(".audioDemo source").remove();
		$(".audioDemo").append('<source src="assets/sounds/'+ fichierSon +'.ogg" type="audio/ogg">');
		$(".audioDemo").append('<source src="assets/sounds/'+ fichierSon +'.mp3" type="audio/mpeg">');
	},

	verifPisteAudio : function() {
		if(document.fichiersAudio[0] != document.fichiersAudio[1]) {
			return false
		} else {
			return true;
		};
	},

	/*=============  GESTION ALIGNEMENT VERTICAL   ========*/

	verticalAlignCenter : function () {
		//$(document).ready(function() {
			$(".vertical-align-center").each(function() {
				var elemHeight = 0;
				var $elem = $(this);
				elemHeight = $elem.height();
				if (elemHeight == 0) {
					//alert("élément pas encore chargé");
					return;
				}	// perhap's an element is no loaded
					
				var $container = $elem.parent();
				var marginTop = Math.floor(($container.height() - elemHeight) / 2);
				if (marginTop > 40) {
					$elem.css("margin-top", marginTop);
				} else {
					$elem.css("margin-top", 40);
				}
				//$elem.removeClass("vertical-align-center");
			});
        //});
	}

}; // fin de app
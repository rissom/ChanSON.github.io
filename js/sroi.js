
// // Instantiate a slider
// var mySlider = $("#ex1Slider").slider();

// console.log (mySlider)

// // Call a method on the slider
// var value = mySlider.slider('getValue');

// console.log (value);

// // For non-getter methods, you can chain together commands
//     mySlider
//         .slider('setValue', 50)
//         

// For non-getter methods, you can chain together commands
// mySlider.setValue(90);



var rToFixed = function(x, digits){
	return (Math.round(Math.pow(10,digits)*x)/Math.pow(10,digits)).toFixed(digits);
};


// does what it says
var updateValues = function(){

	// calculate values
	var zuschuss 	= sl1.getValue();
	var personen 	= sl2.getValue();
	var dauer 	 	= sl3.getValue();
	var wirksamkeit = sl4.getValue();
 
	wirksamkeit = ((wirksamkeit - dauer) >= 0) ? wirksamkeit : dauer;

	const grundsicherung = 446;
	const wohnungsfoerderung = 300;
	const sozialversicherung = 250;
	const steuer = 100;
	var summe_monatl_kosten = grundsicherung + wohnungsfoerderung +sozialversicherung;
	var lohn_AN_Brutto = 1536;
	var kosten_AG_Butto = 1.3*lohn_AN_Brutto;

	let monate_dauer_J1 = dauer > 12? 12 : dauer; 
	let monate_dauer_J2 = dauer > 24? 12 : Math.max(dauer - 12,0);
	let monate_dauer_J3 = dauer > 36? 12 : Math.max(dauer - 24,0);

	let monate_Wirksamkeit_J1 = wirksamkeit > 12? 12 : wirksamkeit; 
	let monate_Wirksamkeit_J2 = wirksamkeit > 24? 12 : Math.max(wirksamkeit - 12,0);
	let monate_Wirksamkeit_J3 = wirksamkeit > 36? 12 : Math.max(wirksamkeit - 24,0);

	var einsparungen_bund = [];
	einsparungen_bund[0] = personen * monate_Wirksamkeit_J1 * steuer;
	einsparungen_bund[1] = personen * monate_Wirksamkeit_J2 * steuer;
	einsparungen_bund[2] = personen * monate_Wirksamkeit_J3 * steuer;

	var einsparungen_kommune = [];
	einsparungen_kommune[0] = personen * (monate_Wirksamkeit_J1 * summe_monatl_kosten - monate_dauer_J1 * zuschuss);
	einsparungen_kommune[1] = personen * (monate_Wirksamkeit_J2 * summe_monatl_kosten - monate_dauer_J2 * zuschuss);
	einsparungen_kommune[2] = personen * (monate_Wirksamkeit_J3 * summe_monatl_kosten - monate_dauer_J3 * zuschuss);


	var einsparungen_gesamt = [];
	einsparungen_gesamt[0] = einsparungen_kommune[0] + einsparungen_bund[0];
	einsparungen_gesamt[1] = einsparungen_kommune[1] + einsparungen_bund[1];
	einsparungen_gesamt[2] = einsparungen_kommune[2] + einsparungen_bund[2];

	var einsparungen_gesamt_gesamt = einsparungen_gesamt.reduce( (x,y) => x+y);
	var invest = (zuschuss * personen * dauer);
	var sROI = einsparungen_gesamt_gesamt / invest;


	// show rounded values 
	$("#Einsparungen_K_J1").text(einsparungen_kommune[0]);
	$("#Einsparungen_K_J2").text(einsparungen_kommune[1]);
	$("#Einsparungen_K_J3").text(einsparungen_kommune[2]);
	// sum it up
	$("#Einsparungen_K_Gesamt").text(einsparungen_kommune.reduce( (x,y) => x+y));

	$("#Einsparungen_B_J1").text(einsparungen_bund[0]);
	$("#Einsparungen_B_J2").text(einsparungen_bund[1]);
	$("#Einsparungen_B_J3").text(einsparungen_bund[2]);
	// sum it up
	$("#Einsparungen_B_Gesamt").text(einsparungen_bund.reduce( (x,y) => x+y));	

	$("#Einsparungen_G_J1").text(einsparungen_gesamt[0],2);
	$("#Einsparungen_G_J2").text(einsparungen_gesamt[1],2);
	$("#Einsparungen_G_J3").text(einsparungen_gesamt[2],2);
	// sum it up
	$("#Einsparungen_G_Gesamt").text(einsparungen_gesamt.reduce( (x,y) => x+y));	

	$("#Zuschuss").text(zuschuss);
	$("#Personen").text(personen);
	$("#Zuschuss").text(rToFixed(zuschuss,2));
	$("#Dauer").text(dauer);
	$("#SROI").text(rToFixed(sROI,2));
	$("#Wirksamkeit").text(wirksamkeit);
};

// Disable scrolling
document.ontouchstart = function(e){
	e.preventDefault();
};

// Instantiate sliders
var sl1 = new Slider("#slider1", {});
var sl2 = new Slider("#slider2", {});
var sl3 = new Slider("#slider3", {});
var sl4 = new Slider("#slider4", {});

sl1.on("change", function(){
	updateValues();
});

sl2.on("change", function(){
	updateValues();
});

sl3.on("change", function(){
	updateValues();
});

sl4.on("change", function(){
	updateValues();
});

// print initial values
updateValues();

// go fullscreen
var doc = window.document;
var docEl = doc.documentElement;

var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
requestFullScreen.call(docEl);
}
else {
cancelFullScreen.call(doc);
}



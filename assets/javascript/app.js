'use strict';

$(document).ready(function() {
	

	// var displayed = undefined;
	var gif_urls = [];
	var pic1_urls = [];
	var pic2_urls = [];
	var vid1_urls = [];
	var vid2_urls = [];
	var vid3_urls = [];
	var wiki_urls = [];



	// test existing url with Isotope for masonry image layout
	var test_urls = [
		'https://3.bp.blogspot.com/-W__wiaHUjwI/Vt3Grd8df0I/AAAAAAAAA78/7xqUNj8ujtY/s1600/image02.png',
		'http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg',
		'http://i.dailymail.co.uk/i/pix/2016/04/13/00/331D901800000578-3536787-image-a-11_1460503122350.jpg',
		'http://www.w3schools.com/css/trolltunga.jpg',
		'https://cdn.eso.org/images/thumb300y/eso1119b.jpg',
		'http://i.amz.mshcdn.com/Pp-86XPbUlVRkvX2sj1JNKduDRc=/fit-in/1200x9600/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F176275%2FGettyImages-587925244.jpg',
		'https://sky.easypano.com/EPSUpload2/Pano/2016/04-21/06/635968169644343116/560_315.jpg',
		'http://i.dailymail.co.uk/i/pix/2015/12/31/22/2FB5D51500000578-3380690-image-a-5_1451601920278.jpg',
		'https://static01.nyt.com/images/2016/08/22/insider/22insider-caption-image/22insider-caption-image-thumbStandard.jpg',
		'http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg',
		'http://i.dailymail.co.uk/i/pix/2016/04/13/00/331D901800000578-3536787-image-a-11_1460503122350.jpg',
		'http://www.w3schools.com/css/trolltunga.jpg',
		'https://cdn.eso.org/images/thumb300y/eso1119b.jpg',
		'http://i.amz.mshcdn.com/Pp-86XPbUlVRkvX2sj1JNKduDRc=/fit-in/1200x9600/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F176275%2FGettyImages-587925244.jpg',
		'https://sky.easypano.com/EPSUpload2/Pano/2016/04-21/06/635968169644343116/560_315.jpg',
		'http://i.dailymail.co.uk/i/pix/2015/12/31/22/2FB5D51500000578-3380690-image-a-5_1451601920278.jpg',
		'https://static01.nyt.com/images/2016/08/22/insider/22insider-caption-image/22insider-caption-image-thumbStandard.jpg'
	];



	// Imgur client ID
	var imgur_clientID = '6441b815d2612cc';



	// Copy to clipboard function using clipboard.js library
	var clipboard = new Clipboard('.btn');



	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBwdhl2V_gyP4QRxVsv9vvf7MiR8StxSTk",
		authDomain: "replyhub-32280.firebaseapp.com",
		databaseURL: "https://replyhub-32280.firebaseio.com",
		storageBucket: "",
	};
	
	firebase.initializeApp(config);

	var dataRef = firebase.database();



	// external js: isotope.pkgd.js, imagesloaded.pkgd.js
	// Initialize Isotope
	var $grid = $('.grid').isotope({
	    itemSelector: '.grid-item',
	    percentPosition: true,
	    masonry: {
		    columnWidth: '.grid-sizer'
	    }
	}); 

	// layout Isotope after each image loads
	$grid.imagesLoaded().progress( function() {
		$grid.isotope('layout');
	});


	var query = '';



	// Data validation. Form cannot be empty or less than 2 characters
	function formValidation() {

		var x = document.forms["searchForm"]["searchField"].value;

		if (x == "" || x.length < 2 || x == null) {
			$("#searchForm").effect("shake", {times: 3}, 500);
			return false;
	    }

	}

	// hide placeholder on 'focus'
	$('#search').on('focus', function() {

		if(this.placeholder == 'Search') {
			this.placeholder = '';
		}
	// show placeholder on 'blur'
	}).on('blur', function() {

		if(this.placeholder == '') {
			this.placeholder = 'Search';
		}

	});





	//=================================================================
	//	data-type tab events
	//=================================================================


	$('#picsIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#picsContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#EAAF48');

	});


	$('#gifsIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#gifsContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#E76737');

	});


	$('#vidsIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#vidsContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#168793');

	});


	$('#wikiIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#wikiContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#19AA67');

	});



	$('#submit').on('click', function(){

		query = $('#search').val().trim();

	
		$('#vids').html('');
		$('#vids').html('<div class="grid-sizer"></div>');



		// Run the form validation
		formValidation();


	//=================================================================
	//	imgur code
	//=================================================================



		$('#pics').html('<div class="grid-sizer"></div>');

		pic1_urls.length = 0;

		var searchTerm = query;
		var img_queryURL = "https://api.imgur.com/3/gallery/search/top/all"+
							"&?q_type=jpg&q_all=" + searchTerm;

		$.ajax({

			url: img_queryURL,
			method: 'GET',
			headers: {
        	Authorization: 'Client-ID ' + imgur_clientID
      		}

		})
	 
	 	.done(function(response) {

			for (var i = 0; i < 20; i++) {

				var results = response.data;

				if (results[i].type === "image/jpeg") { continue; }

				// console.log(results[i]);
				var $imageURL = 'http://i.imgur.com/' + 
								results[i].cover + 'm.jpg';
				// $('#pics').append('<div class="grid-item"><img src="' + $imageURL + '"/></div>'); 
				pic1_urls.push($imageURL);

			}

		 	// console.log('pic_urls.length '+pic_urls.length);

	 		$grid.imagesLoaded().progress( function() {
				$grid.isotope('layout');
			});

	 		var counter = 0;

			for(var i = 0; i < pic1_urls.length; i++) {

				counter++;

				var $grid_item = $('<div class="grid-item"><img src ='+ pic1_urls[i] + ' ><h4 class="copy btn" id="copy"  data-toggle="modal" data-target="#modal" data-clipboard-text="'+pic1_urls[i]+'">copy to clipboard</h4></div>');

				$('#pics').append($grid_item);

			}


		})



	//=================================================================
	//	giphy code
	//=================================================================


		$('#gifs').html('<div class="grid-sizer"></div>');

		gif_urls.length = 0;
		var searchTerm = query;

		// console.log(searchTerm);
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' +
					searchTerm+ '&api_key=dc6zaTOxFJmzC&limit=20';

		$.ajax({

			url: queryURL, 
			method:'GET'

		}).done(function(response) {

			var results = response.data,
				imgurl,
				gifImage;

			for (var i = 0; i < results.length; i++) {

				imgurl = results[i].images.fixed_height.url;
				gifImage = $('<div class="grid-item"><img src ='+ imgurl + ' ><h4 class="copy btn" id="copy" data-toggle="modal" data-target="#modal" data-clipboard-text="'+imgurl+'">copy to clipboard</h4></div>' );
				// $("#gifs").append(gifImage);
				gif_urls.push(gifImage);

			}

			console.log('gif_urls.length '+gif_urls.length);

			for (var i = 0; i < gif_urls.length; i++) {

				$("#gifs").append(gif_urls[i]);
				// gif_urls.push(gifImage);

			}

	 		$grid.imagesLoaded().progress( function() {
				$grid.isotope('layout');
			});


		});




	//=================================================================
	//	tumblr code
	//=================================================================


		$('#pics').html('<div class="grid-sizer"></div>');

		var searchTerm = query;
		var url = "https://api.tumblr.com/v2/tagged?tag=" + 
			searchTerm + "&api_key=LlesQOluubqkqrscBuJN7EvvMLdiLyJyRSskIzYzaaroBQVBQQ";

		// Start ajax, making sure the datatype is JSONP
		$.ajax({

			url: url,
			method: 'GET',
			dataType: "jsonp"

		}).done(function(tumblrObject){

			console.log(tumblrObject);

			// Loop through the objects from Tumblr's API
			for(var i = 0; i < tumblrObject.response.length; i++) {
				
				var tumblrUrl = tumblrObject.response[i].short_url;
				var tumblrType = tumblrObject.response[i].type;
				var tumblrVideo = tumblrObject.response[i].video_url;
				var tumblrVideoType = tumblrObject.response[i].video_type;
				var $newButton = $("<button>").data("id", "link"+i)
											.data("data-clipboard-target", "post-shortlink");
				
				// Instructions on how to handle photos
				if(tumblrType == "photo"){
					// if(tumblrObject.response[i].photos[0].alt_sizes[3].url != undefined
					// ||tumblrObject.response[i].photos[0].alt_sizes[3].url != null) {
					// 	var tumblrImage = tumblrObject.response[i].photos[0].alt_sizes[3].url;
					// }
					

					// Appending the results
					// $("#pics").append("<div class='grid-item'><img src=" + 
					// 	tumblrImage + "></div>" );
					// $("#searchInput").val("");

					// pic2_urls.push(tumblrImage);

				// Instructions on how to handle Tumblr videos
				} else if(tumblrType == "video" && tumblrVideoType == "tumblr") {

					// $("#vids").append("<div class='grid-item'><video controls>"+
					// 	" <source src= " + tumblrVideo + "> </video></div>" );
					// $("#searchInput").val("");

					vid1_urls.push(tumblrVideo);

					console.log('tumblr video!');

				} 

			}

			// for(var i = 0; i < pic2_urls.length; i++) {
			// 	$("#pics").append("<div class='grid-item'><img src=" + 
			// 		pic2_urls[i] + "><h4 class='copy' id='copy' data-toggle='modal' data-target='#modal' data-clipboard-text='"+pic2_urls[i]+"'>copy to clipboard</h4></div>" );
			// }

			// for(var i = 0; i < vid1_urls.length; i++) {
			// 	$("#vids").append("<div class='grid-item'><video controls>"+
			// 					" <source src= " + vid1_urls[i] + "> </video><h4 class='copy btn' id='copy' data-toggle='modal' data-target='#modal' data-clipboard-text='"+vid1_urls[i]+"'>copy to clipboard</h4></div>" );
			// }

			// for(var i = 0; i < vid2_urls.length; i++) {
			// 	$("#vids").append("<div class='grid-item'><video controls>"+
			// 					" <source src= " + vid2_urls[i] + "> </video><h4 class='copy btn' id='copy' data-toggle='modal' data-target='#modal' data-clipboard-text='"+vid2_urls[i]+"'>copy to clipboard</h4></div>" );
			// }

	 	// 	$grid.imagesLoaded().progress( function() {
			// 	$grid.isotope('layout');
			// });


			pic2_urls.length = 0;
			vid1_urls.length = 0;
			vid2_urls.length = 0;


		})




	//=================================================================
	//	youtube code
	//=================================================================


		var key = 'AIzaSyASwJE5ny3b5D_MMihhX8TUgPsucMsSI7E';
	    var searchTerm = query;
	    var url = 'https://www.googleapis.com/youtube/v3/search?q='+
	            searchTerm + '&part=snippet&key=' + key +
	            '&maxResults=21';

	    $.ajax({

	        method: 'GET',
	        url: url

	    }).done(function(result){

	        for(var i = 0; i < result.items.length; i++) {

	            // console.log(result.items[i].id.kind);

	            if(result.items[i].id.kind === 'youtube#video') {

				// $('#vids').append('<iframe src="https://www.youtube.com/embed/' +
	                //                             result.items[i].id.videoId +
	                //                             '" width="320" height="240"></iframe>')
	                vid3_urls.push('https://www.youtube.com/embed/' +
									result.items[i].id.videoId);

	                // return 0;
	            }
	        }

	        console.log(result);

			$('#vids').html('<div class="grid-sizer"></div>');

	        for(var i = 0; i < vid3_urls.length; i++) {

				$('#vids').append('<div class="vid-wrap"><iframe src="'+vid3_urls[i]+
					'"></iframe><h4 class="copy btn" id="vid-copy" data-toggle="modal" data-target="#modal" data-clipboard-text="'+vid3_urls[i]+'">copy to clipboard</h4></div>');
				// $('#vids').append('<div class="grid-item"><video controls>"'+
				// 				" <source src= " + vid2_urls[i] + "> </video></div>");

	        }
	    });

	    // q ='';


	//=================================================================
	//	wikipedia code
	//=================================================================


		// $('#wiki').html('');

		// for(var i = 0; i < test_urls.length; i++) {

		// 	$('#wiki').append('<div class="grid-item"><img src="'
		// 			// +test_urls[i] + '"><h4 class="copy btn" id="copy" data-toggle="modal" data-target="#modal" data-clipboard-text="'+test_urls[i]+'">copy to clipboard</h4></div>');
		// 			 +test_urls[i] + '"><h4 class="copy btn" id="copy" data-toggle="modal" data-target="#modal" data-clipboard-text="'+test_urls[i]+'">copy to clipboard</h4></div>');

		// }

 	// 	$grid.imagesLoaded().progress( function() {
		// 	$grid.isotope('layout');
		// });

 		vid3_urls.length = 0;



	//=================================================================
	//	firebase code
	//=================================================================



		dataRef.ref("query_terms").once('value', function(snap) {

			// console.log(childSnapshot.val().query_terms);

			var already_saved = false;


			dataRef.ref('query_terms').orderByChild('times_used').on('value', function(childSnapshot) {

				console.log(childSnapshot.val());

				var trending = [];


				childSnapshot.forEach(function(childOfChild) {

					var qt = childOfChild.val().query_term;
					var tu = childOfChild.val().times_used;

					trending.push(qt);

					console.log(qt+' was used '+tu+' times');

				});


				trending.reverse();

				$('#trending').html('');

				for(var i = 0; i < 8; i++) {

					console.log(trending[i]);

					var trending_item = $('<h5>').html(trending[i]);

					$('#trending').append(trending_item);

				}

			});


			snap.forEach(function(childSnapshot) {

				if(childSnapshot.val().query_term === query) {

					var times_used = childSnapshot.val().times_used;

					console.log(times_used);

					childSnapshot.ref.update({
						times_used : times_used+1
					});

					already_saved = true;

					return true;

				}
				// console.log(childSnapshot);
			});



			if(already_saved === false) {

				dataRef.ref('query_terms').push({

					query_term: query,
					times_used: 1

				});

				// snap.forEach(function(childSnapshot) {

				// 	console.log(childSnapshot.val());

				// });

				// dataRef.ref('query_terms').orderByChild('times_used').on('value', function(childSnapshot) {
				// 	console.log(childSnapshot.val());
				// });

			}

			// console.log(snap.val().query_terms);



			// for(var saved_query in childSnapshot.val().query_terms) {

			// 	console.log(saved_query.query_term);
			// 	console.log(childSnapshot.val().query_terms[saved_query.query_term]);

			// 	if(saved_query.query_term == query) {

			// 		console.log(saved_query.query_term+' is the same as '+query);
			// 		// dataRef.ref('query_terms').push({

			// 		// });

			// 		// return 0;

			// 	}

			// }


			// console.log(childSnapshot.val().times_used);

		// }, function(errorObject) {

		// 	console.log("The add failed: " + errorObject.code);

		// });


		// dataRef.ref('query_terms').once("value", function(childSnapshot) {

			// dataRef.ref('query_terms').push({
			// 	query_term: query,
			// 	times_used: 1
			// });

		});


	//=================================================================
	//	end of click event
	//=================================================================

		return false;


	});

//=====================================================================




	//=================================================================
	//	success message code
	//=================================================================


	$('.grid').on('click', '.grid-item #copy', function() {

		$(this).html('copied! <span class="glyphicon glyphicon-ok"></span>');

		setTimeout(function() {
			$('.grid .grid-item #copy').html('copy to clipboard');
		}, 1000);


	});



});



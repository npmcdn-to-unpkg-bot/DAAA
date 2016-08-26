'use strict';

$(document).ready(function() {
	

	var displayed = undefined;
	var gif_urls = [];
	var pic1_urls = [];
	var pic2_urls = [];
	var vid1_urls = [];
	var vid2_urls = [];
	var vid3_urls = [];
	var wiki_urls = [];
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

	// Copy to clipboard function using clipboard.js library
	var clipboard = new Clipboard('.btn');


	// external js: masonry.pkgd.js, imagesloaded.pkgd.js

	// init Isotope
	var $grid = $('.grid').isotope({
	    itemSelector: '.grid-item',
	    percentPosition: true,
	    masonry: {
		    columnWidth: '.grid-sizer'
	    }
	}); 

	// layout Isotope after each image loads
	// $grid.imagesLoaded().progress( function() {
	// 	$grid.isotope('layout');
	// });




	$('#picsIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#picsContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#EAAF48');
		$('.icons').css('opacity', '.8');
		$(this).css('opacity', '1');

	});


	$('#gifsIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#gifsContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#E76737');
		$('.icons').css('opacity', '.8');
		$(this).css('opacity', '1');

	});


	$('#vidsIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#vidsContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#168793');
		$('.icons').css('opacity', '.8');
		$(this).css('opacity', '1');

	});


	$('#wikiIcon').on('click', function() {

		$('.display-row').addClass('hide');
		$('#wikiContainer').removeClass('hide');
		$('#icon-footer').css('background-color', '#19AA67');
		$('.icons').css('opacity', '.8');
		$(this).css('opacity', '1');

	});



//=================================================================
//	imgur code
//=================================================================


	var clientID = '6441b815d2612cc';

	$('#submit').on('click', function(){

		$('#pics').html('');

		pic1_urls.length = 0;

		var searchTerm = $('#search').val().trim();
		var img_queryURL = "https://api.imgur.com/3/gallery/search/top/all"+
							"&?q_type=jpg&q_all=" + searchTerm;

		$.ajax({

			url: img_queryURL,
			method: 'GET',
			headers: {
        	Authorization: 'Client-ID ' + clientID
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

			for(var i = 0; i < pic1_urls.length; i++) {

				$('#pics').append('<div class="grid-item"><img src ='+ pic1_urls[i] + ' ><h4 id="copy">copy to clipboard</h4></div>');

			}


		})

		//------

		return false;


	});






//=================================================================
//	giphy code
//=================================================================


	$("#submit").on("click", function(){

		$('#gifs').html('');

		gif_urls.length = 0;
		var searchTerm = $('#search').val().trim();

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
				gifImage = $('<div class="grid-item"><img src ='+ imgurl + ' ><h4 id="copy">copy to clipboard</h4></div>' );
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



	    return false;


	});





//=================================================================
//	tumblr code
//=================================================================


	$("#submit").on('click', function(){
		// Run the form validation
		// formValidation();

		$('#pics').html('');

		var searchTerm = $('#search').val().trim();
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
				
				// *** ARPAD - THIS BLOCK HAS BEEN UPDATED AND SHOULD BE MERGED ***
										
				// Instructions on how to handle photos
				if(tumblrType == "photo"){

					// var tumblrImage = tumblrObject.response[i].photos[0].alt_sizes[3].url;
					// var b = $('<input type="button" value="Copy link"/>')
					// var b = $('<img src="assets/images/copy.png" />')
					// 		.addClass("btn")
					// 		.attr("data-clipboard-text", tumblrImage);
					// 		console.log(tumblrImage);

					// Appending the results
					// $("#pics").append("<div class='grid-item'><img src=" + 
					// 	tumblrImage + "></div>" );
					// $("#searchInput").val("");

					// pic2_urls.push(tumblrImage);

				// Instructions on how to handle Tumblr videos
				} else if(tumblrType == "video" && tumblrVideoType == "tumblr") {

					// var b = $('<img src="assets/images/copy.png" />')
					// 		.addClass("btn")
					// 		.attr("data-clipboard-text", tumblrVideo);
					// 		console.log(tumblrVideo);

					// $("#vids").append("<div class='grid-item'><video controls>"+
					// 	" <source src= " + tumblrVideo + "> </video></div>" );
					// $("#searchInput").val("");

					vid1_urls.push(tumblrVideo);

					console.log('tumblr video!');



				} else if(tumblrType == "video" && tumblrVideoType == "youtube") {

					vid2_urls.push(tumblrObject.response[i].permalink_url);

				}

			}

			for(var i = 0; i < pic2_urls.length; i++) {
				$("#pics").append("<div class='grid-item'><img src=" + 
					pic2_urls[i] + "><h4 id='copy'>copy to clipboard</h4></div>" );
			}

			for(var i = 0; i < vid1_urls.length; i++) {
				$("#vids").append("<div class='grid-item'><video controls>"+
								" <source src= " + vid1_urls[i] + "> </video><h4 id='copy'>copy to clipboard</h4></div>" );
			}

			for(var i = 0; i < vid2_urls.length; i++) {
				$("#vids").append("<div class='grid-item'><video controls>"+
								" <source src= " + vid2_urls[i] + "> </video><h4 id='copy'>copy to clipboard</h4></div>" );
			}

	 		$grid.imagesLoaded().progress( function() {
				$grid.isotope('layout');
			});


		})


		return false;


	});




//=================================================================
//	youtube code
//=================================================================


	$("#submit").on('click', function(){
// FORM VALIDATION. I DON'T LIKE THIS. SEE IF I CAN PUT INTO A FUNCTION -- DAMIEN
		var searchValue = $("#search").val();
		if(searchValue === ""){
			$(".input-group").effect("shake", {times: 3}, 500);
        	return false;
		}

		$('#vids').html('');

		var key = 'AIzaSyASwJE5ny3b5D_MMihhX8TUgPsucMsSI7E';
	    var searchTerm = $('#search').val().trim();
	    var url = 'https://www.googleapis.com/youtube/v3/search?q='+
	            searchTerm + '&part=snippet&key=' + key +
	            '&maxResults=20';

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

	        console.log('# of youtube results '+result);

	        for(var i = 0; i < vid3_urls.length-10; i++) {

				$('#vids').append('<div class="vid-wrap"><iframe src="'+vid3_urls[i]+
					'"></iframe><h4 id="vid-copy">copy to clipboard</h4></div>');
				// $('#vids').append('<div class="grid-item"><video controls>"'+
				// 				" <source src= " + vid2_urls[i] + "> </video></div>");

	        }
	    });

	    // q ='';

	    return false;

	});

	$('#submit').on('click', function() {

		$('#wiki').html('');

		for(var i = 0; i < test_urls.length; i++) {

			$('#wiki').append('<div class="grid-item"><img src="'
					+test_urls[i] + '"><h4 id="copy">copy to clipboard</h4></div>');

		}

 		$grid.imagesLoaded().progress( function() {
			$grid.isotope('layout');
		});


	});



});
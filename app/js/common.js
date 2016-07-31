'use strict';

$(function () {

	var owl = $("#owl-example");

	owl.owlCarousel({
		items: 1,
		loop: true,
		dotsEach: true
	});

	$('.customNextBtn').click(function () {
		owl.trigger('next.owl.carousel');
	});
	// Go to the previous item
	$('.customPrevBtn').click(function () {
		// With optional speed parameter
		// Parameters has to be in square bracket '[]'
		owl.trigger('prev.owl.carousel', [300]);
	});

	//SVG Fallback
	if (!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function () {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function () {
		//Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function () {
			alert("Thank you!");
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	var duration = $('.no-csstransitions').length > 0 ? 0 : 300;
	//define a svgClippedSlider object
	function svgClippedSlider(element) {
		this.element = element;
		this.slidesGallery = this.element.find('.gallery').children('li');
		this.slidesCaption = this.element.find('.caption').children('li');
		this.slidesNumber = this.slidesGallery.length;
		this.selectedSlide = this.slidesGallery.filter('.selected').index();
		this.arrowNext = this.element.find('.navigation').find('.next');
		this.arrowPrev = this.element.find('.navigation').find('.prev');

		this.visibleSlidePath = this.element.data('selected');
		this.lateralSlidePath = this.element.data('lateral');

		this.bindEvents();
	}

	svgClippedSlider.prototype.bindEvents = function () {
		var self = this;
		//detect click on one of the slides
		this.slidesGallery.on('click', function (event) {
			if (!$(this).hasClass('selected')) {
				//determine new slide index and show it
				var newSlideIndex = $(this).hasClass('left') ? self.showPrevSlide(self.selectedSlide - 1) : self.showNextSlide(self.selectedSlide + 1);
			}
		});
	};

	svgClippedSlider.prototype.showPrevSlide = function (index) {
		var self = this;
		this.selectedSlide = index;
		this.slidesGallery.eq(index + 1).add(this.slidesCaption.eq(index + 1)).removeClass('selected').addClass('right');
		this.slidesGallery.eq(index).add(this.slidesCaption.eq(index)).removeClass('left').addClass('selected');

		//morph the svg cliph path to reveal a different region of the image
		Snap("#cd-morphing-path-" + (index + 1)).animate({ 'd': self.visibleSlidePath }, duration, mina.easeinout);
		Snap("#cd-morphing-path-" + (index + 2)).animate({ 'd': self.lateralSlidePath }, duration, mina.easeinout);

		if (index - 1 >= 0) this.slidesGallery.eq(index - 1).add(this.slidesCaption.eq(index - 1)).removeClass('left-hide').addClass('left');
		if (index + 2 < this.slidesNumber) this.slidesGallery.eq(index + 2).add(this.slidesCaption.eq(index + 2)).removeClass('right');

		index <= 0 && this.element.addClass('prev-hidden');
		this.element.removeClass('next-hidden');

		//animate prev arrow on click
		this.arrowPrev.addClass('active').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
			self.arrowPrev.removeClass('active');
		});
	};

	svgClippedSlider.prototype.showNextSlide = function (index) {
		var self = this;
		this.selectedSlide = index;
		this.slidesGallery.eq(index - 1).add(this.slidesCaption.eq(index - 1)).removeClass('selected').addClass('left');
		this.slidesGallery.eq(index).add(this.slidesCaption.eq(index)).removeClass('right').addClass('selected');

		//morph the svg cliph path to reveal a different region of the image
		Snap("#cd-morphing-path-" + (index + 1)).animate({ 'd': self.visibleSlidePath }, duration, mina.easeinout);
		Snap("#cd-morphing-path-" + index).animate({ 'd': self.lateralSlidePath }, duration, mina.easeinout);

		if (index - 2 >= 0) this.slidesGallery.eq(index - 2).add(this.slidesCaption.eq(index - 2)).removeClass('left').addClass('left-hide');
		if (index + 1 < this.slidesNumber) this.slidesGallery.eq(index + 1).add(this.slidesCaption.eq(index + 1)).addClass('right');

		index + 1 >= this.slidesNumber && this.element.addClass('next-hidden');
		this.element.removeClass('prev-hidden');

		//animate next arrow on click
		this.arrowNext.addClass('active').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
			self.arrowNext.removeClass('active');
		});
	};

	$('.cd-svg-clipped-slider').each(function () {
		//create a svgClippedSlider object for each .cd-svg-clipped-slider
		new svgClippedSlider($(this));
	});

	var mapCanvas = document.getElementById("map");
	var mapOptions = {
		center: new google.maps.LatLng(49.4551175, 25.0737941), //london
		zoom: 11,
		styles: [{"featureType":"administrative","elementType":"geometry","stylers":[{"saturation":"2"},{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"saturation":"-28"},{"lightness":"-10"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"-1"},{"lightness":"-12"}]},{"featureType":"landscape.natural","elementType":"labels.text","stylers":[{"lightness":"-31"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"lightness":"-74"}]},{"featureType":"landscape.natural","elementType":"labels.text.stroke","stylers":[{"lightness":"65"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"lightness":"-15"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"lightness":"0"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"saturation":"0"},{"lightness":"-9"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"lightness":"-14"}]},{"featureType":"road","elementType":"labels","stylers":[{"lightness":"-35"},{"gamma":"1"},{"weight":"1.39"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":"-19"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":"46"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"lightness":"-13"},{"weight":"1.23"},{"invert_lightness":true},{"visibility":"simplified"},{"hue":"#ff0000"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#adadad"},{"visibility":"on"}]}]
	};
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(49.4551175, 25.0737941),
		map: map,
		title: 'Дибще!'
	});


	var Page = (function() {

		var $navArrows = $( '#nav-arrows' ).hide(),
		$shadow = $( '#shadow' ).hide(),
		slicebox = $( '#sb-slider' ).slicebox( {
			onReady : function() {

				$navArrows.show();
				$shadow.show();

			},
			autoplay : true,
			interval: 3500,
			orientation : 'r',
			cuboidsRandom : true,
			disperseFactor : 30
		} ),

		init = function() {

			initEvents();

		},
		initEvents = function() {

			$navArrows.children( ':first' ).on( 'click', function() {

				slicebox.next();
				return false;

			} );

			$navArrows.children( ':last' ).on( 'click', function() {
				
				slicebox.previous();
				return false;

			} );

		};

		return { init : init };

	})();

	Page.init();
});
(function() {
	'use strict';

	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	/*----------------------------------------
		Back to top
	----------------------------------------*/
	var backToTop = function() {
		$('.js-backtotop').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({
	      scrollTop: $('body').offset().top
	    }, 700, 'easeInOutExpo');
		});
	}

	var nextScroll = function() {
		$('.js-next').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({
      	scrollTop: $( $.attr(this, 'href') ).offset().top
    	}, 700, 'easeInOutExpo');
		});

		$(window).scroll(function(){

			var $this = $(this),
				st = $this.scrollTop();

			if (st > 10) {
				$('.js-next').addClass('probootstrap-sleep');
			} else {
				$('.js-next').removeClass('probootstrap-sleep');
			}

		});
	}

	/*----------------------------------------
		Burger Menu
	----------------------------------------*/	
	var mobileMenuControl = function() {
		

		// click burger menu
		$('.probootstrap-burger-menu').on('click', function(e){
			e.preventDefault();
			if ($('body').hasClass('show')) {
				$('.probootstrap-burger-menu').removeClass('active');
				$('body').removeClass('show');
			} else {
				$('.probootstrap-burger-menu').addClass('active');
				$('body').addClass('show');
			}
		});

		if ($(window).width() > 766) {
			$('body').removeClass('probootstrap-mobile-menu-active');
			$('.probootstrap-burger-menu').removeClass('active');
		} else {
			$('body').addClass('probootstrap-mobile-menu-active');
		}

		$(window).resize(function(){
			if ($(window).width() > 766) {
				console.log('resizing');
				$('body').removeClass('probootstrap-mobile-menu-active');
				$('.probootstrap-burger-menu').removeClass('active');
			} else {
				$('body').addClass('probootstrap-mobile-menu-active');
			}
		});

		// Click outside of the Mobile Menu content
		$(document).click(function (e) {
	    var container = $(".probootstrap-nav, .probootstrap-burger-menu");
	    
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('show') ) {
					$('body').removeClass('show');
					$('.probootstrap-burger-menu').removeClass('active');
				}
	    }
		});
		

	};


	/*----------------------------------------
		Menu Hover
	----------------------------------------*/
	var menuHover = function() {
		if (!isMobile.any()) {
			$('.probootstrap-navbar .navbar-nav li.dropdown').hover(function() {
			  $(this).find('> .dropdown-menu').stop(true, true).delay(200).fadeIn(500).addClass('animated-fast fadeInUp');
			}, function() {
				$(this).find('> .dropdown-menu').stop(true, true).fadeOut(200).removeClass('animated-fast fadeInUp')
			});
		}
	}


	
	/*----------------------------------------
		Slider
	----------------------------------------*/
	var flexSlider = function() {
	  $('.flexslider').flexslider({
	    animation: "fade",
	    prevText: "",
	    nextText: "",
	    slideshow: true
	  });
	}


	

	/*----------------------------------------
		Counter Animation
	----------------------------------------*/
	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};
	var counterWayPoint = function() {
		if ($('#probootstrap-counter').length > 0 ) {
			$('#probootstrap-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('probootstrap-animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('probootstrap-animated');
				}
			} , { offset: '90%' } );
		}
	};



	/*----------------------------------------
		Stellar
	----------------------------------------*/
	var stellarInit = function() {
		if( !isMobile.any() ) {
			$(window).stellar();
		}
	};


	var progressBarControl = function() {
		if ( $(".progress-bar-s2").length > 0 ) {
      var $progress_bar = $('.progress-bar-s2');

      $progress_bar.appear();
      $(document.body).on('appear', '.progress-bar-s2', function() {
          var current_item = $(this);
          if (!current_item.hasClass('appeared')) {
              var percent = current_item.data('percent');
              current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
          }
          
      });
    };
	}

	var inlineSVG = function() {
		$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

	});
	};
	var roomFadeHover = function() {
		$(".probootstrap-room").on({
    	mouseenter: function () {
    		$('.probootstrap-room').addClass('fade');
    		$(this).removeClass('fade');
    	},
    	mouseleave: function () {
    		$('.probootstrap-room').removeClass('fade');
    	}
		});
	}

	var hiResImg = function() {
		if (window.devicePixelRatio == 2) {
      var images = $("img.hires");

      // loop through the images and make them hi-res
      for(var i = 0; i < images.length; i++) {
        // create new image name
        var imageType = images[i].src.substr(-4);
        var imageName = images[i].src.substr(0, images[i].src.length - 4);
        imageName += "@2x" + imageType;

        //rename image
        images[i].src = imageName;
      }
   	}
	};


	/*----------------------------------------
		Document Ready 
	----------------------------------------*/
	$(document).ready(function(){
		menuHover();
		counterWayPoint();
		backToTop();
		stellarInit();
		progressBarControl();
		mobileMenuControl();
		nextScroll();
		inlineSVG();
		roomFadeHover();
		hiResImg();

	});

	

	

})();
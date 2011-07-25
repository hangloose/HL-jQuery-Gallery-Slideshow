/*
 * Superslideshow
 * Copyright (c) 2011  Oliver Astrologo - Studio Hangloose
 * Dual licensed under MIT and GPL.
 * @author  Oliver Astrologo
 * @version 1.0
 */
;
(function ($) {
	//var postItId;
	$.fn.extend({
		//pass the options variable to the function  
		HLSlideshow: function (options) {
			//Set the default values, use comma to separate the settings, example:  
			var interval;
			var current_slide = 0;
			var defaults = {
				speed: 1500,
				interval: 4000,
				autostart: false,
				image_container: 'div.thumb',
				next_button_id: '#mini-next',
				prev_button_id: '#mini-prev',
				slideshow_button_id: '#slideshow-toggle',
				status_container: '#status'
			};
			var options = $.extend(defaults, options);
			var slideshow = this;
			var slideshow_status = false;
			var length = $(options.image_container, slideshow).length;
			var galleryTicker = function () {
					current_slide++;
					galleryScroller();
				};
			var galleryScroller = function () {
					if (current_slide === length) current_slide = 0;
					if (current_slide < 0) current_slide = length - 1;
					$(options.image_container, slideshow).not(':eq(' + current_slide + ')').stop().animate({
						opacity: 0
					}, options.speed, function () {
						$(this).css('display', 'none')
					});
					$(options.image_container, slideshow).eq(current_slide).css('display', 'block').stop().animate({
						opacity: 1
					}, options.speed);
					updateStatus();
				};
			var startSlideshow = function () {
					interval = setInterval(galleryTicker, options.interval);
					$(options.slideshow_button_id).html('slideshow on');
					slideshow_status = true;
				};
			var stopSlideshow = function () {
					clearInterval(interval);
					$(options.slideshow_button_id).html('slideshow off');
					slideshow_status = false;
				};
			var updateStatus = function () {
					$(options.status_container).html('foto ' + parseInt(current_slide + 1) + ' / ' + length);
				};
			$(options.image_container, slideshow).click(function () {
				current_slide++;
				stopSlideshow();
				galleryScroller();
				return false
			}).css('display', 'none');
			$(options.prev_button_id).click(function () {
				current_slide--;
				stopSlideshow();
				galleryScroller();
				return false
			});
			$(options.next_button_id).click(function () {
				current_slide++;
				stopSlideshow();
				galleryScroller();
				return false
			});
			$(options.slideshow_button_id).click(function () {
				if (slideshow_status === true) {
					stopSlideshow();
				} else {
					startSlideshow();
				}
				toggleGallery();
				return false
			});
			galleryScroller();
			if (options.autostart) startSlideshow();
		}
	});
})(jQuery);

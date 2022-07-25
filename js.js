
$(function () {
 var sliding = [];
 var interval;

 function setupSlider(slider) {
  sliding.push(false);
  // TweenMax.set($('.slide', slider), { x: slider.width() });
  TweenMax.set($('.slide', slider), { x: $('.slide', slider).width() });

  $('.slide', slider)
   .first()
   .addClass('active');
  $('.slide-indicator', slider)
   .first()
   .addClass('active');

  TweenMax.set($('.slide.active', slider), { x: 0 });
 }

 function setupAutoSlider(slider) {

  $('.slide', slider).each(function () {
   $('.slide-indicators', slider).append('<a class="slide-indicator"></a>')
  });

  $('.slide', slider)
   .first()
   .addClass('active');
  $('.slide-indicator', slider)
   .first()
   .addClass('active');

  interval = setInterval(function () {
   var activeIndex = $('.slide.active', slider).index();

   var indicatorIndex = activeIndex + 1;
   if (indicatorIndex == $('.slide', slider).length) {
    indicatorIndex = 0;
   }
   $('.slide, .slide-indicator', slider).removeClass('active');
   $('.slide', slider).eq(indicatorIndex).addClass('active');
   $('.slide-indicator', slider).eq(indicatorIndex).addClass('active');
  }, 2500);
 }

 function slideNext(slider) {
  if (sliding[slider.index()]) {
   return false;
  }

  var active;
  var next;
  sliding[slider.index()] = true;

  active = $('.slide.active', slider);

  if (active.is(':last-child')) {
   next = $('.slide', slider).first();
  } else {
   next = active.next();
  }

  TweenMax.set(next, {
   x: next.width()
  });

  TweenMax.to(active, 1, {
   x: - next.width(),
   // ease: Power0.easeNone
   ease: Power2.easeInOut
  });

  TweenMax.to(next, 1, {
   x: 0,
   // ease: Power0.easeNone,
   ease: Power2.easeInOut,
   onStart: function () {
    updateIndicator(slider, next);
   },
   onComplete: function () {
    active.removeClass('active');
    next.addClass('active');
    updateIndicator(slider, next);
    sliding[slider.index()] = false;
   }
  });
 }

 function slidePrevious(slider) {
  if (sliding[slider.index()]) {
   return false;
  }

  var active;
  var prev;
  sliding[slider.index()] = true;

  active = $('.slide.active', slider);

  if (active.is(':first-child')) {
   prev = $('.slide', slider).last();
  } else {
   prev = active.prev();
  }

  TweenMax.set(prev, {
   x: -prev.width()
  });

  TweenMax.to(active, 1, {
   x: prev.width(),
   // ease: Power0.easeNone
   ease: Power2.easeInOut
  });

  TweenMax.to(prev, 1, {
   x: 0,
   // ease: Power0.easeNone,
   ease: Power2.easeInOut,
   onStart: function () {
    updateIndicator(slider, prev);
   },
   onComplete: function () {
    active.removeClass('active');
    prev.addClass('active');
    updateIndicator(slider, prev);
    sliding[slider.index()] = false;
   }
  });
 }

 function updateIndicator(slider, indicator) {
  $('.slide-indicator', slider).removeClass('active');
  $('.slide-indicator', slider).eq(indicator.index()).addClass('active');
  $('.current-slide', slider).html(indicator.index() + 1);
  // console.log(indicator.index() + 1);
 }

 //navigating the slider
 $('body').on('click', '.slider .slide-navigation[data-direction="next"]', function () {
  var slider = $(this).parents('.slider');
  slideNext(slider);
  return false;
 });

 $('body').on('click', '.slider .slide-navigation[data-direction="previous"]', function () {
  var slider = $(this).parents('.slider');
  slidePrevious(slider);
  return false;
 });

 $('.slider').each(function () {
  setupSlider($(this));
 });


 $('body').on('click', '.auto-slider .slide-indicator', function () {
  var indicator = $(this);
  var slider = indicator.parents('.auto-slider');

  if (indicator.hasClass('active')) {
   return false;
  }

  clearInterval(interval);

  var activeIndex = $('.auto-slide.active', slider).index();
  var indicatorIndex = indicator.index();

  $('.slide, .slide-indicator', slider).removeClass('active');
  $('.slide', slider).eq(indicatorIndex).addClass('active');
  $('.slide-indicator', slider).eq(indicatorIndex).addClass('active');
  return false;
 });

 $('.auto-slider').each(function () {
  setupAutoSlider($(this));
 });
});
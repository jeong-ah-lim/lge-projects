  var $lge = jQuery.noConflict();  // preventing jQuery conflict

  !function($,undefined){
    // animate scroll for sticky
    var animateScroll = function(ele){
      var $navigation = $(ele),
          top_off = $navigation.attr('data-margin-top') || 0,
          bottom_off = $navigation.attr('data-margin-bottom') || 0,
          navi_height = $navigation.height() + top_off*1 - bottom_off*1,
          navi_anchors = $navigation.find('a');

      if( navi_anchors.length == 0) return false;

      navi_anchors.on('click', function(e){ 
        var $target = $($(this).attr('href')),
            scrollTop = Math.ceil($target.offset().top) - navi_height;

        e.preventDefault();

        $("html,body").stop().animate({
          "scrollTop": scrollTop
        }, 500, 'easeInOutCubic', function(){
          $target.focus();
        });
      });
    }; //animateScroll

    var getSectionTop = function(section, ele){
      var sections = $(section),
          $navigation = $(ele),
          top_off = $navigation.attr('data-margin-top') || 0,
          bottom_off = $navigation.attr('data-margin-bottom') || 0,
          height_navigation = $navigation.height() + top_off*1 - bottom_off*1,
          anchors = $navigation.find('a'),
          heights = [];
        
      sections.each(function(){
        heights.push($(this).offset().top);
      });

      return [heights, height_navigation, anchors];
    }; // getSectionTop

    var checkSection = function(section, ele){
      var scroll_top = $(window, 'body').scrollTop(),
          $navigation = $(ele),
          initial_value = getSectionTop(section, ele),
          heights = initial_value[0],
          height_navigation = initial_value[1],
          anchors = initial_value[2], 
          section_01, section_02, section_03, section_04, section_05;

      section_01 = heights[0] - height_navigation;
      section_02 = heights[1] - height_navigation;
      section_03 = heights[2] - height_navigation;
      section_04 = heights[3] - height_navigation;
      section_05 = heights[4] - height_navigation;

      if ( scroll_top >= section_01 && scroll_top < section_02 ){
        anchors.eq(0).addClass('is-active').siblings().removeClass('is-active');
      } else if( scroll_top >= section_02 && scroll_top < section_03 ) {
        anchors.eq(1).addClass('is-active').siblings().removeClass('is-active');
      } else if( scroll_top >= section_03 && scroll_top < section_04 ) {
        anchors.eq(2).addClass('is-active').siblings().removeClass('is-active');
      } else if( scroll_top >= section_04 && scroll_top < section_05 ) {
        anchors.eq(3).addClass('is-active').siblings().removeClass('is-active');
      } else if( scroll_top >= section_05) {
        anchors.eq(4).addClass('is-active').siblings().removeClass('is-active');
      } else {
        anchors.removeClass('is-active');
      }
    }; // checkSection

    // layer-popup
    var activeLayer = function(){
      var $container = $('.l-wrapper-layer'),
          $openBtn = $container.find('.button-open-layer'),
          $closeBtn = $container.find('.button-close-layer');

      $openBtn.on('click',function(e){
        e.preventDefault();
        $(this).closest('.l-wrapper-layer').addClass('activated');
      });
      $closeBtn.click(function(e){
        e.preventDefault();
        $(this).closest($container).removeClass('activated')
      });
    };

    // initial value
    var promo_content = '[id^=promotionContent]',
        navigator = '.promotion-navigator .navigator-content';

    $(document).ready(function(e) {

      // animate scroll
      animateScroll(navigator);

      // check section top
      checkSection(promo_content, navigator);

      // sticky
      var sticky = new Sticky(navigator);

      // slick
      $('.slider1').slick({
        dots: true,
        fade:true,
        arrows: false,
        autoplay: true,
      }); // slider

      $('.slider2').slick({
        dots: true,
        fade:true,
        arrows: false,
        autoplay: true,
      }); // slider

      $('.slider3').slick({
        dots: true,
        fade:true,
        arrows: false,
      }); // slider

      $('.slider3_inner').slick({
        arrows: false,
        dots: true,
        fade:true,
        infinite: true,
        autoplay: true,
      }); // slider

      $('.slider4').slick({
        dots: true,
        fade:true,
        arrows: false,
        autoplay: true,
      }); // slider

      
      // layer-popup
      activeLayer();
    });

    $(window).scroll(function(){
      checkSection(promo_content, navigator);
    });

  }($lge);

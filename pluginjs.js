  /*
    A simple horizontal scroller /carousel Jquery plugin
  */
  /*
  Author : Amit Singh Baghel
  version: 1.0
  */

  ;
  (function($) {

    $.fn.horizontalScrollify = function(options) {
      var settings = $.extend({
        // These are the defaults.
        rightButton: $("#rightBtn"),
        leftButton: $("#leftBtn")
      }, options);

      if ($(this).length <= 0) return;

      var outerContainer = $(this);
      var outerContainerId = document.getElementById(outerContainer.attr('id'));
      var containerTotalLeft = outerContainerId.getBoundingClientRect().right,
        eleInView = 0,
        totalContainer,
        lastEle,
        pageouterContainer = outerContainer.find('.page-container'), //should have this class on scrolling containers.
        scrollWrapper = outerContainer.find('.scroll-wrppr'),
        totalContainer = pageouterContainer.length;
      getLastVisibleEle(true);

      settings.leftButton.attr('disabled', 'disabled');

      function getLastVisibleEle(countEleInView) {
        lastEle = 0;

        //if (!!!containerTotalLeft) //changes for FireFox because we can not get property of hidden fields.
        //    containerTotalLeft = outerContainerId.getBoundingClientRect().right;
        var hidden = false;
        pageouterContainer.each(function(index) {
          var self = $(this);

          //if (!!!self.width() || !!!containerTotalLeft) {  //  || containerTotalLeft check is patch for IE 10 as we get 0 on IE for the first time.
          //    hidden = true;
          //    return false;   //Patch for FireFox.//can not calculate a hidden element's width so patched for now.
          //}

          //code such that if element is visible 50% then it should be considered in the visible container.
          if (this.getBoundingClientRect().right > containerTotalLeft) {
            lastEle = parseInt(index);
            return false;
          }
          if (!!countEleInView) eleInView++;
        });
        if (hidden)
          return;
        if (lastEle == 0) {
          lastEle = totalContainer;
        }
      }

      settings.rightButton.bind('click', function() {
        //if (!!!lastEle) //in case if broswer is Firefox or IE may be.
        //    getLastVisibleEle(true);

        var ele = lastEle + 1;
        if (lastEle == totalContainer) {

          $(this).attr('disabled', 'disabled');
          settings.leftButton.attr('disabled', '');
          return;
        } else {
          $(this).attr('disabled', '');
        };
        var totalScroll = scrollWrapper.scrollLeft() + pageouterContainer.eq(ele - 1).position().left;
        scrollWrapper.scrollLeft(totalScroll);
        getLastVisibleEle();
      });

      settings.leftButton.bind('click', function() {
        //if (!!!lastEle) //in case if broswer is Firefox. //better use detection //
        //    getLastVisibleEle(true);

        var ele = lastEle + 1;
        ele = (ele - (eleInView * 2) <= 0) ? 1 : (ele - (eleInView * 2));

        var totalScroll = scrollWrapper.scrollLeft() + pageouterContainer.eq(ele - 1).position().left;
        scrollWrapper.scrollLeft(totalScroll);
        getLastVisibleEle();

        if (ele == 1) {
          $(this).attr('disabled', 'disabled');
          settings.rightButton.attr('disabled', '');
          return;
        } else {
          $(this).attr('disabled', '');
        }
      });
    };
  })(jQuery);

  $(document).ready(function() {
    //Calling the function.
    $('#outerContainer').horizontalScrollify();
  });

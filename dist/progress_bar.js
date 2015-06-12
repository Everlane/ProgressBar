(function() {
  import $ from 'jquery';;

  /*
  A thin progress bar that sits at the top of the page
  
  When `.start()` is called, the bar will animate all
  the way to the specified `stopPoint`, where it will
  sit patiently until you call `.end()` on it.
   */
  var ProgressBar;

  ProgressBar = (function() {
    ProgressBar.prototype.delay_start_timeout = null;

    ProgressBar.prototype.timeout = null;

    function ProgressBar(options) {
      var defaults;
      this.progress = 0;
      defaults = {
        baseIncrementAmount: 25,
        stopPoint: 98,
        selector: '#loading-indicator'
      };
      this.options = _.extend({}, defaults, options);
      this.element = $(this.options.selector);
      return this;
    }

    ProgressBar.prototype.start = function(delay) {
      if (delay == null) {
        delay = 0;
      }
      this.stop();
      this.delay_start_timeout = setTimeout((function(_this) {
        return function() {
          _this.reset();
          return _this.trickle();
        };
      })(this), delay);
      return this;
    };

    ProgressBar.prototype.stop = function() {
      clearTimeout(this.delay_start_timeout);
      clearTimeout(this.timeout);
      if (this.progress) {
        return this.element.velocity({
          width: '100%',
          opacity: 0
        }, {
          complete: $.proxy(this.reset, this)
        });
      }
    };

    ProgressBar.prototype.reset = function() {
      this.progress = 0;
      this.element.css('width', 0).velocity({
        opacity: 1
      });
      return clearTimeout(this.timeout);
    };


    /*
    Increments the loading bar until it has reached it's
    final resting spot, as defined by `@options.stopPoint`.
    
    @param {Number} delta the amount to move the progress bar
     */

    ProgressBar.prototype.trickle = function(delta) {
      if (this.progress <= this.options.stopPoint) {
        this.progress += this.options.baseIncrementAmount * this.multiplier() * Math.random();
        return this.timeout = setTimeout((function(_this) {
          return function() {
            _this.element.velocity({
              width: _this.progress + '%'
            });
            return _this.trickle();
          };
        })(this), (this.progress ? 100 + (500 * Math.random()) : 0));
      } else {
        return clearTimeout(this.timeout);
      }
    };


    /*
    Used to generate a number that will be multiplied against
    `this.baseIncrementAmount`. This makes it so as the progress
    bar nears completion, it will grow in smaller and smaller
    increments, approaching `@options.stopPoint`.
     */

    ProgressBar.prototype.multiplier = function() {
      if (this.progress < 0.5 * this.optionsstopPoint) {
        return .9;
      } else if (this.progress < 0.8 * this.options.stopPoint) {
        return .5;
      } else if (this.progress < this.options.stopPoint) {
        return .2;
      } else {
        return 0;
      }
    };

    return ProgressBar;

  })();

  export default ProgressBar;

}).call(this);

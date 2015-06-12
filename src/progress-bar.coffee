`import $ from 'jquery';`

###
A thin progress bar that sits at the top of the page

When `.start()` is called, the bar will animate all
the way to the specified `stopPoint`, where it will
sit patiently until you call `.end()` on it.
###
class ProgressBar

  delayStartTimeout: null
  timeout: null

  constructor: (options) ->

    # The current completion percentage
    @progress = 0

    defaults =
      # Base value of how much the bar should move each step
      baseIncrementAmount: 25
      # The percentage which the loader should stop
      stopPoint: 98
      # Selector of said bar
      selector: '.progress-bar'

    @options = $.extend {}, defaults, options

    @element = $(@options.selector)

    return this

  start: (delay=0) ->
    @stop()
    @delayStartTimeout = setTimeout =>
      @reset()
      @trickle()
    , delay

    return this

  stop: ->
    clearTimeout @delayStartTimeout
    clearTimeout @timeout

    if @progress
      @element.velocity
        width: '100%'
        opacity: 0
      ,
        complete: $.proxy(@reset, this)

  reset: ->
    @progress = 0
    @element.css('width', 0).velocity opacity: 1
    clearTimeout @timeout

  ###
  Increments the loading bar until it has reached it's
  final resting spot, as defined by `@options.stopPoint`.

  @param {Number} delta the amount to move the progress bar
  ###
  trickle: (delta) ->
    if @progress <= @options.stopPoint

      ###
      We are using a dynamic multipler to generate the progress
      delta so as the loading bar approaches 100%, we can
      increment it in increasingly smaller amounts.
      ###
      @progress += @options.baseIncrementAmount * @multiplier() * Math.random()

      # Animate loading bar after a timeout, which should
      # be ~500ms, randomized to provide realness.
      @timeout = setTimeout(=>

        @element.velocity width: @progress + '%'
        @trickle()

      , ((if @progress then 100 + (500 * Math.random()) else 0))) # fire immediately the first time

    else
      clearTimeout @timeout

  ###
  Used to generate a number that will be multiplied against
  `this.baseIncrementAmount`. This makes it so as the progress
  bar nears completion, it will grow in smaller and smaller
  increments, approaching `@options.stopPoint`.
  ###
  multiplier: ->
    if @progress < 0.5 * @optionsstopPoint
      .9
    else if @progress < 0.8 * @options.stopPoint
      .5
    else if @progress < @options.stopPoint
      .2
    else
      0

`export default ProgressBar`

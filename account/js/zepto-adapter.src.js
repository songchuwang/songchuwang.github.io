/**
 * Highcharts 2.1.9 Zepto adapter
 *
 * (c) 2010-2011 Slawek Kolodziej
 *
 * License: MIT
 */

// JSLint options:
/*global Zepto */

var HighchartsAdapter = (function () {

var win = window,
    doc = document,
    emptyArray = [],
    overridenNames,
    overriden = ['width', 'height'],
    adapter,
    extend,
    events;

overridenNames = Object.keys(overriden);

extend = Zepto.extend || function () {
    return Object.append.apply(Object, arguments);
};


function anim(el, prop, value) {
    var start = +new Date,
    duration = 1000,
    t;

    function step(time) {
        t = time-start;
        if( t < duration )
            requestAnimFrame(step);

        el.attr(prop, ~~(t*100 / duration) * value / 100 );
    }

    step(+new Date);
}

function doCopy(copy, original) {
    var value, key;

    for (key in original) {
        value = original[key];
        if (value && typeof value === 'object' && value.constructor !== Array &&
            typeof value.nodeType !== 'number') {
            copy[key] = doCopy(copy[key] || {}, value); // copy

        } else
            copy[key] = original[key];
    }

    return copy;
}

function merge() {
    var args = arguments,
        i,
        retVal = {};

    for (i = 0; i < args.length; i++)
        retVal = doCopy(retVal, args[i]);

    return retVal;
}

function getCSS(el, prop) {
    return win.getComputedStyle(el).getPropertyValue(prop);
}


// based on backbone.js
events = {
    bind: function(e, callback, context) {
        var calls = this._highcharts_callbacks,
        list  = calls[e] || (calls[e] = []);
        list.push([callback, context]);
        return this;
    },
    unbind: function(e, callback) {
        var calls;

        if (!e) {
            this._highcharts_callbacks = {};

        } else if (calls = this._highcharts_callbacks) {
            if (!callback) {
                calls[e] = [];

            } else {
                var list = calls[e];
                if (!list) return this;
                for (var i = 0, l = list.length; i < l; i++) {
                    if (list[i] && callback === list[i][0]) {
                        list[i] = null;
                        break;
                    }
                }

                if (!list.length)
                    delete calls[e];
            }
        }
        
        return this;
    },
    trigger: function(eventName) {
        var list, calls, ev, callback, args;
        var both = 2;
        if (!(calls = this._highcharts_callbacks))
            return this;

        while (both--) {
            ev = both ? eventName : 'all';
            if (list = calls[ev]) {
                for (var i = 0, l = list.length; i < l; i++) {
                    if (!(callback = list[i])) {
                        list.splice(i, 1); i--; l--;
                    } else {
                        args = both ? emptyArray.slice.call(arguments, 1) : arguments;
                        callback[0].apply(callback[1] || this, args);
                    }
                }
            }
        }

        return this;
    }
}


win.requestAnimFrame = (function(){
    return  win.requestAnimationFrame ||
    win.webkitRequestAnimationFrame ||
    win.mozRequestAnimationFrame ||
    win.oRequestAnimationFrame ||
    win.msRequestAnimationFrame ||
    function( callback ){
        win.setTimeout(callback, 1000 / 60);
    };
})();


['width', 'height'].forEach(function (name) {
    overriden[name] = function (el) {
        return parseInt(getCSS(el, name), 10);
    }
});


return {
    // Initialize the adapter. This is run once as Highcharts is first run.
    init: function (pathAnim) {
        this.pathAnim = pathAnim;
    },

    // Downloads a script and executes a callback when done.
    getScript: Zepto.getScript,
  
    // Return the index of an item in an array, or -1 if not found
    inArray: function (el, arr) {
        return arr.indexOf ? arr.indexOf(el) : emptyArray.indexOf.call(arr, el);
    },
  
    // A direct link to Zepto methods
    adapterRun: function (elem, method) {
        if (!~overridenNames.indexOf(method))
            return overriden[method](elem);

        return Zepto(elem)[method]();
    },

    // Filter an array
    grep: function(elements, callback){
        return emptyArray.filter.call(elements, callback)
    },

    // Map an array
    map: function (arr, fn) {
        var results = [], i = 0, len = arr.length;

        for (; i < len; i++)
          results[i] = fn.call(arr[i], arr[i], i, arr);

        return results;
    },

    // Deep merge two objects and return a third object
    merge: function () { // the built-in prototype merge function doesn't do deep copy
        return merge.apply(this, arguments);
    },

    offset: function (el) {
        return Zepto(el).offset();
    },

    // Add an event listener
    addEvent: function (el, event, fn) {
        if (el.addEventListener)
            el = Zepto(el);
        else
            HighchartsAdapter._extend(el);

        el.bind(event, fn);
    },

    // Remove event added with addEvent
    removeEvent: function (el, eventType, handler) {
        if (el.removeEventListener)
            el = Zepto(el);

        el.unbind && el.unbind(eventType, handler);
    },

    // Fire an event on a custom object
    fireEvent: function (el, event, eventArguments, defaultFunction) {
        var eventArgs = {
            type: event,
            target: el
        };
        // create an event object that keeps all functions
        event = new Zepto.Event(event, eventArgs);
        event = extend(event, eventArguments);
        // override the preventDefault function to be able to use
        // this for custom events
        event.preventDefault = function () {
            defaultFunction = null;
        };

        if (!el.trigger && el instanceof HTMLElement || el === doc || el === win)
            el = Zepto(el);

        el.trigger && el.trigger(event.type, event);

        if (defaultFunction)
            defaultFunction(event);
    },

    washMouseEvent: function (e) {
        return e;
    },

    // Animate a HTML element or SVG element wrapper
    animate: function (el, params, options) {
        // var el = Zepto(el.element);

        // default options
        // options = options || {};
        // options.delay = 0;
        // options.duration = (options.duration || 500) / 1000;

        for (key in params) {
            if (key !== 'd')
                el.attr(key, params[key]);
                // anim(el, key, params[key]);
                // else
        }



        // $el.stop();
        // if(!params.d) {
            // el.animate(params, options)
        // }
    },

    // Stop running animation
    stop: function (el) {
        // $(el).stop();
    },

    // Utility for iterating over an array. Parameters are reversed compared to jQuery.
    each: function (arr, fn) {
        var i = 0, len = arr.length;

        for (; i < len; i++)
            if (fn.call(arr[i], arr[i], i, arr) === false)
                return i;
    },

  // Extend a highcharts object (not svg elements) to handle events.
    _extend: function (object) {
        if (!object._highcharts_callbacks) {
            extend(object, events, {
                _highcharts_callbacks: {}
            });
        }

        return object
    }
};
}());
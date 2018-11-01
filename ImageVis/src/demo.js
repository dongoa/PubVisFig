/*! Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-canvas-draganddrop-touch-shiv-cssclasses-teststyles-hasevent-prefixes-css_pointerevents-file_api-load
 */
window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(m.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=z(e[d],"function"),z(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},n.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a};for(var C in n)w(n,C)&&(s=C.toLowerCase(),e[s]=n[C](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.hasEvent=u,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("pointerevents",function(){var a=document.createElement("x"),b=document.documentElement,c=window.getComputedStyle,d;return"pointerEvents"in a.style?(a.style.pointerEvents="auto",a.style.pointerEvents="x",b.appendChild(a),d=c&&c(a,"").pointerEvents==="auto",b.removeChild(a),!!d):!1}),Modernizr.addTest("filereader",function(){return!!(window.File&&window.FileList&&window.FileReader)});

$(document).ready(function () {

    // const blue3 = './data/colors/validation/blue/blue-3.png';
  //dongao add deep learning function in here
    const pretrainedModelURL = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';


  // ---------------------
  // Color Thief demo code
  // ---------------------
  var imageArray = {images: [
      {'file': 'examples/img/photo1.jpg'},
      {'file': 'examples/img/photo2.jpg'},
      {'file': 'examples/img/photo3.jpg'}
  ]};

  // Render example images
  var examplesHTML = Mustache.to_html($('#image-section-template').html(), imageArray);
  $('#example-images').append(examplesHTML);

  // Event handlers
  $('.run-functions-button').on('click', function(event) {


    var $this = $(this);
    $this.text('...');
    var $imageSection     = $this.closest('.image-section');
    var $colorThiefOutput = $imageSection.find('.color-thief-output');
    var $targetimage      = $imageSection.find('.target-image');

    showColorsForImage($targetimage, $imageSection);
  });

  var colorThief = new ColorThief();

  // Run Color Thief functions and display results below image.
  // We also log execution time of functions for display.
  var showColorsForImage = function($image, $imageSection ) {





    var image                    = $image[0];
    // console.log('这个image是啥',image.src);
    // var _deep_image =  loadImages(image);
    // console.log('Deep image',_deep_image);
    var start                    = Date.now();
    var color                    = colorThief.getColor(image);

    var elapsedTimeForGetColor   = Date.now() - start;
    var palette                  = colorThief.getPalette(image);
    var elapsedTimeForGetPalette = Date.now() - start + elapsedTimeForGetColor;


    //image class main code:
      tf.loadModel(pretrainedModelURL).then(model => {
          const layer = model.getLayer('conv_pw_13_relu');
          return tf.model({
              inputs: [model.inputs[0]],
              outputs: layer.output,
          });
      }).then(pretrainedModel => {
          return tf.loadModel('./data/deeplearningmodel/ml-classifier-T01-T02-T03-T04-T05-T06-T07-T08-T09-T10-T11-T12-T13-T14-T15-T16.json').then(model => {
              model.summary();





              return loadImage(image.src).then(loadedImage => {
                  // console.log("1111111111111111");
                  console.log(loadedImage);
                  // var tmp = tf.fromPixels(loadedImage);
                  // console.log("1111111111111111");
                  const image = loadAndProcessImage(loadedImage, pretrainedModel);
                  // const image2 = tf.reshape(tmp, [1,224,224,3]);
                  // console.log("1111111111111111");
                  const pretrainedModelPrediction = pretrainedModel.predict(image);
                  // console.log("1111111111111111");
                  const modelPrediction = model.predict(pretrainedModelPrediction);
                  // console.log("1111111111111111");
                  const values =  modelPrediction.dataSync();
                  // const prediction = modelPrediction.dataSync();
                  const show_T = modelPrediction.as1D().argMax().dataSync()[0] ;

                  _open_T = show_T;
                  $("#virtual-button").click();

                  console.log("查看模拟按键", $("#virtual-button"));

                  console.log("show_T",show_T);
                  // console.log('=================================',modelPrediction.as1D());

                  var colorThiefOutput = {
                      prediction_out1: toPercent(values[0]),
                      prediction_out2: toPercent(values[1]),
                      color: color,
                      palette: palette,
                      elapsedTimeForGetColor: elapsedTimeForGetColor,
                      elapsedTimeForGetPalette: elapsedTimeForGetPalette
                  };
                    // console
                  var colorThiefOuputHTML = Mustache.to_html($('#color-thief-output-template').html(), colorThiefOutput);

                  //table input
                  $(".T01-probility").html(colorThiefOutput.prediction_out1);
                  $(".T02-probility").html(colorThiefOutput.prediction_out2);
                  $(".T03-probility").html(toPercent(values[2]));
                  $(".T04-probility").html(toPercent(values[3]));
                  $(".T05-probility").html(toPercent(values[4]));
                  $(".T06-probility").html(toPercent(values[5]));
                  $(".T07-probility").html(toPercent(values[6]));
                  $(".T08-probility").html(toPercent(values[7]));
                  $(".T09-probility").html(toPercent(values[8]));
                  $(".T10-probility").html(toPercent(values[9]));
                  $(".T11-probility").html(toPercent(values[10]));
                  $(".T12-probility").html(toPercent(values[11]));
                  $(".T13-probility").html(toPercent(values[12]));
                  $(".T14-probility").html(toPercent(values[13]));
                  $(".T15-probility").html(toPercent(values[14]));
                  $(".T16-probility").html(toPercent(values[15]));
                  // $(".T03-probility").html(toPercent(values[8]));

                    // console.log(t1,typeof t1);

                  $imageSection.addClass('with-color-thief-output');
                  $imageSection.find('.run-functions-button');//.addClass('hide');

                  setTimeout(function(){
                      // $imageSection.find('.color-thief-output').css("transform","translate(80px,-50px)");
                      $imageSection.find('.color-thief-output').append(colorThiefOuputHTML).slideToggle();
                      // If the color-thief-output div is not in the viewport or cut off, scroll down.
                      var windowHeight          = $(window).height();
                      var currentScrollPosition = $('body').scrollTop()
                      var outputOffsetTop       = $imageSection.find('.color-thief-output').offset().top
                      if ((currentScrollPosition < outputOffsetTop) && (currentScrollPosition + windowHeight - 250 < outputOffsetTop)) {
                          $('body').animate({scrollTop: outputOffsetTop - windowHeight + 200 + "px"});
                      }
                  }, 300);

                  // console.log(prediction);
              });
          });
      }).catch(err => {
          console.error('Error', err);
      });





  };

  // Drag'n'drop demo
  // Thanks to Nathan Spady (http://nspady.com/) who did the bulk of the drag'n'drop work.

  // Setup the drag and drop behavior if supported
  if (Modernizr.draganddrop && !!window.FileReader && !isMobile()) {
    console.log("draging happen");
    $('#drag-drop').show();
    var $dropZone = $('#drop-zone');
    var handleDragEnter = function(event){
      console.log("1");
      $dropZone.addClass('dragging');


      return false;
    };
    var handleDragLeave = function(event){
        console.log("2");
      $dropZone.removeClass('dragging');

      return false;
    };
    var handleDragOver = function(event){
        console.log("3");

      return false;
    };
    var handleDrop = function(event){
        console.log("4");
        // $dropZone.addClass('disapear');
      $dropZone.removeClass('dragging');

      handleFiles(event.originalEvent.dataTransfer.files);
      return false;
    };
    $dropZone
      .on('dragenter', handleDragEnter)
      .on('dragleave', handleDragLeave)
      .on('dragover', handleDragOver)
      .on('drop', handleDrop);
  }

  function handleFiles(files) {
    console.log(files);
    var $draggedImages = $('#dragged-images');
    var imageType      = /image.*/;
    var fileCount      = files.length;

    for (var i = 0; i < fileCount; i++) {
      var file = files[i];

      if (file.type.match(imageType)) {
        var reader = new FileReader();
        reader.onload = function(event) {
            imageInfo = { images: [
                {'class': 'dropped-image', file: event.target.result}
              ]};
            $('.target-image').remove();
            var imageSectionHTML = Mustache.to_html($('#image-section-template').html(), imageInfo);
            $draggedImages.prepend(imageSectionHTML);

            var $imageSection = $draggedImages.find('.image-section').first();
            var $image        = $('.dropped-image .target-image');

            // Must wait for image to load in DOM, not just load from FileReader
            $image.on('load', function() {
              showColorsForImage($image, $imageSection);
            });
          };
        reader.readAsDataURL(file);
      } else {
        alert('File must be a supported image type.');
      }
    }
  }

  // This is not good practice. :-P
  function isMobile(){
    // if we want a more complete list use this: http://detectmobilebrowsers.com/
    // str.test() is more efficent than str.match()
    // remember str.test is case sensitive
    var isMobile = (/iphone|ipod|ipad|android|ie|blackberry|fennec/).test
         (navigator.userAgent.toLowerCase());
    return isMobile;
}
    function loadImage(src) {
        // console.log(src);
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(tf.fromPixels(img));
            img.onerror = (err) => reject(err);
        });
    }
    function cropImage(img) {
        width = img.shape[0];
        height = img.shape[1];
        if(width%2) width=width-1;
        if(height%2) height=height-1;
        img.shape[0] = width;
        img.shape[1] = height;
        // use the shorter side as the size to which we will crop
        const shorterSide = Math.min(img.shape[0], img.shape[1]);

        // calculate beginning and ending crop points
        const startingHeight = (height - shorterSide) / 2;
        const startingWidth = (width - shorterSide) / 2;
        const endingHeight = startingHeight + shorterSide;
        const endingWidth = startingWidth + shorterSide;

        // return image data cropped to those points
        return img.slice([startingWidth, startingHeight, 0], [endingWidth, endingHeight, 3]);
    }
    function batchImage(image) {
        // Expand our tensor to have an additional dimension, whose size is 1
        const batchedImage = image.expandDims(0);

        // Turn pixel data into a float between -1 and 1.
        return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    }
    function resizeImage(image) {
        return tf.image.resizeBilinear(image, [224, 224]);
    }
    function loadAndProcessImage(image) {
        const croppedImage = cropImage(image);
        const resizedImage = resizeImage(croppedImage);
        const batchedImage = batchImage(resizedImage);
        return batchedImage;
    }
    function toPercent(point){
        var str=Number(point*100).toFixed(2);
        str+="%";
        return str;
    }

});

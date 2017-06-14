/**
 * toast-for-vue v1.0.0
 * https://github.com/zzw918/toast-for-vue
 * Released under the MIT license
 * Date: 2017-05-22
 * Author: John Zhu , in xjtu
 */

var Toast = {};
Toast.install = function (Vue, options) {
  // set default option 
  var defaultOpt = {
    defaultType: 'center',
    defaultDuration: '2000'
  };

  // replace the option if we set params in Vue.use()
  for (var prop in options) {
    defaultOpt[prop] = options[prop];
  }

  // define the core function 
  Vue.prototype.$toast = function (message, type) {

    // we think center type the default type
    if (typeof type == "undefined") {
      var curType = defaultOpt.defaultType;
    } else {
      var curType = type;
    }

    // NO:if toast is used, we should delay the defaultDuration
    // YES: if toast is used, just return;
    if (document.querySelector('.toast')) {
      // function getTime() {
      //   return new Date().getTime();
      // }
      // var startTime = getTime();
      // while (getTime() < startTime + defaultOpt.defaultDuration);
      return; 
    }

    // create the constructor
    var template = Vue.extend({
      template: '<div class="toast toast-' + curType + '">' + message + "</div>"
    });

    // create an instance and mount it on an element
    var temEle = new template().$mount().$el;

    // insert the instance 
    document.body.appendChild(temEle);

    // after the duration time, remove it
    setTimeout(function () {
      document.body.removeChild(temEle);
    }, defaultOpt.defaultDuration);
  };

  // set different kinds for call
  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$toast[type] = function (message) {
      return Vue.prototype.$toast(message, type);
    }
  });



  // for loading
  Vue.prototype.$loading = function(tips,type) {
          var load = document.querySelector('.load-mark');
          
          if(type == 'close'){
              load && document.body.removeChild(load);
          }else{
              if(load){
                  // 如果loading还在，则不再执行
                  return;
              }
              var loadTpl = Vue.extend({
                  template: '<div class="load-mark"><div class="load-box"><div class="loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_2"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="load-content">'+tips+'</div></div></div>'
              });
              var tpl = new loadTpl().$mount().$el;
              document.body.appendChild(tpl);
          }
      };

      ['open', 'close'].forEach(function(type) {
          Vue.prototype.$loading[type] = function(tips) {
              return Vue.prototype.$loading(tips,type)
          }
      });
}

module.exports = Toast;

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
}

module.exports = Toast;

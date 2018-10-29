UrlParam = function() { 
  var data, index;    
  (function init() {    
    data = [];    
    index = {};   
    var u = window.location.search.substr(1);    
    if (u != '') {    
      var params = decodeURIComponent(u).split('&');
      for (var i = 0, len = params.length; i < len; i++) {
        if (params[i] != '') {
          var p = params[i].split("=");
          if (p.length == 1 || (p.length == 2 && p[1] == '')) {
            data.push(['']);    
            index[p[0]] = data.length - 1;    
          } else if (typeof(p[0]) == 'undefined' || p[0] == '') { 
            continue;
          } else if (typeof(index[p[0]]) == 'undefined') {
            data.push([p[1]]);    
            index[p[0]] = data.length - 1;    
          } else { 
            data[index[p[0]]].push(p[1]);    
          }    
        }    
      }    
    }    
  })();    
  return {     
    param : function(o) { 
      try {    
        return (typeof(o) == 'number' ? data[o][0] : data[index[o]][0]);    
      } catch (e) {    
      }    
    },     
    paramValues : function(o) {
      try {    
        return (typeof(o) == 'number' ? data[o] : data[index[o]]);    
      } catch (e) {}    
    },    
    hasParam : function(paramName) {
      return typeof(paramName) == 'string' ? typeof(index[paramName]) != 'undefined' : false;
    },    
    paramMap : function() {
      var map = {};    
      try {    
        for (var p in index) {  map[p] = data[index[p]];  }    
      } catch (e) {}    
      return map;    
    }    
  }    
}();   
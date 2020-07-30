const Var = {
    get: function(obj, keys, dft) {
      keys = Array.isArray(keys)
        ? keys
        : keys.replace(/(\[(\d)\])/g, '.$2').split('.');
      obj = obj[keys[0]];
      if (obj && keys.length > 1) {
        return this.get(obj, keys.slice(1), dft);
      }
      return obj === undefined ? dft : obj;
    },
  
    set: function(obj, keys, val) {
      keys = Array.isArray(keys)
        ? keys
        : keys.replace(/(\[(\d)\])/g, '.$2').split('.');
      if (keys.length > 1) {
        obj[keys[0]] = obj[keys[0]] || {};
        return this.set(obj[keys[0]], keys.slice(1), val);
      }
      obj[keys[0]] = val;
    },
  
    getInt: function(obj, keys, dft) {
      let val = Var.get(obj, keys, dft);
      val = parseInt(val, 10);
      return isNaN(val) ? dft : val;
    },
  
    getString: function(obj, keys, dft) {
      let val = Var.get(obj, keys, dft);
      if (val === null) {
        val = '';
      }
      return val.toString();
    },
  
    format: function(number, n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = parseInt(number, 10).toFixed(Math.max(0, ~~n));
  
      return (c ? num.replace('.', c) : num).replace(
        new RegExp(re, 'g'),
        '$&' + (s || ','),
      );
    },
  
    size: function(ob) {
      var bytes = 0;
  
      function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
          switch (typeof obj) {
            case 'number':
              bytes += 8;
              break;
            case 'string':
              bytes += obj.length * 2;
              break;
            case 'boolean':
              bytes += 4;
              break;
            case 'object':
              var objClass = Object.prototype.toString.call(obj).slice(8, -1);
              if (objClass === 'Object' || objClass === 'Array') {
                for (var key in obj) {
                  if (!obj.hasOwnProperty(key)) {
                    continue;
                  }
                  sizeOf(obj[key]);
                }
              } else {
                bytes += obj.toString().length * 2;
              }
              break;
          }
        }
        return bytes;
      }
  
      function formatByteSize(b) {
        if (b < 1024) {
          return b + ' bytes';
        } else if (b < 1048576) {
          return (b / 1024).toFixed(3) + ' KiB';
        } else if (b < 1073741824) {
          return (b / 1048576).toFixed(3) + ' MiB';
        } else {
          return (b / 1073741824).toFixed(3) + ' GiB';
        }
      }
  
      return formatByteSize(sizeOf(ob));
    },
  
    clone: function(obj) {
      var copy;
  
      // Handle the 3 simple types, and null or undefined
      if (null == obj || 'object' != typeof obj) return obj;
  
      // Handle Date
      if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
      }
  
      // Handle Array
      if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = clone(obj[i]);
        }
        return copy;
      }
  
      // Handle Object
      if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = Var.clone(obj[attr]);
        }
        return copy;
      }
  
      throw new Error("Unable to copy obj! Its type isn't supported.");
    },
  };
  
  export default Var;
  
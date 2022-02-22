'use strict';

var CleanCss = require('clean-css');
var events = require('events');
var rework = require('rework');
var glob = require('glob');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CleanCss__default = /*#__PURE__*/_interopDefaultLegacy(CleanCss);
var rework__default = /*#__PURE__*/_interopDefaultLegacy(rework);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var RULE_TYPE = "rule";
var MEDIA_TYPE = "media";

var CssTreeWalker = /*#__PURE__*/function (_EventEmitter) {
  _inherits(CssTreeWalker, _EventEmitter);

  var _super = _createSuper(CssTreeWalker);

  function CssTreeWalker(code, plugins) {
    var _this;

    _classCallCheck(this, CssTreeWalker);

    _this = _super.call(this);
    _this.startingSource = code;
    _this.ast = null;
    plugins.forEach(function (plugin) {
      plugin.initialize(_assertThisInitialized(_this));
    });
    return _this;
  }

  _createClass(CssTreeWalker, [{
    key: "beginReading",
    value: function beginReading() {
      this.ast = rework__default["default"](this.startingSource).use(this.readPlugin.bind(this));
    }
  }, {
    key: "readPlugin",
    value: function readPlugin(tree) {
      this.readRules(tree.rules);
      this.removeEmptyRules(tree.rules);
    }
  }, {
    key: "readRules",
    value: function readRules(rules) {
      var _iterator = _createForOfIteratorHelper(rules),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rule = _step.value;

          if (rule.type === RULE_TYPE) {
            this.emit("readRule", rule.selectors, rule);
          }

          if (rule.type === MEDIA_TYPE) {
            this.readRules(rule.rules);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "removeEmptyRules",
    value: function removeEmptyRules(rules) {
      var emptyRules = [];

      var _iterator2 = _createForOfIteratorHelper(rules),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var rule = _step2.value;
          var ruleType = rule.type;

          if (ruleType === RULE_TYPE && rule.selectors.length === 0) {
            emptyRules.push(rule);
          }

          if (ruleType === MEDIA_TYPE) {
            this.removeEmptyRules(rule.rules);

            if (rule.rules.length === 0) {
              emptyRules.push(rule);
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      emptyRules.forEach(function (emptyRule) {
        var index = rules.indexOf(emptyRule);
        rules.splice(index, 1);
      });
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this.ast) {
        return this.ast.toString().replace(/,\n/g, ",");
      }

      return "";
    }
  }]);

  return CssTreeWalker;
}(events.EventEmitter);

var UglifyJS = require("uglify-js");

var fs$1 = require("fs");

var compressCode = function compressCode(code) {
  try {
    // Try to minimize the code as much as possible, removing noise.
    var ast = UglifyJS.parse(code);
    ast.figure_out_scope();
    var compressor = UglifyJS.Compressor({
      warnings: false
    });
    ast = ast.transform(compressor);
    ast.figure_out_scope();
    ast.compute_char_frequency();
    ast.mangle_names({
      toplevel: true
    });
    code = ast.print_to_string().toLowerCase();
  } catch (e) {// If compression fails, assume it's not a JS file and return the full code.
  }

  return code.toLowerCase();
};

var concatFiles = function concatFiles(files, options) {
  return files.reduce(function (total, file) {
    var code = "";

    try {
      code = fs$1.readFileSync(file, "utf8");
      code = options.compress ? compressCode(code) : code;
    } catch (e) {
      console.warn(e.message);
    }

    return "".concat(total).concat(code, " ");
  }, "");
};
var getFilesFromPatternArray = function getFilesFromPatternArray(fileArray) {
  var sourceFiles = {};

  var _iterator = _createForOfIteratorHelper(fileArray),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var string = _step.value;

      try {
        // See if string is a filepath, not a file pattern.
        fs$1.statSync(string);
        sourceFiles[string] = true;
      } catch (e) {
        var files = glob__default["default"].sync(string);
        files.forEach(function (file) {
          sourceFiles[file] = true;
        });
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return Object.keys(sourceFiles);
};
var filesToSource = function filesToSource(files, type) {
  var isContent = type === "content";
  var options = {
    compress: isContent
  };

  if (Array.isArray(files)) {
    files = getFilesFromPatternArray(files);
    return concatFiles(files, options);
  } // 'files' is already a source string.


  return isContent ? compressCode(files) : files;
};
var FileUtil = {
  concatFiles: concatFiles,
  filesToSource: filesToSource,
  getFilesFromPatternArray: getFilesFromPatternArray
};

var beginningLength;

var printInfo = function printInfo(endingLength) {
  var sizeReduction = ((beginningLength - endingLength) / beginningLength * 100).toFixed(1);
  console.log("\n    ________________________________________________\n    |\n    |   PurifyCSS has reduced the file size by ~ ".concat(sizeReduction, "%  \n    |\n    ________________________________________________\n    "));
};

var printRejected = function printRejected(rejectedTwigs) {
  console.log("\n    ________________________________________________\n    |\n    |   PurifyCSS - Rejected selectors:  \n    |   ".concat(rejectedTwigs.join("\n    |\t"), "\n    |\n    ________________________________________________\n    "));
};

var startLog = function startLog(cssLength) {
  beginningLength = cssLength;
};

var PrintUtil = {
  printInfo: printInfo,
  printRejected: printRejected,
  startLog: startLog
};

var addWord = function addWord(words, word) {
  if (word) words.push(word);
};

var getAllWordsInContent = function getAllWordsInContent(content) {
  var used = {
    // Always include html and body.
    html: true,
    body: true
  };
  var words = content.split(/[^a-z]/g);

  var _iterator = _createForOfIteratorHelper(words),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var word = _step.value;
      used[word] = true;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return used;
};
var getAllWordsInSelector = function getAllWordsInSelector(selector) {
  // Remove attr selectors. "a[href...]"" will become "a".
  selector = selector.replace(/\[(.+?)\]/g, "").toLowerCase(); // If complex attr selector (has a bracket in it) just leave
  // the selector in. ¯\_(ツ)_/¯

  if (selector.includes("[") || selector.includes("]")) {
    return [];
  }

  var skipNextWord = false,
      word = "",
      words = [];

  var _iterator2 = _createForOfIteratorHelper(selector),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var letter = _step2.value;
      if (skipNextWord && !/[ #.]/.test(letter)) continue; // If pseudoclass or universal selector, skip the next word

      if (/[:*]/.test(letter)) {
        addWord(words, word);
        word = "";
        skipNextWord = true;
        continue;
      }

      if (/[a-z]/.test(letter)) {
        word += letter;
      } else {
        addWord(words, word);
        word = "";
        skipNextWord = false;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  addWord(words, word);
  return words;
};

var isWildcardWhitelistSelector = function isWildcardWhitelistSelector(selector) {
  return selector[0] === "*" && selector[selector.length - 1] === "*";
};

var hasWhitelistMatch = function hasWhitelistMatch(selector, whitelist) {
  var _iterator = _createForOfIteratorHelper(whitelist),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var el = _step.value;
      if (selector.includes(el)) return true;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return false;
};

var SelectorFilter = /*#__PURE__*/function () {
  function SelectorFilter(contentWords, whitelist) {
    _classCallCheck(this, SelectorFilter);

    this.contentWords = contentWords;
    this.rejectedSelectors = [];
    this.wildcardWhitelist = [];
    this.parseWhitelist(whitelist);
  }

  _createClass(SelectorFilter, [{
    key: "initialize",
    value: function initialize(CssSyntaxTree) {
      CssSyntaxTree.on("readRule", this.parseRule.bind(this));
    }
  }, {
    key: "parseWhitelist",
    value: function parseWhitelist(whitelist) {
      var _this = this;

      whitelist.forEach(function (whitelistSelector) {
        whitelistSelector = whitelistSelector.toLowerCase();

        if (isWildcardWhitelistSelector(whitelistSelector)) {
          // If '*button*' then push 'button' onto list.
          _this.wildcardWhitelist.push(whitelistSelector.substr(1, whitelistSelector.length - 2));
        } else {
          getAllWordsInSelector(whitelistSelector).forEach(function (word) {
            _this.contentWords[word] = true;
          });
        }
      });
    }
  }, {
    key: "parseRule",
    value: function parseRule(selectors, rule) {
      rule.selectors = this.filterSelectors(selectors);
    }
  }, {
    key: "filterSelectors",
    value: function filterSelectors(selectors) {
      var contentWords = this.contentWords,
          rejectedSelectors = this.rejectedSelectors,
          wildcardWhitelist = this.wildcardWhitelist,
          usedSelectors = [];
      selectors.forEach(function (selector) {
        if (hasWhitelistMatch(selector, wildcardWhitelist)) {
          usedSelectors.push(selector);
          return;
        }

        var words = getAllWordsInSelector(selector),
            usedWords = words.filter(function (word) {
          return contentWords[word];
        });

        if (usedWords.length === words.length) {
          usedSelectors.push(selector);
        } else {
          rejectedSelectors.push(selector);
        }
      });
      return usedSelectors;
    }
  }]);

  return SelectorFilter;
}();

var fs = require("fs");
var OPTIONS = {
  output: false,
  minify: false,
  info: false,
  rejected: false,
  whitelist: [],
  cleanCssOptions: {}
};

var getOptions = function getOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opt = {};

  for (var option in OPTIONS) {
    opt[option] = options[option] || OPTIONS[option];
  }

  return opt;
};

var minify = function minify(cssSource, options) {
  return new CleanCss__default["default"](options).minify(cssSource).styles;
};

var purify = function purify(searchThrough, css, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }

  options = getOptions(options);
  var cssString = FileUtil.filesToSource(css, "css"),
      content = FileUtil.filesToSource(searchThrough, "content");
  PrintUtil.startLog(minify(cssString).length);
  var wordsInContent = getAllWordsInContent(content),
      selectorFilter = new SelectorFilter(wordsInContent, options.whitelist),
      tree = new CssTreeWalker(cssString, [selectorFilter]);
  tree.beginReading();
  var source = tree.toString();
  source = options.minify ? minify(source, options.cleanCssOptions) : source; // Option info = true

  if (options.info) {
    if (options.minify) {
      PrintUtil.printInfo(source.length);
    } else {
      PrintUtil.printInfo(minify(source, options.cleanCssOptions).length);
    }
  } // Option rejected = true


  if (options.rejected && selectorFilter.rejectedSelectors.length) {
    PrintUtil.printRejected(selectorFilter.rejectedSelectors);
  }

  if (options.output) {
    fs.writeFile(options.output, source, function (err) {
      if (err) return err;
    });
  } else {
    return callback ? callback(source) : source;
  }
};

module.exports = purify;

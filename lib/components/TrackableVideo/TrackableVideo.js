'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function post(iframe, eventName) {
  var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "*";

  var data = {
    method: 'addEventListener'
  };

  if (eventName) {
    data.value = eventName;
  }

  iframe.contentWindow.postMessage(JSON.stringify(data), origin);
}

var TrackableVideo = function (_Component) {
  _inherits(TrackableVideo, _Component);

  function TrackableVideo() {
    _classCallCheck(this, TrackableVideo);

    return _possibleConstructorReturn(this, (TrackableVideo.__proto__ || Object.getPrototypeOf(TrackableVideo)).apply(this, arguments));
  }

  _createClass(TrackableVideo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('message', this.onMessageReceived.bind(this), false);
    }
  }, {
    key: 'onMessageReceived',
    value: function onMessageReceived(e) {
      var data = typeof e.data == 'string' ? JSON.parse(e.data) : e.data;

      console.log(data);

      var _props = this.props,
          onReady = _props.onReady,
          onStart = _props.onStart,
          onProgress = _props.onProgress,
          onPause = _props.onPause,
          onFinish = _props.onFinish;


      switch (data.event) {
        case 'ready':
          return this.onReady();
        case 'play':
          return onStart && onStart(data.data);
        case 'playProgress':
          return onProgress && onProgress(data.data);
        case 'pause':
          return onPause && onPause(data.data);
        case 'finish':
          return onFinish && onFinish(data.data);
        default:
          console.log('no handler for:', data.event);
      }
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      post(this._iframe, 'play');
      post(this._iframe, 'pause');
      post(this._iframe, 'finish');
      post(this._iframe, 'playProgress');
      this.props.onReady && this.props.onReady();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          onReady = _props2.onReady,
          onStart = _props2.onStart,
          onPause = _props2.onPause,
          onProgress = _props2.onProgress,
          onFinish = _props2.onFinish,
          iframeProps = _objectWithoutProperties(_props2, ['onReady', 'onStart', 'onPause', 'onProgress', 'onFinish']);

      return _react2.default.createElement('iframe', _extends({}, iframeProps, {
        ref: function ref(c) {
          return _this2._iframe = c;
        }
      }));
    }
  }]);

  return TrackableVideo;
}(_react.Component);

TrackableVideo.propTypes = {
  onReady: _propTypes.func,
  onStart: _propTypes.func,
  onPause: _propTypes.func,
  onProgress: _propTypes.func,
  onFinish: _propTypes.func
};

exports.default = TrackableVideo;
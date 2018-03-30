var Alert = undefined;

(function( Alert ) {
	var alert, error, info, success, warning, _container;
	info = function( message, title, options ) {
		return alert("info", message, title, "icon-info-sign", options );
	};
	warning = function( message, title, options ) {
		return alert( "warning", message, title, "icon-warning-sign", options );
	};
	error = function( message, title, options ) {
		return alert( "error", message, title, "icon-minus-sign", options );
	};
	success = function( message, title, options ) {
		return alert( "success", message, title, "icon-ok-sign", options );
	};
	alert = function( type, message, title, icon, options ) {
		var alertElem, messageElem, titleElem, iconElem, innerElem, _container;
		if ( typeof options === "undefined" ) {
			options = {};
		}
		options = $.extend( {}, Alert.defaults, options );
		if (!_container) {
			_container = $("#alerts");
			if (_container.length === 0) {
				_container = $( "<ul>" ).attr( "id", "alerts" ).appendTo( $( "body" ) );
			}
		}
		if ( options.width ) {
			_container.css({
				width: options.width
			});
		}
		alertElem = $( "<li>" ).addClass( "alert" ).addClass( "alert-" + type );
		setTimeout(function() {
			alertElem.addClass( 'open' );
		}, 1);
		if ( icon ) {
			iconElem = $( "<i>" ).addClass( icon );
			alertElem.append(iconElem);
		}
		innerElem = $( "<div>" ).addClass( "alert-block" );
		alertElem.append( innerElem );
		if ( title ) {
			titleElem = $( "<div>" ).addClass( "alert-title" ).append( title );
			innerElem.append(titleElem);
		}
		if ( message ) {
			messageElem = $( "<div>" ).addClass( "alert-message" ).append( message );
			innerElem.append( messageElem );
		}
		if ( options.displayDuration > 0 ) {
			setTimeout((function() {
				leave();
			}), options.displayDuration );
		} else {
			innerElem.append( "<em>Click to Dismiss</em>" );
		}
		alertElem.on( "click", function() {
			leave();
		});
		function leave() {
			alertElem.removeClass( 'open' );
			alertElem.one( 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',  function() { return alertElem.remove(); });
		}
		return _container.prepend( alertElem );
	};
	Alert.defaults = {
		width: "",
		icon: "",
		displayDuration: 3000,
		pos: ""
	};
	Alert.info = info;
	Alert.warning = warning;
	Alert.error = error;
	Alert.success = success;
	return _container = void 0;


})(Alert || ( Alert = {} ) );

this.Alert = Alert;

$( '#test' ).on( 'click', function() {
	Alert.info( 'Message' );
});
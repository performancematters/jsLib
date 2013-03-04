/* Configuration */
var _wrs_conf_editorEnabled = true;
var _wrs_conf_CASEnabled = true;

var _wrs_conf_imageMathmlAttribute = 'alt';			// Tag where save mathml code on formula editor. <img [the tag]="..." />
var _wrs_conf_CASMathmlAttribute = 'alt';			// Tag where save mathml code on CAS editor. <img [the tag]="..."  />

var _wrs_conf_editorPath = _wrs_currentPath + '/pluginwiris/integration/editor.php';	// Editor window.
var _wrs_conf_editorAttributes = 'width=500, height=400, scroll=no, resizable=yes';		// Editor window attributes
var _wrs_conf_CASPath = _wrs_currentPath + '/pluginwiris/integration/cas.php';			// CAS window.
var _wrs_conf_CASAttributes = 'width=640, height=480, scroll=no, resizable=yes';		// CAS window attributes.

var _wrs_conf_createimagePath = _wrs_currentPath + '/pluginwiris/integration/createimage.php';			// Script to create images.
var _wrs_conf_createcasimagePath = _wrs_currentPath + '/pluginwiris/integration/createcasimage.php';	// Script to create CAS images.

var _wrs_conf_saveMode = 'tags';		// this value can be 'tags', 'xml' or 'safeXml'.

/* Vars */
// Vars name sintax are: _wrs_int_*. For example, this variable is true when editor window is opened (use it to prevent two editor windows opened at the same time):
var _wrs_int_window_opened = false;
var _wrs_int_editorIcon = _wrs_currentPath + '/pluginwiris/core/icons/formula.gif';
var _wrs_int_CASIcon = _wrs_currentPath + '/pluginwiris/core/icons/cas.gif';
var _wrs_int_language = 'en';

// Also, remember to set _wrs_isNewElement as true or false when you are opening a new editor or CAS window if you are creating a new formula/CAS or not. This is VERY IMPORTANT.

/* Functions */
// Functions name sintax are: wrs_int_*.

/**
 * This function must be called at program start, and it should:
 *	- Assign events to the main iframe with wrs_addIframeEvents function. Sintax: wrs_addIframeEvents(iframe, wrs_int_doubleClickHandler, wrs_int_mousedownHandler, wrs_int_mouseupHandler).
 *	- Add the editor toolbar button.
 */
function wrs_int_init(/* Your own params */) {
	// At first, we get the iframe. For example:
	var iframe = /* Your own way to get the iframe */
	
	// Then, we assign events to the iframe. For example:
	wrs_addIframeEvents(iframe, wrs_int_doubleClickHandler, wrs_int_mousedownHandler, wrs_int_mouseupHandler);
	
	// Now, we parse the initial code. Doing it, we are replacing CAS applets with CAS images. For example:
	iframe.contentWindow.document.body.innerHTML = wrs_initParse(iframe.contentWindow.document.body.innerHTML);
	
	// Then, create an event for parse the output code. Doing it, we are replacing CAS images with CAS applets. For example:
	var form = /* Your own way to get the form */
	
	wrs_addEvent(form, 'submit', function () {
		iframe.contentWindow.document.body.innerHTML = wrs_endParse(iframe.contentWindow.document.body.innerHTML);
	});
	
	// Finally, we must add toolbar buttons to the editor. Implement your own code.
	// You can use _wrs_int_editorIcon and _wrs_int_CASIcon variables.
	// For example:
	if (_wrs_conf_editorEnabled) {
		/* Add the editor button to the toolbar using _wrs_int_editorIcon */
	}
	
	if (_wrs_conf_CASEnabled) {
		/* Add the CAS button to the toolbar using _wrs_int_CASIcon */
	}
}

/**
 * Handles a double click on the iframe.
 * This function provides the editing formulas feature.
 * @param object iframe Target
 * @param object element Element double clicked
 */
function wrs_int_doubleClickHandler(iframe, element) {
	if (element.nodeName.toLowerCase() == 'img') {
		if (element.className == 'Wirisformula') {
			if (!_wrs_int_window_opened) {
				_wrs_temporalImage = element;			// Remember set _wrs_temporalImage as element!
				// Open here the editor with the formula.
			}
		}
		else if (element.className == 'Wiriscas') {
			if (!_wrs_int_window_opened) {
				_wrs_temporalImage = element;			// Remember set _wrs_temporalImage as element!
				// Open here the CAS editor with the formula.
			}
		}
	}
}

/**
 * Handles a mouse down event on the iframe.
 * This function saves the clicked image for future uses (for example, prohibits resizing or takes its formula code).
 * @param object iframe Target
 * @param object element Element mouse downed
 */
function wrs_int_mousedownHandler(iframe, element) {
	if (element.nodeName.toLowerCase() == 'img') {
		if (element.className == 'Wirisformula' || element.className == 'Wiriscas') {
			// Save the image
		}
	}
}

/**
 * Handles a mouse up event on the iframe.
 * This function prohibits formula resizing.
 * @param object iframe Target
 * @param object element Element mouse downed
 */
function wrs_int_mouseupHandler(iframe, element) {
	if (/* Image saved in wrs_int_mousedownHandler. */) {
		setTimeout(function () {
			with (/* Image saved in wrs_int_mousedownHandler. */) {
				removeAttribute('style');
				removeAttribute('width');
				removeAttribute('height');
			}
		}, 10);
	}
}

/**
 * Calls wrs_updateFormula with well params.
 * This function is called when you click on "Ok" button in editor window.
 * This function must call wrs_updateFormula with iframe param and mathml param.
 * @param string mathml
 */
function wrs_int_updateFormula(mathml) {
	wrs_updateFormula(/* Your editor iframe object. */, mathml);
}

/**
 * Calls wrs_updateCAS with well params. This function must call wrs_updateCAS with iframe param, mathml param, image param, width param and height param.
 * @param string appletCode
 * @param string image
 * @param int width
 * @param int height
 */
function wrs_int_updateCAS(appletCode, image, width, height) {
	wrs_updateCAS(/* Your editor iframe object. */, appletCode, image, width, height);
}

/**
 * Handles window closing.
 * This function is called when you closes editor or CAS window.
 */
function wrs_int_notifyWindowClosed() {
	_wrs_int_window_opened = false;
}

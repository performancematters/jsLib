/* Configuration */
var _wrs_conf_editorEnabled = true;
var _wrs_conf_CASEnabled = false;

var _wrs_conf_imageMathmlAttribute = 'alt';			// Tag where save mathml code on formula editor. <img [the tag]="..." />
var _wrs_conf_CASMathmlAttribute = 'alt';			// Tag where save mathml code on CAS editor. <img [the tag]="..."  />

var _wrs_conf_editorPath = _wrs_currentPath + 'core/jsLib/wiris/pluginwiris/cfintegration/editor.cfm';        // _wrs_conf_editorPath = '/pluginwiris_engine/app/editor';        // _wrs_conf_editorPath = '/pluginwiris_engine/app/editor';        // _wrs_conf_editorPath = _wrs_currentPath + '/pluginwiris/integration/editor.php';	// Editor window.
var _wrs_conf_editorAttributes = 'width=500, height=400, scroll=no, resizable=yes';		// Editor window attributes
var _wrs_conf_CASPath = _wrs_currentPath + '/core/jsLib/wiris/pluginwiris/integration/cas.php';        // _wrs_conf_CASPath = '/pluginwiris_engine/app/cas';        // _wrs_conf_CASPath = '/pluginwiris_engine/app/cas';        // _wrs_conf_CASPath = _wrs_currentPath + '/pluginwiris/integration/cas.php';			// CAS window.
var _wrs_conf_CASAttributes = 'width=640, height=480, scroll=no, resizable=yes';		// CAS window attributes.

var _wrs_conf_createimagePath = _wrs_currentPath + 'core/functions/cf/formula/createimage.cfm';        // _wrs_conf_createimagePath = '/pluginwiris_engine/app/createimage';        // _wrs_conf_createimagePath = '/pluginwiris_engine/app/createimage';        // _wrs_conf_createimagePath = _wrs_currentPath + '/pluginwiris/integration/createimage.php';			// Script to create images.
var _wrs_conf_createcasimagePath = _wrs_currentPath + 'core/jsLib/wiris/pluginwiris_engine/app/createcasimage';        // _wrs_conf_createcasimagePath = '/pluginwiris_engine/app/createcasimage';        // _wrs_conf_createcasimagePath = '/pluginwiris_engine/app/createcasimage';        // _wrs_conf_createcasimagePath = _wrs_currentPath + '/pluginwiris/integration/createcasimage.php';	// Script to create CAS images.

var _wrs_conf_saveMode = 'tags';		// this value can be 'tags', 'xml' or 'safeXml'.

/* Vars */
// Vars name sintax are: _wrs_int_*. For example, this variable is true when editor window is opened (use it to prevent two editor windows opened at the same time):
var _wrs_int_editorIcon = _wrs_currentPath + 'core/jsLib/wiris/pluginwiris/core/icons/formula.gif';
var _wrs_int_CASIcon = _wrs_currentPath + 'core/jsLib/wiris/pluginwiris/core/icons/cas.gif';
var _wrs_int_temporalIframe;
var _wrs_int_window;
var _wrs_int_window_opened = false;
var _wrs_int_temporalImageResizing;
var _wrs_int_language;
var _wrs_isNewElement;
var _wrs_temporalImage;

if (navigator.userLanguage)
{
	_wrs_int_language = navigator.userLanguage;
}
else if (navigator.language)
{
	_wrs_int_language = navigator.language.substring(0, 2);
}
else
{
	_wrs_int_language = 'en';
}


// PMI Vars
//
var PMI_Wiris_TargetIFrame = null;
var PMI_Wiris_TargetTextArea = null;

// Also, remember to set _wrs_isNewElement as true or false when you are opening a new editor or CAS window if you are creating a new formula/CAS or not. This is VERY IMPORTANT.

/* Functions */

function PMI_Wiris_CreateFormulaButton()
{
	var button = document.createElement('img');
	button.src = _wrs_int_editorIcon;
	button.style.cursor = 'pointer';
	return button;
}

function PMI_Wiris_CreateCASButton()
{
	var button = document.createElement('img');
	button.src = _wrs_int_CASIcon;
	button.style.cursor = 'pointer';
	return button;
}

function PMI_Wiris_FormulaButtonClickedHandler(e)
{
	PMI_Wiris_OpenNewFormulaEditor(PMI_Wiris_TargetIFrame, _wrs_int_language);
}

function PMI_Wiris_CASButtonClickedHandler(e)
{
	PMI_Wiris_OpenNewCAS(PMI_Wiris_TargetIFrame, _wrs_int_language);
}

function PMI_Wiris_Init(target_element, target_iframe)
{
	PMI_Wiris_TargetTextArea = target_element;
	PMI_Wiris_TargetIFrame = target_iframe;

	/* Assigning events to the WYSIWYG editor */
	wrs_addIframeEvents(PMI_Wiris_TargetIFrame, PMI_Wiris_DoubleClickHandler, PMI_Wiris_MousedownHandler, PMI_Wiris_MouseupHandler);

	/* Parsing input text */
	PMI_Wiris_TargetIFrame.contentWindow.document.body.innerHTML = wrs_initParse(PMI_Wiris_TargetTextArea.innerHTML);

	/* Creating an event for parse the output text */
	PMI_Wiris_TargetTextArea.value = wrs_endParse(PMI_Wiris_TargetIFrame.contentWindow.document.body.innerHTML);
}

function PMI_Wiris_DoubleClickHandler(iframe, element)
{
	if (element.nodeName.toLowerCase() == 'img')
	{
		if (wrs_containsClass(element, 'Wirisformula'))
		{
			if (!_wrs_int_window_opened)
			{
				_wrs_temporalImage = element;
				PMI_Wiris_OpenExistingFormulaEditor(iframe, _wrs_int_language);
			}
			else
			{
				_wrs_int_window.focus();
			}
		}
		else if (wrs_containsClass(element, 'Wiriscas'))
		{
			if (!_wrs_int_window_opened)
			{
				_wrs_temporalImage = element;
				PMI_Wiris_OpenExistingCAS(iframe, _wrs_int_language);
			}
			else
			{
				_wrs_int_window.focus();
			}
		}
	}
}
function PMI_Wiris_MousedownHandler(iframe, element)
{
	if (element.nodeName.toLowerCase() == 'img')
	{
		if (wrs_containsClass(element, 'Wirisformula') || wrs_containsClass(element, 'Wiriscas'))
		{
			_wrs_int_temporalImageResizing = element;
		}
	}
}

function PMI_Wiris_MouseupHandler() {
	if (_wrs_int_temporalImageResizing)
	{
		setTimeout(function ()
		    {
				_wrs_int_temporalImageResizing.removeAttribute('style');
				_wrs_int_temporalImageResizing.removeAttribute('width');
				_wrs_int_temporalImageResizing.removeAttribute('height');
			}, 10);
	}
}

function wrs_int_updateFormula(mathml)
{
	wrs_updateFormula(_wrs_int_temporalIframe, mathml);
}

function wrs_int_updateCAS(appletCode, image, width, height)
{
	wrs_updateCAS(_wrs_int_temporalIframe, appletCode, image, width, height);
}

function wrs_int_notifyWindowClosed()
{
	_wrs_int_window_opened = false;
}

function PMI_Wiris_OpenNewFormulaEditor(iframe, language)
{
	if (_wrs_int_window_opened) {
		_wrs_int_window.focus();
	}
	else {
		_wrs_int_window_opened = _wrs_isNewElement = true;
		_wrs_int_temporalIframe = iframe;
		_wrs_int_window = window.open(_wrs_conf_editorPath, 'WIRISFormulaEditor', _wrs_conf_editorAttributes);
	}
}

function PMI_Wiris_OpenExistingFormulaEditor(iframe, language)
{
	_wrs_int_window_opened = true;
	_wrs_isNewElement = false;
	_wrs_int_temporalIframe = iframe;
	_wrs_int_window = window.open(_wrs_conf_editorPath, 'WIRISFormulaEditor', _wrs_conf_editorAttributes);
}

function PMI_Wiris_OpenNewCAS(iframe, language)
{
	if (_wrs_int_window_opened)
	{
		_wrs_int_window.focus();
	}
	else
	{
		_wrs_int_window_opened = true;
		_wrs_isNewElement = true;
		_wrs_int_temporalIframe = iframe;
		_wrs_int_window = wrs_openCASWindow(iframe, true, language);
	}
}

function PMI_Wiris_OpenExistingCAS(iframe, language)
{
	_wrs_int_window_opened = true;
	_wrs_isNewElement = false;
	_wrs_int_temporalIframe = iframe;
	_wrs_int_window = wrs_openCASWindow(iframe, true, language);
}


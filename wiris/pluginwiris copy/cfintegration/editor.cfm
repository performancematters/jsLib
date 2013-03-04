<!--- 

$Id: editor.cfm 8723 2010-07-02 19:02:45Z kurt.davis $ 

$Rev: 8723 $ 

$Author: kurt.davis $ 

$Date: 2010-07-02 15:02:45 -0400 (Fri, 02 Jul 2010) $

$HeadURL: http://atlanta-web.performancematters.com:8099/svn/pminternal/App/Redwood/core/tools/ckeditor/plugins/ckeditor_wiris/cfintegration/editor.cfm $

 --->

<cfsetting showdebugoutput="false">



<cfif NOT isDefined("session.oWiris.stConfig") >

	<cftry>

		<cfset session.oWiris = CreateObject("component","redwood.core.functions.cf.formula.libwiris") />

		<cfset session.oWiris.Init() />

		<cfcatch  type="usrMsg">

			<cfset WriteOutput(cfcatch.message) />

			<cfset structDelete(session, "oWiris") />

			<cfabort />

		</cfcatch>

	</cftry>

</cfif>

<cfset config = session.oWiris.stConfig />



<cfif isDefined("url.verbose") AND url.verbose EQ "ok">

	<cfdump var="#session.oWiris#" />

	<hr /><hr /><hr />

	<cfdump var="#variables#" />

	<hr />

	<cfdump var="#application#" />

	<hr />

	<cfdump var="#client#" />

	<hr />

	<cfdump var="#session#" />

	<cfabort />
</cfif>



<cfoutput>

<html>

	<head>

		<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>

		<script type="text/javascript" src="../core/editor.js"></script>

		<title>WIRIS Formula Editor</title>

	</head>

	<body topmargin="0" leftmargin="0" marginwidth="0" marginheight="0">

		<table width="100%" height="100%">

			<tr height="100%">

				<td>

					<applet id="applet" codebase="#config['wirisformulaeditorcodebase']#" archive="#config['wirisformulaeditorarchive']#" code="#config['wirisformulaeditorcode']#" height="100%" width="100%">

						<param name="lang" value="#config['wirisformulaeditorlang']#" />

						<param name="menuBar" value="false"/>

					</applet>

				</td>

			</tr>

			<tr>

				<td>
					<!---
					<input type="button" id="submit" value="Accept" />

					<input type="button" id="cancel" value="Cancel" />
                    --->
				</td>

			</tr>

		</table>
		<div id="controls"></div>

	</body>

</html>

</cfoutput>
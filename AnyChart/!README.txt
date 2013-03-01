Contents

1. Requirements

2. How to install AnyChart from archive

       2.1. Windows

       2.2. Mac OS

       2.3. Unix (Linux, FreeBSD, etc)

3. How to run AnyChart

       3.1. Windows

       3.2. Mac OS

       3.3. Unix (Linux, FreeBSD, etc)

1. Requirements

To install AnyChart on your local computer it’s necessary to have Adobe (tm) Flash Player 9 installed. 
You can download it from http://www.adobe.com/

2. How to install AnyChart from archive

2.1. Windows

To install from archive do the following:

   * 1. Download from  http://www.anychart.com any plain install (zip or tar.gz. See download page)

   * 2. Extract it to a folder where you’d like to install AnyChart
        e.g. C:\Program Files\AnyChart

   * 3. Open  Flash Player security settings folder:
         o Windows Vista: C:\Users\user name\AppData\Roaming\Macromedia\Flash Player\#Security\FlashPlayerTrust
         o Windows XP: C:\Documents And Settings\user name\Application Data\Macromedia\Flash Player\#Security\FlashPlayerTrust
	Where  <NAME> -user name.
	If there is no folder  #Security\FlashPlayerTrust –create it.

   * 4. In this folder create AnyChart.cfg file.

   * 5. Open  AnyChart.cfg in the Notepad and specify the way to the folder where Anychart is installed:
        C:\Program Files\AnyChart
        C:\Program Files\AnyChart\swf
        If you’ve installed AnyChart  to another folder  or you’d like to launch it from another one - specify 
	the way to it in the same file.
	e.g.
     	C:\Program Files\AnyChart
     	C:\Program Files\AnyChart\swf
     	C:\AnyChartTest
     	C:\AnyChartTest\swf
	Where  AnyChartTest is the folder where AnyChart will launch from.
	
	* 6. Restart your web browser if it's launched.

2.2. Mac OS

To install AnyChart на Mac OS you should:

   * 1. Download from  http://www.anychart.com any plain install (zip or tar.gz. See download page)

   * 2. Extract it to a folder where you’d like to install AnyChart
        e.g. /Applications/AnyChart or /Users/<NAME>/Applications/AnyChart
        Where  <NAME> - user name

   * 3. Open  Flash Player security settings folder:
        /Users/<NAME>/Library/Preferences/Macromedia/Flash\ Player/#Security/FlashPlayerTrust
        Where  <NAME> -user name.
        If there is no folder  #Security\FlashPlayerTrust – create it.

   * 4. In this folder create AnyChart.cfg file.

   * 5. Open  AnyChart.cfg in any text editor and specify the way to the folder where AnyChart is installed:
     e.g.
     /Applications/AnyChart/
     /Applications/AnyChart/swf
     or
     /Users/<NAME>/Applications/AnyChart
     /Users/<NAME>/Applications/AnyChart/swf
     
   * 6. Restart your web browser if it's launched.

2.3. Unix (Linux, FreeBSD, etc)

To install AnyChart on Unix-like systems you should:

   * 1. Download from http://www.anychart.com any plain install (zip or tar.gz. See download page)

   * 2. Extract it to a folder where you’d like to install AnyChart
     e.g. /home/<NAME>/AnyChart, where <NAME> - user name

   * 3. Open  Flash Player security settings folder:
     /home/<NAME>/.macromedia/Flash_Player/#Security/FlashPlayerTrust
     Where  <NAME> -user name.

     If there is no folder  #Security\FlashPlayerTrust –create it.

   * 4. In this folder create AnyChart.cfg file.

   * 5. Open  AnyChart.cfg in any text editor and specify the way to the folder where AnyChart is installed:
     e.g.
     /home/<NAME>/AnyChart
     /home/<NAME>/AnyChart/swf
     
   * 6. Restart your web browser if it's launched.

3. How to run AnyChart

3.1. Windows

   * 1. Open the folder where AnyChart was installed
     e.g. C:\Program Files\AnyChart

   * 2. In the web-browser open AnyChart.html file.
    
3.2. Mac OS

   * 1. Open the folder where AnyChart was installed
     e.g. /Applications/AnyChart

   * 2. In the web-browser open AnyChart.html file.

3.3. Unix (Linux, FreeBSD, etc)

   * 1. Open the folder where AnyChart was installed
     e.g. /home/<NAME>/AnyChart, where  <NAME> - user  name.

   * 2. In the web-browser open AnyChart.html file.

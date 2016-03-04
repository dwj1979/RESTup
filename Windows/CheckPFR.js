// RESTup. RESTful ������ ���������� ����������
// 2013-2015, miktim@mail.ru
// ��������� ��������-����������� �������� �������� ������ ��� checkPFR:
//   http://www.pfrf.ru/branches/bashkortostan/info/~Strahovatelyam/1423
// ��� ���������� zip-������� ������������ 7-zip:
//   http://www.7-zip.org/
// ������: cscript /nologo [selfdir]\CheckPFR.js jobdir resdir
//
try {
//
    var fso = new ActiveXObject("Scripting.FilesystemObject");
    var selfdir=fso.getParentFolderName(WScript.ScriptFullName);
    var wsh = WScript.CreateObject("WScript.Shell");
//
    var retcode=0;
    var jobdir = WScript.Arguments.item(0); // ������� ������ ������� (.XML,.ZIP)
    var repdir = WScript.Arguments.item(1); // ������� ����������� (.XML,.HTML)
    var fcnt=0; // �������� ������
//
// ��������� ������� � ����������� ZIP-�����(�) � �������� �������
//
    var filescol = new Enumerator(fso.GetFolder(jobdir).Files);
    var rez = /.ZIP$/;
    for (; !filescol.atEnd(); filescol.moveNext()) 
    {
        var file = filescol.item();
        if (file.Name.toUpperCase().search(rez) >= 0)
        {
// ����������� *.XML � ������� 7-zip � ������� ZIP-�����
            retcode = wsh.run("C:\\PROGRA~1\\7-Zip\\7z.exe e -o"+jobdir+" "+jobdir+"\\"+file.Name+" *.xml",0,true);
	    if (retcode != 0) throw retcode;
            file.Delete(true);
        };
    };
    var filescol = new Enumerator(fso.GetFolder(jobdir).Files);
    var filename = filescol.item().Name;  // ����� XML-���� � �������� �������
    for (fcnt=0; !filescol.atEnd(); filescol.moveNext()) fcnt++;
//  
// ������ checkPFR � �������� ����������
//
    if (filename.length > 0)
        retcode = wsh.run("C:\\CheckPfr\\check.exe "+jobdir+"\\"+filename+" "+repdir+"\\",0,true);
    if (retcode != 0) throw retcode;
//
// ��������� ������
//
} catch (err) {
    if (retcode == 0) retcode=1;	// 
};
// �������� ��������
// WScript.Sleep(30000); 
//
WScript.Quit(retcode); 		// ���������� ��� ���������� 

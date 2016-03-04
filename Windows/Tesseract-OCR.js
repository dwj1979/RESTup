// RESTup. RESTful ������ ���������� ����������
// 2013-2015, miktim@mail.ru
// ���������� �������������� �������� Tesseract:
//    https://code.google.com/p/tesseract-ocr/
// ������: cscript /nologo [selfdir]\OCRTesseract.js jobdir resdir [params]
//
try {
//
    var fso = new ActiveXObject("Scripting.FilesystemObject");
    var selfdir=fso.getParentFolderName(WScript.ScriptFullName);
    var wsh = WScript.CreateObject("WScript.Shell");
//
//    var servicename="OCRTesseract";
    var retcode=0;
    var jobdir = WScript.Arguments.item(0); // ����� ������ ������� (.JPG,.JPEG,...)
    var repdir = WScript.Arguments.item(1); // ����� ����������� (.TXT UTF-8)
    var language = "rus";
    if (WScript.Arguments.Count() > 2) language = WScript.Arguments.item(2); 
//
// ������� OCR ��� ������ �������. 
//
    var filescol = new Enumerator(fso.GetFolder(jobdir).Files);
    for (; !filescol.atEnd(); filescol.moveNext()) 
    {
        var file = filescol.item();
	WScript.stdErr.WriteLine(file.Name);	// restup service debug info
//	if (file.attributes & 16) continue;	// directory?
        retcode = wsh.run('"C:\\Program Files\\Tesseract-OCR\\tesseract.exe" '
             +' "'+jobdir+file.Name+'" '
             +' "'+repdir+file.Name+'" -l '+ language
             ,0,true);
	if (retcode != 0 ) throw retcode;
    };
//
// ��������� ������
//
} catch (err) {
    if (retcode == 0) retcode=1;	// ������ �������
};
// �������� ��������
// WScript.Sleep(30000); 
//
WScript.Quit(retcode); 		// ���������� ��� ���������� 

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PrintService {

  printA4(printContents: string): void {
    this.print(printContents, '210mm', '297mm');
  }

  printA4Landscape(printContents: string): void {
    this.print(printContents, '297mm', '210mm');
  }

  printA5(printContents: string): void {
    this.print(printContents, '148mm', '210mm');
  }

  printA5Landscape(printContents: string): void {
    this.print(printContents, '210mm', '148mm');
  }

  print(printContents: string, width: string, height: string): void {
    let popupWin;
    popupWin = window.open('', '_blank', 'top=15,left=10,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
      <title>Print tab</title>
<link rel='stylesheet'  type='text/css' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' media='print'>
<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>

      <style>
      .table-condensed{
font-size: 9px;
}
.table > tbody > tr > td {
 vertical-align: middle;
}
      @media print {

hr {
display: block;
height: 1px;
border: 0;
border-top: 1px solid #000;
margin: 1em 0;
padding: 0;
}
div.divFooter {
page-break-inside: avoid;
bottom: 0;
font-size: 10px;
margin-bottom: 1em;
}

@page {
size: ${width} ${height};
}

html, body {
width: 1024px;

font-size: 1em !important;
color: #000 !important;
font-family: Arial !important;
}

body {
margin: 0 auto;
}

}

.pagebreak { page-break-before: always; } /* page-break-after works, as well */
      </style>
    </head>
<body onload='window.print();window.close()'>${printContents}</body>
  </html>`
    );
    popupWin.document.close();
  }

}

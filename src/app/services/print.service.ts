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
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                  crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                  crossorigin="anonymous"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                  crossorigin="anonymous"></script>
      
          <style>
              .table-condensed {
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
                      margin-left: 0.75in;
                      /* margin: 25mm 25mm 25mm 25mm;  */
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
      
              .pagebreak {
                  page-break-before: always;
              }
      
              /* page-break-after works, as well */
          </style>
      </head>
      <body onload='window.print();window.close()'>${printContents}</body>
    </html>
    `);
    popupWin.document.close();
  }

}

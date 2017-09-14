import { Component, Input } from '@angular/core';
import { DispatchNoteService } from '../../dispatchNote.service';
import { PrintService } from '../../../../services/print.service';

@Component({
  selector: 'print',
  templateUrl: './print.html'
})
export class Print {

  @Input() set id(id: number) {
    if (this.id !== 0) {
      this.service.getOne(+id).subscribe(
        (data) => {
          this.dispatchNote = data;
          setTimeout(() => {
            let element = document.getElementById('print');
            if (element != null) {
              this.printService.printA4(element.innerHTML);
            }
          }, 100);
        }
      );
    }
  }

  dispatchNote: any;

  constructor(private service: DispatchNoteService, private printService: PrintService) { }

}


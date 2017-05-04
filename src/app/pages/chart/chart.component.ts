import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaThemeConfigProvider } from '../../theme';
import 'style-loader!./chartistJs.scss';
import { SectionService } from "../../services/section.service";
import { SharedService } from "../../services/shared.service";
@Component({
  selector: 'chart',
  templateUrl: './chart.html',
})
export class Chart {
  charts = [
    {
      path: 'scheduleAdherence',
      name: 'Schedule Adherence'
    },
    {
      path: 'breakdown',
      name: 'Breakdown'
    }
  ]
  chart: any;

  startDate: any;
  endDate: any;

  sections = [];
  section: any;

  ngOnInit(): void {

  }
  constructor(private router: Router, private baConfig: BaThemeConfigProvider, private sectionService: SectionService, private sharedService: SharedService) {
    this.loadData();
  }

  loadData() {
    this.sectionService.getAll().then((data) => {
      this.sections = data;
      this.sections.unshift({ "id": 0, "code": "ALL", "name": "All Sections" });
    });
  }

  loadChart(): void {
    
    if (this.startDate && this.endDate && this.section) {
      this.router.navigate(['/pages/chart/' + this.chart.path, { startDate: this.sharedService.YYYYMMDD(this.startDate), endDate: this.sharedService.YYYYMMDD(this.endDate), section: this.section.id }]);
    } else {
      alert("Request not complete");
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaThemeConfigProvider } from '../../theme';
import 'style-loader!./chartistJs.scss';
import { SharedService } from '../../services/shared.service';
import { SectionService } from '../section/section.service';
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
    this.sectionService.getAll().subscribe((data) => {
      this.sections = data;
      this.sections.unshift({ 'id': 0, 'code': 'ALL', 'name': 'All Sections' });
    });
  }

  loadChart(): void {
    
    if (this.startDate && this.endDate && this.section) {
      this.router.navigate(['/pages/chart/' + this.chart.path, { startDate: this.sharedService.YYYYMMDD(this.startDate), endDate: this.sharedService.YYYYMMDD(this.endDate), section: this.section.id }]);
    } else {
      alert('Request not complete');
    }
  }
 /*================== SectionFilter ===================*/
    filteredSections: any[];
    //section: any;

    filterSections(event) {
        let query = event.query.toLowerCase();
        this.filteredSections = [];
        for (let i = 0; i < this.sections.length; i++) {
            let section = this.sections[i];
            if (section.code.toLowerCase().indexOf(query) == 0) {
                this.filteredSections.push(section);
            }
        }
    }

    handleSectionDropdownClick() {
        this.filteredSections = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredSections = this.sections;
        }, 100)
    }

    onSectionSelect(section: any) {
        console.log(event)
    }
    /*================== End Of SectionFilter ===================*/     
    /*================== ChartFilter ===================*/
    filteredCharts: any[];
    //chart: any;

    filterCharts(event) {
        let query = event.query.toLowerCase();
        this.filteredCharts = [];
        for (let i = 0; i < this.charts.length; i++) {
            let chart = this.charts[i];
            if (chart.name.toLowerCase().indexOf(query) == 0) {
                this.filteredCharts.push(chart);
            }
        }
    }

    handleChartDropdownClick() {
        this.filteredCharts = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredCharts = this.charts;
        }, 100)
    }

    onChartSelect(chart: any) {
        console.log(event)
    }
    /*================== End Of ChartFilter ===================*/
}







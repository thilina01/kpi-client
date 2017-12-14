import { Component } from '@angular/core';
import { CodeNameService } from './codeName.service';
import { ActivatedRoute, Router, Params, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'codeName',
  template: ` 
    <router-outlet></router-outlet>`
})
export class CodeName {

  subscription: Subscription;

  constructor(protected service: CodeNameService,
    private route: ActivatedRoute,
    private router: Router) {
    this.subscription = router.events.filter((evt) => evt instanceof NavigationEnd).subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        let moduleName = this.route.snapshot.paramMap.get('moduleName');
        if (moduleName != undefined) {
          this.service.setEndPoint(moduleName);
        }
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }


}

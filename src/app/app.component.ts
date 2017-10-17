import { Component, ViewContainerRef } from '@angular/core';

import { Message } from 'primeng/primeng';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';

import { SharedService } from './services/shared.service';
import { Subscription } from 'rxjs/Subscription';
import 'style-loader!./app.scss';
import 'style-loader!./theme/initial.scss';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  templateUrl: './app.html'
})
export class App {

  isMenuCollapsed: boolean = false;
  msgs: Message[] = [];
  subscription: Subscription;
  constructor(private _state: GlobalState,
    private _imageLoader: BaImageLoaderService,
    private _spinner: BaThemeSpinner,
    private viewContainerRef: ViewContainerRef,
    private themeConfig: BaThemeConfig,
    private sharedService: SharedService,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public router: Router) {
    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    sharedService.messageSubject.subscribe(message => { this.msgs.push(message); });

    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate([authService.redirectUrl]);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }

}

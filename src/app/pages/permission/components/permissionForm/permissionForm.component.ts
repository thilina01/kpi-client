import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { MenuService } from '../../../../services/menu.service';
import { UserService } from '../../../../services/user.service';
import { UserMenuService } from '../../../../services/userMenu.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'permission-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./permissionForm.scss'],
    templateUrl: './permissionForm.html',
})
export class PermissionForm {
    users: any[] = [];
    user = { id: 0, email: "" };

    menusTemp = [];
    menus = [];
    constructor(sharedService: SharedService,
        private menuService: MenuService,
        private userService: UserService,
        private userMenuService: UserMenuService) {
        this.loadMenus();
        this.loadUsers();
    }

    loadMenus() {
        this.menuService.getByType({ name: "Angular" }).then((data: any) => {
            this.menusTemp = data;
            this.menus = data;
        });
    }

    loadUserMenus() {
        this.userMenuService.getByUserId(this.user.id).then((data: any) => {
            this.menus.forEach(menu => {
                menu.isActive = '';
                data.forEach(userMenu => {
                    if (userMenu.menu.id === menu.id) {
                        menu.isActive = true;
                    }
                });
            });
            //this.menus = data;
        });
        //alert(this.user.id);
        // this.menuService.getByUserId(this.user.id).then((data: any) => {
        //     this.menus = data;
        // });
    }

    loadUsers() {
        this.userService.getAll().then((data: any) => {
            this.users = data;
        });
    }

    onUserChanged() {
        this.loadUserMenus();
    }

    onPermissionChanged(menuId: number) {
        //alert(this.user.id + " ddd " + menuId);
        this.userMenuService.toggle(this.user.id, menuId);
    }

}

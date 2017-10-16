import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { MenuService } from '../../../../services/menu.service';
import { UserMenuService } from '../../../../services/userMenu.service';
import { SharedService } from '../../../../services/shared.service';
import { StatusService } from '../../../../services/status.service';
import { TeamService } from '../../../team/team.service';
import { UserService } from '../../../user/user.service';

@Component({
    selector: 'permission-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./permissionForm.scss'],
    templateUrl: './permissionForm.html',
})
export class PermissionForm {
    users: any[] = [];
    statusList: any[] = [];
    teamList: any;
    user: any;

    menusTemp = [];
    menus = [];
    constructor(
        private sharedService: SharedService,
        private menuService: MenuService,
        private userService: UserService,
        private teamService: TeamService,
        private statusService: StatusService,
        private userMenuService: UserMenuService) {
        this.loadMenus();
        this.loadUsers();
        this.loadStatusList();
        this.loadTeamList();
    }

    loadMenus() {
        this.menuService.getByType({ name: 'Angular' }).then((data: any) => {
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

        });
    }

    loadUsers() {
        this.userService.getAll().subscribe((data: any) => {
            this.users = data;
        });
    }

    loadStatusList() {
        this.statusService.getAll().then((data: any) => {
            this.statusList = data;
        });
    }

    loadTeamList() {
        this.teamService.getAll().subscribe((data: any) => {
            this.teamList = data;
        });
    }
    onUserChanged() {
        this.loadUserMenus();
    }

    onPermissionChanged(menuId: number) {
        this.userMenuService.toggle(this.user.id, menuId);
    }

    /*================== User Filter ===================*/
    filteredUsers: any[];

    filterUsers(event) {
        let query = event.query.toLowerCase();
        this.filteredUsers = [];
        for (let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            if (user.email.toLowerCase().indexOf(query) == 0) {
                this.filteredUsers.push(user);
            }
        }
    }

    handleUserDropdownClick() {
        this.filteredUsers = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredUsers = this.users;
        }, 100)
    }

    onUserSelect(user: any) {
        this.loadUserMenus();
        this.status = this.user.status;
        this.team = this.user.team;
        console.log(event)
    }
    /*================== End Of User Filter ===================*/


    /*================== Status Filter ===================*/
    filteredStatusList: any[];
    status: any;

    filterStatus(event) {
        let query = event.query.toLowerCase();
        this.filteredStatusList = [];
        for (let i = 0; i < this.statusList.length; i++) {
            let status = this.statusList[i];
            if (status.name.toLowerCase().indexOf(query) == 0) {
                this.filteredStatusList.push(status);
            }
        }
    }

    handleStatusDropdownClick() {
        this.filteredStatusList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredStatusList = this.statusList;
        }, 100)
    }

    onStatusSelect(status: any) {
        if (this.user != null && this.user != undefined) {
            this.user.status = this.status;
            this.userService.save(this.user).subscribe(
                data => {
                    this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Status Changed to ' + this.status.name });
                    this.user = null;
                    this.status = null;
                }
            );
        }
        console.log(event)
    }
    /*================== End Of Status Filter ===================*/

    /*================== Team Filter ===================*/
    filteredTeamList: any[];
    team: any;

    filterTeam(event) {
        let query = event.query.toLowerCase();
        this.filteredTeamList = [];
        for (let i = 0; i < this.teamList.length; i++) {
            let team = this.teamList[i];
            if (team.name.toLowerCase().indexOf(query) == 0) {
                this.filteredTeamList.push(team);
            }
        }
    }

    handleTeamDropdownClick() {
        this.filteredTeamList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredTeamList = this.teamList;
        }, 100)
    }

    onTeamSelect(team: any) {
        if (this.user != null && this.user != undefined) {
            this.user.team = this.team;
            this.userService.save(this.user).subscribe(
                data => {
                    this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Team Changed to ' + this.team.name });
                    this.user = null;
                    this.team = null;
                }
            );
        }
        console.log(event)
    }
    /*================== End Of Team Filter ===================*/
}

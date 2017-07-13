import { MenuService } from '../../../../services/menu.service';
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'permission-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./permissionTable.scss'],
  templateUrl: './permissionTable.html',
})

export class PermissionTable {
}

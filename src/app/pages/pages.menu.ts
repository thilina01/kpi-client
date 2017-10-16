export const PAGES_MENU = [
  {
    'path': 'pages',
    'children': [
      {
        'path': 'dashboard',
        'data': {
          'menu': {
            'name': 'Dashboard',
            'title': 'January 2017',
            'icon': 'ion-android-home',
            'selected': false,
            'expanded': false,
            'order': 0
          }
        }
      },
      {
        'path': 'chart',
        'data': {
          'menu': {
            'name': 'Chart',
            'title': 'Charts',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': 'plan',
        'data': {
          'menu': {
            'name': 'Plan',
            'title': 'Production Planning',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Production',
            'title': 'Production List',
            url: '#/pages/production/table',
            'icon': 'ion-edit'
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Breakdown',
            'title': 'Breakdown List',
            url: '#/pages/breakdown/table',
            'icon': 'ion-edit'
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Tool Breakdown',
            'title': 'Tool Breakdown List',
            url: '#/pages/toolBreakdown/table',
            'icon': 'ion-edit'
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Energy Consumption',
            'title': 'Energy Consumption List',
            url: '#/pages/energyConsumption/table',
            'icon': 'ion-edit'
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Labour Turnover',
            'title': 'Labour Turnover List',
            url: '#/pages/labourTurnover/table',
            'icon': 'ion-edit'
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Absenteeism',
            'title': 'Absenteeism List',
            url: '#/pages/absenteeism/table',
            'icon': 'ion-edit'
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Job',
            'title': 'Job List',
            url: '#/pages/job/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Job Info',
            'title': 'Job Info',
            url: '#/pages/job/info',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Job Type',
            'title': 'Job Type List',
            url: '#/pages/jobType/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Item',
            'title': 'Item List',
            url: '#/pages/item/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Section',
            'title': 'Section List',
            url: '#/pages/section/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Control Point',
            'title': 'Control Point List',
            url: '#/pages/controlPoint/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Control Point Type',
            'title': 'Control Point Type List',
            url: '#/pages/controlPointType/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Machine',
            'title': 'Machine List',
            url: '#/pages/machine/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Tool',
            'title': 'Tool List',
            url: '#/pages/tool/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Shift',
            'title': 'Shift List',
            url: '#/pages/shift/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Shift Type',
            'title': 'Shift Type List',
            url: '#/pages/shiftType/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Control Point Machine',
            'title': 'Control Point Machine List',
            url: '#/pages/controlPointMachine/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },

      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Operation',
            'title': 'Operation List',
            url: '#/pages/operation/table',
            'icon': 'ion-edit'
          }
        }
      },
      {
        'path': '',
        'data': {
          'menu': {
            'name': 'Operation Type',
            'title': 'Operation Type List',
            url: '#/pages/operationType/table',
            'icon': 'ion-edit'
          }
        }
      },
      {
        'path': 'manpower',
        'data': {
          'menu': {
            'name': 'Manpower',
            'title': 'Manpower List',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': 'location',
        'data': {
          'menu': {
            'name': 'Location',
            'title': 'Location List',
            url: '#/pages/location/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },
      {
        'path': 'labourSource',
        'data': {
          'menu': {
            'name': 'Labour Source',
            'title': 'Labour Source List',
            url: '#/pages/labourSource/table',
            'icon': 'ion-edit',
            'selected': false,
            'expanded': false,
            'order': 10
          }
        }
      },

      {
        'path': ['/login'],
        'data': {
          'menu': {
            'name': 'Logout',
            'title': 'Logout',
            'icon': 'ion-log-out'
          }
        }
      },
    ]
  }
];

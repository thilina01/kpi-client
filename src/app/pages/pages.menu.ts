export const PAGES_MENU = [
  {
    "path": "pages",
    "children": [
      {
        "path": "dashboard",
        "data": {
          "menu": {
            "name": "Dashboard",
            "title": "January 2017",
            "icon": "ion-android-home",
            "selected": false,
            "expanded": false,
            "order": 0
          }
        }
      },
      {
        "path": "chart",
        "data": {
          "menu": {
            "name": "Chart",
            "title": "Charts",
            "icon": "ion-edit",
            "selected": false,
            "expanded": false,
            "order": 10
          }
        }
      },
      {
        "path": "plan",
        "data": {
          "menu": {
            "name": "Plan",
            "title": "Production Planning",
            "icon": "ion-edit",
            "selected": false,
            "expanded": false,
            "order": 10
          }
        }
      },
      {
        "path": "job",
        "data": {
          "menu": {
            "name": "Job",
            "title": "Job List",
            "icon": "ion-edit",
            "selected": false,
            "expanded": false,
            "order": 10
          }
        }
      },
      {
        "path": "item",
        "data": {
          "menu": {
            "name": "Item",
            "title": "Item List",
            "icon": "ion-edit",
            "selected": false,
            "expanded": false,
            "order": 10
          }
        }
      },
      /*{
        "path": "production",
        "data": {
          "menu": {
            "name": "Production",
            "title": "Productions",
            "icon": "ion-edit",
            "selected": false,
            "expanded": false,
            "order": 10
          }
        },
        "children": [
          {
            "path": "table",
            "data": {
              "menu": {
                "name": "Table",
                "title": "Production List",
              }
            }
          },
          {
            "path": "form",
            "data": {
              "menu": {
                "name": "Form",
                "title": "Production Form",
              }
            }
          }
         ]
      },*/
      {
        "path": "",
        "data": {
          "menu": {
            "name": "Production",
            "title": "Production List",
            url: "#/pages/production/table",
            "icon": "ion-edit"
            //"order": 800
            //target: "_blank"
          }
        }
      },
      {
        "path": "",
        "data": {
          "menu": {
            "name": "Breakdown",
            "title": "Breakdown List",
            url: "#/pages/breakdown/table",
            "icon": "ion-edit"
            //"order": 800
            //target: "_blank"
          }
        }
      },
      {
        "path": "operation",
        "data": {
          "menu": {
            "name": "Operation",
            "title": "Operation List",
            "icon": "ion-edit",
            "selected": false,
            "expanded": false,
            "order": 10
          }
        }
      },
      {
        "path": "manpower",
        "data": {
          "menu": {
            "name": "Manpower",
            "title": "Manpower List",
            "icon": "ion-edit",
            "selected": false,
            "expanded": false,
            "order": 10
          }
        }
      },
      {
        "path": ["/login"],
        "data": {
          "menu": {
            "name": "Logout",
            "title": "Logout",
            "icon": "ion-log-out"
          }
        }
      },
      /*{
        "path": "components",
        "data": {
          "menu": {
            "name": "Components",
            "title": "Components",
            "icon": "ion-gear-a",
            "selected": false,
            "expanded": false,
            "order": 250,
          }
        },
        "children": [
          {
            "path": "treeview",
            "data": {
              "menu": {
                "name": "Tree View",
                "title": "Tree View",
              }
            }
          }
        ]
      },
      {
        "path": "charts",
        "data": {
          "menu": {
            "name": "Charts",
            "title": "Charts",
            "icon": "ion-stats-bars",
            "selected": false,
            "expanded": false,
            "order": 200,
          }
        },
        "children": [
          {
            "path": "chartist-js",
            "data": {
              "menu": {
                "name": "Chartist.Js",
                "title": "Chartist.Js",
              }
            }
          }
        ]
      },
      {
        "path": "ui",
        "data": {
          "menu": {
            "name": "UI Features",
            "title": "UI Features",
            "icon": "ion-android-laptop",
            "selected": false,
            "expanded": false,
            "order": 300,
          }
        },
        "children": [
          {
            "path": "typography",
            "data": {
              "menu": {
                "name": "Typography",
                "title": "Typography",
              }
            }
          },
          {
            "path": "buttons",
            "data": {
              "menu": {
                "name": "Buttons",
                "title": "Buttons",
              }
            }
          },
          {
            "path": "icons",
            "data": {
              "menu": {
                "name": "Icons",
                "title": "Icons",
              }
            }
          },
          {
            "path": "modals",
            "data": {
              "menu": {
                "name": "Modals",
                "title": "Modals",
              }
            }
          },
          {
            "path": "grid",
            "data": {
              "menu": {
                "name": "Grid",
                "title": "Grid",
              }
            }
          },
        ]
      },
      {
        "path": "forms",
        "data": {
          "menu": {
            "name": "Form Elements",
            "title": "Form Elements",
            "icon": "ion-compose",
            "selected": false,
            "expanded": false,
            "order": 400,
          }
        },
        "children": [
          {
            "path": "inputs",
            "data": {
              "menu": {
                "name": "Form Inputs",
                "title": "Form Inputs",
              }
            }
          },
          {
            "path": "layouts",
            "data": {
              "menu": {
                "name": "Form Layouts",
                "title": "Form Layouts",
              }
            }
          }
        ]
      },
      {
        "path": "tables",
        "data": {
          "menu": {
            "name": "Tables",
            "title": "Tables",
            "icon": "ion-grid",
            "selected": false,
            "expanded": false,
            "order": 500,
          }
        },
        "children": [
          {
            "path": "basictables",
            "data": {
              "menu": {
                "name": "Basic Tables",
                "title": "Basic Tables",
              }
            }
          },
          {
            "path": "smarttables",
            "data": {
              "menu": {
                "name": "Smart Tables",
                "title": "Smart Tables",
              }
            }
          }
        ]
      },
      {
        "path": "maps",
        "data": {
          "menu": {
            "name": "Maps",
            "title": "Maps",
            "icon": "ion-ios-location-outline",
            "selected": false,
            "expanded": false,
            "order": 600,
          }
        },
        "children": [
          {
            "path": "googlemaps",
            "data": {
              "menu": {
                "name": "Google Maps",
                "title": "Google Maps",
              }
            }
          },
          {
            "path": "leafletmaps",
            "data": {
              "menu": {
                "name": "Leaflet Maps",
                "title": "Leaflet Maps",
              }
            }
          },
          {
            "path": "bubblemaps",
            "data": {
              "menu": {
                "name": "Bubble Maps",
                "title": "Bubble Maps",
              }
            }
          },
          {
            "path": "linemaps",
            "data": {
              "menu": {
                "name": "Line Maps",
                "title": "Line Maps",
              }
            }
          }
        ]
      },
      {
        "path": "",
        "data": {
          "menu": {
            "name": "Pages",
            "title": "Pages",
            "icon": "ion-document",
            "selected": false,
            "expanded": false,
            "order": 650,
          }
        },
        "children": [
          {
            "path": ["/login"],
            "data": {
              "menu": {
                "name": "Login",
                "title": "Login"
              }
            }
          },
          {
            "path": ["/register"],
            "data": {
              "menu": {
                "name": "Register",
                "title": "Register"
              }
            }
          }
        ]
      },
      {
        "path": "",
        "data": {
          "menu": {
            "name": "Menu Level 1",
            "title": "Menu Level 1",
            "icon": "ion-ios-more",
            "selected": false,
            "expanded": false,
            "order": 700,
          }
        },
        "children": [
          {
            "path": "",
            "data": {
              "menu": {
                "name": "Menu Level 1.1",
                "title": "Menu Level 1.1",
                url: "#"
              }
            }
          },
          {
            "path": "",
            "data": {
              "menu": {
                "name": "Menu Level 1.2",
                "title": "Menu Level 1.2",
                url: "#"
              }
            },
            "children": [
              {
                "path": "",
                "data": {
                  "menu": {
                    "name": "Menu Level 1.2.1",
                    "title": "Menu Level 1.2.1",
                    url: "#"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "path": "",
        "data": {
          "menu": {
            "name": "External Link",
            "title": "External Link",
            url: "http://akveo.com",
            "icon": "ion-android-exit",
            "order": 800,
            target: "_blank"
          }
        }
      }*/
    ]
  }
];

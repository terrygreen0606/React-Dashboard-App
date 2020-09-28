export default {
  items: [
    {
      name: 'Administration',
      url: '/administration',
      icon: 'icon-home',      
    },
    {
      name: 'Policy',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Application Folder',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Product Folder', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'User Profile', url: '/UserProfile', icon: 'icon-arrow-right-circle',
            },
            {name: 'Payment Plan',url: '/PaymentPlan',icon: 'icon-arrow-right-circle',
            },
          ],
        }
      ],
    },
    {
      name: 'Document Handler',
      url: '/DocumentHandler',
      icon: 'icon-arrow-right-circle',      
    },
    {
      name: 'Document Uploader',
      url: '/DocumentUploader',
      icon: 'icon-arrow-right-circle',      
    },
    {
      name: 'Reinsureance Folder',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Type of Re-Insurance',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Type', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Type', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        },
        {
          name: 'Broker/Company',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Broker/Company', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Broker/Company', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        },
        {
          name: 'Reinsurance Formula',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        },
        {
          name: 'Add Contract/Treaty',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Contract/Treaty', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Contract/Treaty', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        }

      ],
    },
    {
      name: 'Claim',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Add / Edit Event',
          url: '/administration/ClaimEvent/ClaimEdit',
          icon: 'icon-list',
          
        }
      ],
    },
    {
      name: 'Other Folder',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Managing Estimation',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Manage Estimation', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Manage Products', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        },
        {
          name: 'Open/Close Zip Codes',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Open/Close Zip Codes', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        }
      ],
    },
    {
      name: 'Validation Rule',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Policy Validation Rule',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Create Rule', url: '/administration/policy/list-validation-rule',icon: 'icon-arrow-right-circle'},
          ],
        },
        {
          name: 'Validation Rule Group',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Create Rule Group', url: '/administration/policy/view-validation-group',icon: 'icon-arrow-right-circle'},
          ],
        }
      ],
    },
    {
      name: 'Earned Premium Calculation',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Add Calculation Method',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Method', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Method', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        },
        {
          name: 'Earned Premium View',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Earned Premium View', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        }
      ],
    },
    {
      name: 'Commission Folder',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Manage Territory',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Territory', url: '/createTerritory',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Territory', url: '/territory',icon: 'icon-arrow-right-circle',
            }
          ]
        },
        {
          name: 'Manage Rule',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Rule', url: '/createRule', icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Rule', url: '/rule', icon: 'icon-arrow-right-circle',
            }
          ]
        },
        {
          name: 'Manage Group',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add RuleGroup', url: '/createRuleGroup', icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit RuleGroup', url: '/ruleGroup', icon: 'icon-arrow-right-circle',
            }
          ]
        }
      ],
    },
    {
      name: 'Claim Commission Folder',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Manage Rule',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Rule', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Rule', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        },
        {
          name: 'Commission Group',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Group', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Group', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        }
      ],
    },
    {
      name: 'Map ZoneFolder',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Create Polygon',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Create Polygon', url: '/administration/gmap-rule',icon: 'icon-arrow-right-circle',
            }
          ],
        },
        {
          name: 'Create Group',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Group', url: '/administration/create-group',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Group', url: '/administration/edit-group',icon: 'icon-arrow-right-circle',
            }
          ],
        }
      ],
    },
    {
      name: 'Manage Citizens  Policy',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Manage Citizens Policy',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Change Citizens Policy', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        }
      ],
    },
    {
      name: 'System Dropdown',
      url: '/administration/SystemDropdown',
      icon: 'icon-arrow-right-circle',
    },
    {
      name: 'Agent Resources',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Dashboard Messages',
          url: '#',
          icon: 'icon-list',
          children: [
            {name: 'Add Message', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Edit Message', url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Archive List Message', url: '#',icon: 'icon-arrow-right-circle',
            }
          ],
        }
      ],
    }
    /*{
      title: true,
      name: 'Accounting',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      }            // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Manage Account Type',
      url: '/manage-account-type',
      icon: 'icon-user',
    },
    */
    
  ]
};


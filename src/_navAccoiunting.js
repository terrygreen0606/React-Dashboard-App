export default {
  items: [
    /*{
      name: 'Accounting',
      url: '/administration',
      icon: 'icon-home',      
    },*/
    {
      title: true,
      name: 'Accounting',
      wrapper: {            
        element: '',        
        attributes: {}        
      }            
    },
    {
      name: 'Accounting Admin',
      url: '/manage-account-type',
      icon: 'icon-user',
      children: [
        {
          name: 'Manage Account Type',
          url: '/manage-account-type',
          icon: 'nav-icon icon-note',
        }
      ],
    },
    {
      name: 'Account Center',
      url: '/manage-account',
      icon: 'icon-drop'
    },
    {
      name: 'Vendor Center',
      url: '/manage-vendor',
      icon: 'nav-icon icon-note'
    },
    {
      name: 'Banking Center',
      url: '/banking-center',
      icon: 'icon-home'
    },
    {
      name: 'Investment Center',
      url: '/investments-security',
      icon: 'icon-people'
    },
    {
      name: 'Batch Processing',
      url: '#',
      icon: 'icon-folder-alt',
      children: [
            {name: 'Batch Transaction Entry', url: '/batchTransEntry',icon: 'icon-arrow-right-circle',
            },
            {name: 'Batch Invoice', url: '#', icon: 'icon-arrow-right-circle',
            },
            {name: 'Generate Commission',url: '/generateCommission',icon: 'icon-arrow-right-circle',
            },
            {name: 'LockBox Import BOA',url: '/lockBoxImportBOA',icon: 'icon-arrow-right-circle',
            },
            {name: 'LockBox Import BU',url: '#',icon: 'icon-arrow-right-circle',
            },
            {name: 'Renewal Remind Notice',url: '/generateRenewalNotice',icon: 'icon-arrow-right-circle',
            },
            {name: 'BOA Reconciliations',url: '#',icon: 'icon-arrow-right-circle',
            },
      ],
    },
    {
      name: 'Account Folder',
      // url: '#',
      icon: 'icon-folder-alt',
      children: [
        {name: 'Action For Transaction', url: '/addActionAccounting',icon: 'icon-arrow-right-circle',
        },
        {name: 'Define Rule For Actions', url: '/defineRuleAccounting',icon: 'icon-arrow-right-circle',
        },
      ],
    },
    {
      name: 'Accounting & Portfolio',
      url: '/AccountingPort',
      icon: 'icon-arrow-right-circle',
    },
  ]
};

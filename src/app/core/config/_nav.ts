export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Admin'
  },
  {
    menu: true,
    functions: ['FIND_ADMIN_BY_CRITERIA'],
    name: 'Admin',
    children: [
      {
        functions: ['FIND_ADMIN_BY_CRITERIA'],
        name: 'Admin Management',
        url: '/admin',
        icon: 'fas fa-award'
      }]
  },
  {
    menu: true,
    functions: ['FIND_ADMIN_BY_CRITERIA'],
    name: 'Shop',
    children: [
      {
        functions: ['FIND_ADMIN_BY_CRITERIA'],
        name: 'Shop Management',
        url: '/shop',
        icon: 'fas fa-award'
      }]
  },
  // {
  //   menu: true,
  //   entitlements: [],
  //   name: 'gBeetle Domain',
  //   url: '/domain',
  //   icon: 'fas fa-bezier-curve',
  //   children: [
  //     {
  //       entitlements: [],
  //       name: 'Manage Domain',
  //       url: '/domain/manage-domain',
  //       icon: 'fas fa-award'
  //     },
  //     {
  //       entitlements: [],
  //       name: 'Custom Master Data',
  //       url: '/domain/custom-master',
  //       icon: 'icon-briefcase'
  //     },
  //     {
  //       entitlements: [],
  //       name: 'Category',
  //       url: '/domain/category',
  //       icon: 'fas fa-dice'
  //     },
  //     {
  //       entitlements: [],
  //       name: 'Product Brands',
  //       url: '/domain/brand',
  //       icon: 'fas fa-grip-horizontal'
  //     }
  //   ]
  // },
  // {
  //   menu: true,
  //   entitlements: [],
  //   name: 'gBeetle Admin',
  //   url: '/admin',
  //   icon: 'fas fa-chalkboard-teacher',
  //   children: [
  //     {
  //       entitlements: [],
  //       name: 'Manage Shops',
  //       url: '/admin/manage-shop',
  //       icon: 'fas fa-cog'
  //     },
  //     {
  //       entitlements: [],
  //       name: 'Manufacturer',
  //       url: '/admin/manage-manufacturer',
  //       icon: 'fab fa-accusoft'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Developer'
  // },
  // {
  //   menu: true,
  //   entitlements: [],
  //   name: 'Configuration',
  //   url: '/config',
  //   icon: 'fas fa-chalkboard-teacher',
  //   children: [
  //     {
  //       entitlements: [],
  //       name: 'App Config',
  //       url: '/config/app-config',
  //       icon: 'fas fa-cog'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Reports'
  // },
  {
    divider: true
  }
];

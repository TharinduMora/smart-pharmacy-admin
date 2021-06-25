export const navigation = [
  {
    title: true,
    name: 'Smart Pharmacy Admin'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    menu: true,
    functions: ['DEFAULT'],
    name: 'Account Mng.',
    children: [
      {
        functions: ['DEFAULT'],
        name: 'My Profile Mng.',
        url: '/my-account/user-profile',
        icon: 'fas fa-user'
      },
      {
        functions: ['DEFAULT'],
        name: 'My Pharmacy Mng.',
        url: '/my-account/user-shop',
        icon: 'fas fa-home'
      }
    ]
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
    functions: ['FIND_SHOP_BY_CRITERIA'],
    name: 'Pharmacies',
    children: [
      {
        functions: ['FIND_SHOP_BY_CRITERIA'],
        name: 'Pharmacies Management',
        url: '/shop',
        icon: 'fas fa-heartbeat'
      }]
  },
  {
    menu: true,
    functions: ['FIND_PRODUCT_BY_CRITERIA'],
    name: 'Medicines',
    children: [
      {
        functions: ['FIND_PRODUCT_BY_CRITERIA'],
        name: 'Medicines Management',
        url: '/product',
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

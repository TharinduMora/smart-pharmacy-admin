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
  {
    divider: true
  }
];

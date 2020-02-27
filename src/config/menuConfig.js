const menuList = [
    {
      title: 'Home', // 菜单标题名称
      key: '/admin', // 对应的path
      icon: 'home', // 图标名称
      public: true, // 公开的
    },
    {
      title: 'Products',
      key: '/admin/products',
      icon: 'appstore',
    },
  
    {
      title: 'User Management',
      key: '/admin/user',
      icon: 'user'
    },
    {
      title: 'Book Management',
      key: '/admin/book',
      icon: 'book',
    },
  
    {
      title: 'Area',
      key: '/admin/charts',
      icon: 'area-chart',
      children: [
        {
          title: 'Bar',
          key: '/admin/charts/bar',
          icon: 'bar-chart'
        },
        {
          title: 'Line',
          key: '/admin/charts/line',
          icon: 'line-chart'
        },
        {
          title: 'Pie',
          key: '/admin/charts/pie',
          icon: 'pie-chart'
        },
      ]
    },
  ]
  
  export default menuList
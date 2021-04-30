import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      icon: 'ios-book',
      title: '文章'
    },
    component: Main,
    children: [
      {
        path: 'add',
        name: 'articleAdd',
        meta: {
          title: '文章发布',
          access: ['is_superuser','is_staff'],
        },
        component: () => import('@/view/main/article/Article_add')
      },
      {
        path: '',
        name: 'articleList',
        meta: {
          title: '文章管理',
          access: ['is_superuser','is_staff'],
        },
        component: () => import('@/view/main/article/Article_list')
      },
      {
        path: 'update/:id',
        name: 'articleUpdate',
        meta: {
          title: '文章修改',
          hideInMenu:true,
          access: ['is_superuser','is_staff'],
        },
        component: () => import('@/view/main/article/Article_update')
      },
      {
        path: 'recommendArticle',
        name: 'recommendArticle',
        meta: {
          title: '文章推荐',
          access: ['is_superuser'],
        },
        component: () => import('@/view/main/article/Article_recommend')
      },
      {
        path: 'category',
        name: 'category',
        meta: {
          icon: 'md-funnel',
          showAlways: true,
          title: '文章分类',
          access: ['is_superuser'],
        },
        component: parentView,
        children: [
          {
            path: '',
            name: 'category_list',
            meta: {
              title: '分类管理',
              access: ['is_superuser'],
            },
            component: () => import('@/view/main/article/Article_category')
          },
          {
            path: 'update/:id',
            name: 'category_update',
            meta: {
              title: '分类修改',
              hideInMenu:true,
              access: ['is_superuser'],
            },
            component: () => import('@/view/main/article/Article_category_update')
          },
          {
            path: 'add',
            name: 'category_add',
            meta: {
              title: '分类新增',
              hideInMenu:true,
              access: ['is_superuser'],
            },
            component: () => import('@/view/main/article/Article_category_update')
          }
        ]
      },
    ]
  },

  {
    path: '/course',
    name: 'course',
    meta: {
      icon: 'logo-buffer',
      title: '教程',
      access: ['is_superuser','is_staff'],
    },
    component: Main,
    children: [
      {
        path: 'course_list',
        name: 'course_list',
        meta: {
          title: '教程管理',
          access: ['is_superuser','is_staff'],
        },
        component: () => import('@/view/main/course/Course_list')
      },
      {
        path: 'course_update/:id',
        name: 'course_update',
        meta: {
          title: '教程修改',
          access: ['is_superuser','is_staff'],
          hideInMenu: true,
        },
        component: () => import('@/view/main/course/Courses_update')
      },
      {
        path: 'course_add',
        name: 'course_add',
        meta: {
          title: '添加教程',
          access: ['is_superuser','is_staff'],

        },
        component: () => import('@/view/main/course/Courses_add')
      },
      {
        path: 'tutorial/:id',
        name: 'tutorial',
        meta: {
          title: '教程目录',
          access: ['is_superuser','is_staff'],
          hideInMenu: true,
        },
        component: () => import('@/view/main/course/tutorial')
      },

      {
        path: 'tutorialdetail/:id',
        name: 'tutorials_detail',
        meta: {
          title: '教程内容',
          access: ['is_superuser','is_staff'],
          hideInMenu: true,
          notCache:true,
        },
        component: () => import('@/view/main/course/tutorial_detail')
      },
      {
        path: 'tutorial_add/:id',
        name: 'tutorialadd',
        meta: {
          title: '添加内容',
          access: ['is_superuser','is_staff'],
          hideInMenu: true,
          notCache:false,
        },
        component: () => import('@/view/main/course/tutorial_add')
      }
    ]
  },
  {
    path: '/question',
    name: 'question',
    meta: {
      icon: 'ios-chatbubbles',
      title: '帖子'
    },
    component: Main,
    children: [
      {
        path: 'category',
        name: 'question_category',
        meta: {
          title: '帖子分类',
          access: ['is_superuser'],
        },
        component: () =>  import('@/view/main/questions/question_category.vue')
      },
      {
        path: 'list',
        name: 'question_list',
        meta: {
          icon: 'ios-chatbubbles',
          title: '帖子管理',
          access: ['is_superuser','is_staff'],
        },
        component: () => import('@/view/main/questions/question_list.vue')
      }
    ]
  },
  /*{
    path:'/advert',
    name:'advert',
    meta: {
      title: '广告',
      access: ['is_superuser'],
      icon: 'ios-hand',
    },
    component: Main,
    children: [
      {
        path: '',
        name: 'advert_banner',
        meta: {
          title: 'banner',
          access: ['is_superuser'],
        },
        component: () => import('@/view/main/banners/index')
      },
      {
        path: 'email',
        name: 'advert_email',
        meta: {
          title: '联系方式',
          access: ['is_superuser'],
        },
        component: () => import('@/view/main/banners/email')
      },
      {
        path: 'friendship',
        name: 'advert_friendship',
        meta: {
          title: '友情链接',
          access: ['is_superuser'],
        },
        component: () => import('@/view/main/banners/Friendship')
      },
    ]
<<<<<<< HEAD
  },
=======
  },*/
  {
    path: '/user',
    name: 'user',
    meta: {
      access: ['is_superuser'],
      icon: 'ios-person',
      title: '用户'
    },
    component: Main,
    children: [
      {
        path: '',
        name: 'user_list',
        meta: {
          title: '用户管理',
          access: ['is_superuser'],
          icon: 'ios-person',

        },
        component: () => import('@/view/main/user/user')
      },
      {
        path: 'detail/:id',
        name: 'user_detail',
        meta: {
          title: '用户详情',
          access: ['is_superuser'],
          hideInMenu: true,
        },
        component: () => import('@/view/main/user/user_detail')
      },
      // {
      //   path: 'add',
      //   name: 'user_add',
      //   meta: {
      //     title: '添加用户',
      //     access: ['is_superuser'],
      //
      //   },
      //   component: () =>import('@/view/main/user/add')
      // }
    ]
  },
  {
    path:'/sessting',
    name:'sessting',
    meta: {
      title: '设置',
      icon: 'md-cog',
    },
    component: Main,
    children: [
      {

        path: 'banner',
        name: 'advert_banner',
        meta: {
          title: 'banner',
          access: ['is_superuser'],
        },
        component: () => import('@/view/main/banners/index')
      },
      {
        path: 'email',
        name: 'advert_email',
        meta: {
          title: '联系方式',
          access: ['is_superuser'],
        },
        component: () => import('@/view/main/banners/email')
      },
      {
        path: 'friendship',
        name: 'advert_friendship',
        meta: {
          title: '友情链接',
          access: ['is_superuser'],
        },
        component: () => import('@/view/main/banners/Friendship')
      },
      {
        path: 'qq',
        name: 'sessting_qq',
        meta: {
          title: '交流群',
          access: ['is_superuser'],
        },
        component: () => import('@/view/main/sessting/qq')
      },
      {
        path: 'seo',
        name: 'sessting_seo',
        meta: {
          title: 'SEO',
          access: ['is_superuser','is_staff'],
        },
        component: () => import('@/view/main/sessting/seo_list')
      },
      {
        path: 'seo/:id',
        name: 'seoUpdate',
        meta: {
          title: 'SEO详情',
          access: ['is_superuser','is_staff'],
          hideInMenu: true,
        },
        component: () => import('@/view/main/sessting/seo')
      },
      {
        path: '',
        name: 'sessting_user',
        meta: {
          title: '资料修改',
          access: ['is_superuser','is_staff'],
        },
        component: () => import('@/view/main/sessting/index')
      },
      {
        path: 'help',
        name: 'help',
        meta: {
          title: '联系博主',
          access: ['is_superuser'],
        },
        component: () => import('@/view/main/sessting/help')
      },
    ]
  },
  /*{
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'join_page',
        name: 'join_page',
        meta: {
          icon: '_qq',
          title: 'QQ群'
        },
        component: () => import('@/view/join-page.vue')
      }
    ]
  },*/
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },/*
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'tree_select_page',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '树状下拉选择器'
        },
        component: () => import('@/view/components/tree-select/index.vue')
      },
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'drag_drawer_page',
        name: 'drag_drawer_page',
        meta: {
          icon: 'md-list',
          title: '可拖拽抽屉'
        },
        component: () => import('@/view/components/drag-drawer')
      },
      {
        path: 'org_tree_page',
        name: 'org_tree_page',
        meta: {
          icon: 'ios-people',
          title: '组织结构树'
        },
        component: () => import('@/view/components/org-tree')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/view/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - {{ i18n_page }}'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },*/
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]

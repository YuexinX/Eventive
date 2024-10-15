const routes = {
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
  },
  NEED_CONFIRMATION: '/need-confirmation',
  EMAIL_SENT: '/email-sent',
  CONFIRM_EMAIL: '/confirm-email',
  RESET_PASSWORD: '/reset-password',
  NEW_PASSWORD: '/new-password',
  RESET_COMPLETE: '/reset-complete',
  CREATE_EVENT: '/create-event',
  EDIT_EVENT: '/edit-event',
  DASHBOARD: {
    HOME: {
      url: '/',
      breadcrumb: '主页',
      getUrl: () => '/',
      getBreadcrumb: () => '主页',
    },
    PRODUCTS: {
      HOME: {
        url: '/products',
        breadcrumb: '产品',
        getUrl: () => '/products',
        getBreadcrumb: () => '产品',
      },
      OVERVIEW: {
        url: '/products/overview',
        breadcrumb: '总览',
        getUrl: () => '/products/overview',
        getBreadcrumb: () => '总览',
      },
      CREATE: {
        url: '/products/create',
        breadcrumb: '创建',
        getUrl: () => '/products/create',
        getBreadcrumb: () => '创建',
      },
      CREATE_SUCCESS: {
        url: '/products/:uuid/create-success',
        breadcrumb: '创建成功',
        getUrl: (uuid: string) => `/products/${uuid}/create-success`,
        getBreadcrumb: () => '创建成功',
      },
      VIEW: {
        url: '/products/:uuid/view',
        getUrl: (uuid: string) => `/products/${uuid}/view`,
        getBreadcrumb: (name: string) => name,
      },
    },
  },
};

export default routes;

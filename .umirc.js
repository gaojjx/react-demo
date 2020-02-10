// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/record',
          component: './record',
        },
        {
          path: '/record',
          component: './record',
        },
        {
          path: '/users',
          component: './users',
        },
        {
          path: '/login',
          component: './login',
        },
        {
          path: '/user',
          component: './user',
        },
        {
          path: '/',
          component: '../pages/index',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'demo',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'http://172.27.0.74:9004/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }, // '/api': {
    //   target: 'http://jsonplaceholder.typicode.com/',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/api': '',
    //   },
    // },
  },
};

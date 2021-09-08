const Vue = require('vue');
const { config } = require('@vue/test-utils');

useMock = true;
Vue.directive('validate', {});
config.stubs.nuxt = { template: '<div />' };
config.stubs['nuxt-link'] = { template: '<a><slot /></a>' };
config.stubs['no-ssr'] = { template: '<span><slot /></span>' };
config.stubs['el-button'] = { template: '<div><slot /></div>' };
config.stubs['app-button'] = { template: '<div><slot /></div>' };
config.stubs['el-badge'] = { template: '<div><slot /></div>' };
config.stubs['el-input'] = { template: '<div><slot /></div>' };
config.stubs['el-upload'] = { template: '<div><slot /></div>' };
config.stubs['el-option'] = { template: '<div><slot /></div>' };
config.stubs['el-select'] = { template: '<div><slot /></div>' };

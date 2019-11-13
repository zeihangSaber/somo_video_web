import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import index_1 from '@/components/index_1'
import login from '@/components/login'
import agora from '@/components/agora'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/',
			name: 'index',
			component: index
		},
		{
			path: '/index_1',
			name: 'index_1',
			component: index_1
		},
		{
			path: '/agora',
			name: 'agora',
			component: agora
		}
	]
})

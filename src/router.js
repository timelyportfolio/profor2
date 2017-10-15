import VueRouter from 'vue-router'
import Vis from './components/Vis.vue'

// 1. Define route components.
// These can be imported from other files
//var Register = { template: '<div>register</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
var routes = [
  { path: '/', component: Vis },
  { path: '/interactives', component: Vis,
    children: [
      {
        path: 'charts',
        component: Vis
      }
    ]
  }
  //{ path: '/interactives/tables', component: Tables}
  /*  { path: '/research', component: Research,
      children: [
        {
          path: 'ongoing',
          component: ResearchOngoing
        }
      ]
  },
  { path: '/news', component: News },
  { path: '/contact', component: Contact },
  { path: '/register', component: Register}
  */
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter({
  routes: routes//,
  //mode: 'history'
})

export default router

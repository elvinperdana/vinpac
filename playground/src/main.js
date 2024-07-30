/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import vuetify from './plugins/vuetify'

import VINPAC from '@elvinperdana_vinz/vinpac'
import '@elvinperdana_vinz/vinpac/dist/style.css'

const app = createApp(App)

registerPlugins(app)

app
  .use(vuetify)
  .use(VINPAC)
  .mount('#app')

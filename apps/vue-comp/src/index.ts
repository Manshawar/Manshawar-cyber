import 'vue/dist/vue.runtime.esm-bundler.js'
import { defineCustomElement } from 'vue';
const modules = import.meta.glob('@/components/**/*.ce.vue', { eager: true });
export function register() {

 Object.entries(modules).forEach(([key, module]) => {
    const name = 'v-' + key.replace(/^.*\//, '').replace(/\.ce\.vue$/, '')
 
    const component = defineCustomElement((module as any).default);

    customElements.define(name, component)

  })

}
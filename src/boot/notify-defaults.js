import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  textColor: 'white',
  classes: 'notify',
  actions: [
    { icon: 'close', color: 'white', handler: () => { /* ... */ } }
  ]
})

// "async" is optional
// export default async ({ /* app, router, Vue, ... */ }) => {
// something to do
// }

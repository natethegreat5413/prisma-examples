import { objectType } from 'nexus'

export const Crumb = objectType({
  name: 'Crumb',
  definition(t: any) {
    t.model.id()
    t.model.lat()
    t.model.lng()
    t.model.timeStamp()
    t.model.timeSheet()
    t.model.user()
  },
})

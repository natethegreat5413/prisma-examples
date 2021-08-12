import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t: any) {
    t.model.id()
    t.model.timesheets()
    t.model.crumbs()
    t.model.name()
  },
})

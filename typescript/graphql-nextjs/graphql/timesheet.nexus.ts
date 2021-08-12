import { objectType } from 'nexus'
import * as dateFns from 'date-fns'

export const TimeSheet = objectType({
  name: 'TimeSheet',
  definition(t: any) {
    t.model.id()
    t.model.startTime()
    t.model.endTime()
    t.model.user()
    t.model.crumbs()
    t.int('elapsedTime', {
      resolve: async (root: any, args, context) => {
        return dateFns.formatDistance(root.startTime, root.endTime)
      },
    })
  },
})

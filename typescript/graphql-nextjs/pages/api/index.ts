import { makeSchema, queryType, mutationType } from 'nexus'
import path from 'path'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as NexusTypes from '../../graphql'
import { DateTimeResolver } from 'graphql-scalars'
import { ApolloServer } from 'apollo-server-micro'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const Query = queryType({
  definition(t) {
    t.crud.user({ filtering: true })
    t.crud.users({ filtering: true, ordering: true })
    t.crud.crumb()
    t.crud.crumbs({ filtering: true, ordering: true })
    t.crud.timeSheet()
    t.crud.timeSheets({ filtering: true, ordering: true })
  },
})

export const Mutation = mutationType({
  definition(t: any) {
    t.crud.createOneUser()
    t.crud.updateOneUser()
    // t.crud.updateManyUser()
    t.crud.deleteOneUser()
    // t.crud.deleteManyUsers()
    t.crud.createOneCrumb()
    t.crud.updateOneCrumb()
    t.crud.updateManyCrumb()
    t.crud.deleteOneCrumb()
    t.crud.deleteManyCrumb()
    t.crud.createOneTimeSheet()
    t.crud.updateOneTimeSheet()
    t.crud.updateManyTimeSheet()
    t.crud.deleteOneTimeSheet()
    t.crud.deleteManyTimeSheet()
  },
})

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    NexusTypes.Crumb,
    NexusTypes.User,
    NexusTypes.TimeSheet,
  ],
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      scalars: {
        DateTime: DateTimeResolver,
      },
    }),
  ],
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

type Context = {
  prisma: PrismaClient
  req: Request
}

const createContext = (incoming?: { req: Request }): Context => {
  return { ...incoming, prisma }
}

export default new ApolloServer({
  schema,
  context: createContext,
}).createHandler({
  path: '/api',
})

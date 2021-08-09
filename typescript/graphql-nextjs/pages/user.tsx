import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const QueryUsers = gql`
  query QueryUsers {
    users {
      name
      email
    }
  }
`

function UsersList() {
  const { loading, error, data } = useQuery(QueryUsers)
  if (loading) {
    return <div>Loading . . . </div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      {data.users.map((item) => (
        <div>
          <div>{item.name}</div>
          <div>{item.email}</div>
        </div>
      ))}
    </div>
  )
}

function createUser() {
  return (
    <Layout>
      <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
        <div>Create User</div>
        <UsersList />
      </div>
    </Layout>
  )
}

export default withApollo(createUser)

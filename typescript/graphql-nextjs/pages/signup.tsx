import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'

const SignupMutation = gql`
  mutation SignupMutation($name: String, $email: String!) {
    signupUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`

const QueryUsers = gql`
  query QueryUsers {
    users {
      name
      email
    }
  }
`

function Signup(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [signup] = useMutation(SignupMutation)

  return (
    <Layout>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            console.log('submit', name, email)

            await signup({
              variables: {
                name: name,
                email: email,
              },
            })
            Router.push('/')
          }}
        >
          <h1>Signup user</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address)"
            type="text"
            value={email}
          />
          <input disabled={!name || !email} type="submit" value="Signup" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
        <h1>Users</h1>
        <UsersList />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
        }

        input[type='text'] {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

function UserCard(props) {
  return (
    <div
      style={{
        padding: 6,
        margin: 6,
        borderRadius: 10,
        backgroundColor: '#c3c3c3',
      }}
    >
      <p>Name: {props.name}</p>
      <p>Email: {props.email}</p>
    </div>
  )
}

function UsersList(props) {
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
        <UserCard name={item.name} email={item.email} />
      ))}
    </div>
  )
}

export default withApollo(Signup)

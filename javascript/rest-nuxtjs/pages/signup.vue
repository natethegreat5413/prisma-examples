<template>
  <div class="page">
    <form @submit="signup">
      <h1>Signup user</h1>
      <input autoFocus placeholder="Name" type="text" v-model="name" />
      <input placeholder="Email address" type="text" v-model="email" />
      <input :disabled="!name || !email" type="submit" value="Signup" />
      <NuxtLink class="back" to="/"> or Cancel </NuxtLink>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
    }
  },
  methods: {
    signup: async function (e) {
      e.preventDefault()

      try {
        const body = {
          name: this.name,
          email: this.email,
        }

        const res = await fetch(`http://localhost:3000/api/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        this.$router.push({ path: '/' })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
<style scoped>
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
</style>

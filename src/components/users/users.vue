<template>
  <ul class="users">
    <li v-for="(user, index) in users" :key="index" class="user">
      <nuxt-link :to="{ name: 'users-id', params: { id: index }}">
        {{ user.name }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'users',
  props: {
    users: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>

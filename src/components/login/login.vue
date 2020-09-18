<template>
  <div :class="className">
    login
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>

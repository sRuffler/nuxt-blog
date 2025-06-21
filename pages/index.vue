<template>
  <h1>My Blog</h1>

  <div>
    <input v-model="newTitle" placeholder="Title" />
    <textarea v-model="newContent" placeholder="Content"></textarea>
    <button @click="addPost">Add Post</button>
  </div>

  <ul>
    <li v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <small>{{ new Date(post.createdAt).toLocaleString() }}</small>
    </li>
  </ul>
</template>

<style scoped>
  input, textarea{
    display: block;
    border-radius: 8px;
    border:1px solid black;
  }
</style>


<script>
export default {
  name: 'Blog',
  data() {
    return {
      newTitle: '',
      newContent: '',
      posts: []
    }
  },
  methods: {
    async fetchPosts() {
      const { data } = await useFetch('/api/posts')
      this.posts = data.value || []
    },
    async addPost() {
      await $fetch('/api/posts', {
        method: 'POST',
        body: {
          title: this.newTitle,
          content: this.newContent
        }
      })
      this.newTitle = ''
      this.newContent = ''
      this.fetchPosts()
    }
  },
  created() {
    this.fetchPosts()
  }
}
</script>

<template>
  <h1>My Blog</h1>

  <div class="blog-entry-form">
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

<style>

   * {
     box-sizing: border-box;
     margin: 0; 
     padding: 0;
  }

  #__nuxt{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding:40px;
    gap:80px;
    flex-direction: column;
  }

  .blog-entry-form{
    display: flex;
    gap:24px;
    flex-direction: column;
    align-items: center;
    width:100%;
  }

  input, textarea{
    display: block;
    border-radius: 8px;
    border:1px solid black;
    width: 100%;
    padding:8px 12px;
  }

  button{
    padding:8px 12px;
    display: flex;
    width: fit-content;
    background-color: white;
    border:1px solid black;
    border-radius: 24px;
    transition: all 0.4s ease;
    cursor:pointer;
  }

  button:hover{
    background-color: black;
    color: white;
    border:1px solid white;
  }

  ul{
    list-style: none;
    display: grid;
    padding:0px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    width:100%;

    li{
      border:1px solid lightgray;
      padding:16px;
      border-radius: 12px;
    }
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

<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      documents: [],
    };
  },
  created() {
    this.fetchCollection(this.$route.params.dbName, this.$route.params.collectionName);
  },
  mounted() {},
  methods: {
    async fetchCollection(dbName, collectionName) {
      this.documents = await $request.get(`/api/m/mongo/data/${dbName}/${collectionName}`);
      console.log(this.documents);
    },
  },
};
</script>
<style lang="scss" scoped></style>

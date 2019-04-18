<template>
  <div>
    <template v-for="db in dbList">
      <dbInfo :data="db"></dbInfo>
    </template>
  </div>
</template>
<script>
import dbInfo from './dbInfo.vue';

export default {
  components: { dbInfo },
  data() {
    return {
      dbList: [],
    };
  },
  created() {
    this.fetchDb();
  },
  mounted() {},
  methods: {
    async fetchDb() {
      this.dbList = await $request.get('/api/m/mongo/list');
    },
  },
};
</script>
<style lang="scss" scoped></style>

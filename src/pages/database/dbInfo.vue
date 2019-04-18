<template>
  <div>
    <div class="header">
      <span>{{ data.name }}</span>
      <el-tag size="small" type="warning" :closable="false">{{ data.sizeOnDisk }} Byte</el-tag>
    </div>
    <el-table :data="collections" :show-header="false">
      <el-table-column label="collection" v-slot="scope">
        <span class="collection-name">{{ scope.row.name }}</span>
      </el-table-column>
      <el-table-column label="length" v-slot="scope" width="120">
        <span class="document-count" @click="$router.push(`/collection/${data.name}/${scope.row.name}`)">{{ scope.row.count || '--' }}</span>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      collections: [],
    };
  },
  created() {
    this.fetchCollections();
  },
  mounted() {},
  methods: {
    async fetchCollections() {
      this.collections = await $request.get(`/api/m/mongo/list/${this.data.name}`);
      console.log(this.collections);
      this.collections.forEach(async collection => {
        collection.count = await this.fetchCount(this.data.name, collection.name);
        console.log(collection.count);
      });
    },
    async fetchCount(dbName, collectionName) {
      return $request.get(`/api/m/mongo/count/${dbName}/${collectionName}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 12px;
  background: #666;
  span:first-child {
    color: #fff;
    font-weight: 700;
  }
  .el-tag {
    float: right;
    margin-top: -4px;
  }
}
.document-count:after {
  content: ' Documents';
  color: #999;
  font-size: 0.8em;
  cursor: pointer;
}
</style>

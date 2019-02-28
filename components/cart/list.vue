<template>
  <div>
    <el-table :data="cartData" style="width: 980px">
      <el-table-column label="项目" width="532" prop="name"></el-table-column>

      <el-table-column label="单价" width="82" prop="price"/>

      <el-table-column class="l-count" label="数量" width="242">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.count" @change="handleChange" :min="0"/>
        </template>
      </el-table-column>

      <el-table-column label="总价">
        <template slot-scope="scope">
          <div>{{scope.row.price * scope.row.count}}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    cartData:{
      type: Array,
      default:()=>{
        return []
      }
    }
  },
  methods:{
    handleChange(){
    }
  }
};
</script>


<style lang="scss">

.el-table_3_column_11{
  >div{
    text-align: center;
  }
}
</style>

<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="项目" width="532" prop="data">
      </el-table-column>

      <el-table-column label="单价" width="132" prop="name"/>

      <el-table-column label="数量" width="212"/>

      <el-table-column label="总价">
        <!-- <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>


<style lang="scss">
</style>

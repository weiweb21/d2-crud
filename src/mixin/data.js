import _clonedeep from 'lodash.clonedeep'
import _get from 'lodash.get'
import _set from 'lodash.set'

export default {
  props: {
    /**
     * @description 表格数据
     */
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      /**
       * @description 表格内部数据
       */
      d2CrudData: [],
      /**
       * @description 编辑暂存数据，用于储存不在editTemplate中的数据
       */
      editDataStorage: {}
    }
  },
  computed: {
    d2CrudDataLength () {
      return this.d2CrudData.length
    }
  },
  watch: {
    data () {
      this.handleDataChange()
    }
  },
  mounted () {
    this.handleDataChange()
  },
  methods: {
    /**
     * @description lodash.get
     */
    _get,
    /**
     * @description lodash.set
     */
    _set,
    /**
     * @description 同步外部表格数据到d2CrudData内部
     */
    handleDataChange () {
      if (this.d2CrudData !== this.data) {
        this.d2CrudData = _clonedeep(this.data)
      }
    },
    /**
     * @description 排序时数据变化
     */
    handleSortDataChange () {
      this.$nextTick(() => {
        this.d2CrudData = this.$refs.elTable.store.states.data
      })
    },
    /**
     * @description 排序状态
     */
    handleSortChange ({ column, prop, order }) {
      this.handleSortDataChange()
      this.$emit('sort-change', { column, prop, order })
    },
    /**
     * @description 更新行数据
     * @param {Number} index 表格数据索引
     * @param {Object} row 更新的表格行数据
     */
    updateRow (index, row) {
      this.$set(this.d2CrudData, index, row)
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    },
    /**
     * @description 新增行数据
     * @param {Object} row 新增的表格行数据
     */
    addRow (row) {
      this.$set(this.d2CrudData, this.d2CrudData.length, row)
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    },
    /**
     * @description 删除行
     * @param {Object} index 被删除行索引
     */
    removeRow (index) {
      this.$delete(this.d2CrudData, index)
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    },
    /**
     * @description 外部暴露的更新单元格数据方法
     */
    setCellValue (key, value, rowIndex) {
      this.$set(this.d2CrudData, rowIndex, {
        ...this.d2CrudData[rowIndex],
        [key]: value
      })
    }
  }
}

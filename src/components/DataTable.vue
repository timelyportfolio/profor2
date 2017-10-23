<template>
  <div>
    <table></table>
  </div>
</template>

<script>
export default {
  props: ["filtered", "checkedfilters"],
  data: function() {
    return {
      dt: null
    }
  },
  watch: {
    filtered: {
      handler: function(newFiltered) {
        var $ = window.$
        if(newFiltered.data.length && !this.dt) {
          this.dt = $('table', this.$el).DataTable({
            data: newFiltered.data,
            columns: Object.keys(newFiltered.data[0]).map(function(col) {
              return {data: col}
            })
          })
          return
        }
        
        if(this.dt) {
          var dt = this.dt
          dt.clear()
          if(newFiltered.data.length) {
            dt.rows.add(newFiltered.data)
            // Draw once all updates are done
          }
          dt.draw()
        }

      },
      deep: true
    }
  },
  beforeDestroy: function() {
    if(this.dt) {
      this.dt.destroy()
    }
  }
}
</script>


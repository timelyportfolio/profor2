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
  methods: {
    renderTable: function(newFiltered) {
      var $ = window.$
      if(newFiltered.data.length && !this.dt) {
        var config = {
          data: newFiltered.data,
          columns: Object.keys(newFiltered.data[0]).map(function(col) {
            var title = col
            var render = null
            if(col === "geo") {
              title = "Country"
              render = function(data, type, row, meta) {
                return data.map(function(d) {
                  return d["Study_country.x"]
                })
                .sort()
                .join(", ")
              }
            }
            if(col === "outcome") {
              title = "Outcome"
              render = function(data, type, row, meta) {
                return data.map(function(d) {
                  return d["Out_subtype"]
                })
                .sort()
                .join(", ")
              }
            }
            if(col === "intervention") {
              title = "Intervention"
              render = function(data, type, row, meta) {
                return data.map(function(d) {
                  return d["Int_type"]
                })
                .sort()
                .join(", ")
              }
            }
            if(col === "habitat") {
              title = "Habitat"
              render = function(data, type, row, meta) {
                return data.map(function(d) {
                  return d["Biome."]
                })
                .sort()
                .join(", ")
              }
            }
            if(col === "study") {
              title = "Study"
            }
            if(col === "comparator") {
              title = "Comparator"
              render = function(data, type, row, meta) {
                return data.map(function(d) {
                  return d["Comps_type"]
                })
                .sort()
                .join(", ")
              }
            }
            return {
              data: col,
              title: title,
              render: render
            }
          })
        }

        this.dt = $('table', this.$el).DataTable(config)
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
    }
  },
  watch: {
    filtered: {
      handler: function(newFiltered) {
        this.renderTable(newFiltered)
      },
      deep: true
    }
  },
  mounted: function() {
    this.renderTable(this.filtered)
  },
  beforeDestroy: function() {
    if(this.dt) {
      this.dt.destroy()
    }
  }
}
</script>


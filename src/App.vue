<template :fulldata="fulldata">
  <div id="app" class="container-fluid" style="margin-top: 2em;">
    <Navbar></Navbar>
    <div class="col-md-3" style="overflow:auto; min-height: 100px; max-height:400px; position:fixed; top:150px;">
      <h4>Filters</h4>
      <filters  v-on:checked-nodes="checkHandler"></filters>
    </div>
    <keep-alive>
      <router-view :filtered="filtered" :checkedfilters="checkedfilters"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import axios from 'axios'
  import {arrayeq} from './utils.js'

  import Navbar from './components/Navbar.vue'
  import Filters from './components/Filters.vue'

  export default {
    components: {
      Navbar,
      Filters
    },
    created: function() {
      /*
      axios.get('./static/articles_profor.json').then(response => {
        this.articles = response.data
      })
      .catch(e => {
        console.log('error getting data', e)
        //this.errors.push(e)
      })
      */
      axios.get('./static/data_profor.json').then(response => {
        this.fulldata = response.data
        window.fulldata = this.fulldata
      })
      .catch(e => {
        console.log('error getting data', e)
        //this.errors.push(e)
      })
    },
    data: function() {
      return {
        articles: [],
        fulldata: [],
        checkedfilters: []
      }
    },
    computed: {
      filtered: function() {
        //if(this.checkedgeo.length > 0) {
          return {
            data: this.filterData(this.checkedfilters),
            filters_geo: this.checkedfilters.filter(dd=>dd.type==='geo').map(dd=>dd.name),
            filters_int: this.checkedfilters.filter(dd=>dd.type==='intervention').map(dd=>dd.type_code),
            filters_hab: this.checkedfilters.filter(dd=>dd.type==='habitat').map(dd=>dd.code),
            filters_out: this.checkedfilters.filter(dd=>dd.type==='outcome').map(dd=>dd.code),
            filters_study: this.checkedfilters.filter(dd=>dd.type==='study').map(dd=>dd.code),
            filters_comp: this.checkedfilters.filter(dd=>dd.type==='comparator').map(dd=>dd.code)
          }
        //}
      }
    },
    methods: {
      filterData: function(filters) {
        var geo = filters.filter(dd=>dd.type==='geo').map(dd=>dd.name); 
        var habitat = filters.filter(dd=>dd.type==='habitat').map(dd=>dd.code);
        var intervention = filters.filter(dd=>dd.type==='intervention').map(dd=>dd.type_code);
        var outcome = filters.filter(dd=>dd.type==='outcome').map(dd=>dd.code);
        var study = filters.filter(dd=>dd.type==='study').map(dd=>dd.code);
        var comp = filters.filter(dd=>dd.type==='comparator').map(dd=>dd.code);

        return this.fulldata
          .filter(
            function(d) {
              var foundgeo =  d.geo.some(function(dd) {
                return geo.indexOf(dd.subregion) > -1
              })
              var foundhab = d.habitat.some(function(dd) {
                return habitat.indexOf(dd['Biome.']) > -1
              })
              var foundint = d.intervention.some(function(dd) {
                return intervention.indexOf(dd['Int_type']) > -1
              })
              var foundout = d.outcome.some(function(dd) {
                return outcome.indexOf(dd['Out_subtype']) > -1
              })
              var foundstudy = study.indexOf(d.study) > -1
              var foundcomp = d.comparator.some(function(dd) {
                return comp.indexOf(dd.Comps_type) > -1
              })
              return foundgeo && foundhab && foundint && foundout && foundstudy && foundcomp
                /*
                intervention.indexOf(d.Int_type) > -1 &&
                outcome.indexOf(d.Outcome) > -1
                */
            }
          )
      },
      checkHandler: function(checkednodes) {
        var allfilters = [].concat(checkednodes.filter(d=>d.colname==="subregion").map(d=>{return {type:'geo','id':d.id,'name':d.name}}))
          .concat(checkednodes.filter(d=>d.colname==="ecoregion").map(d=>{return {type:'habitat','id':d.id,'code':d.code}}))
          .concat(checkednodes.filter(d=>d.colname==="type").map(d=>{return {type:'intervention','id':d.id,'type_code':d.type_code}}))
          .concat(checkednodes.filter(d=>d.colname==="outcome").map(d=>{return {type:'outcome','id':d.id,'code':d.code}}))
          .concat(checkednodes.filter(d=>d.colname==="study").map(d=>{return {type:'study','id':d.id,'code':d.code}}))
          .concat(checkednodes.filter(d=>d.colname==="comparator").map(d=>{return {type:'comparator','id':d.id,'code':d.code}}))
        
        if(!arrayeq(this.checkedfilters, allfilters, function(d){return d.id})) {
          this.checkedfilters = allfilters
        }
      }
    }
  }
</script>


<style>
  @import url("https://fonts.googleapis.com/css?family=Lato:400,700,400italic");
  body {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 1.42857143;
  }
</style>
<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="3"
      >
        <map-sidebar
          :class="'side-active classifiers-sidebar'"
        >
          <v-list
            nav
            dense
          >
            <v-subheader>Список классификаторов</v-subheader>
            <v-list-item-group
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in classifiers"
                :key="i"
                link
              >
                <v-list-item-content>
                  <v-list-item-title
                    @click="getTable(item.link, item.name, item.headers)"
                    v-text="item.name"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </map-sidebar>
      </v-col>
      <v-col>
        <div class="classifiers-table-wrapper">
          <v-data-table
            :headers="table.headers"
            :items="table.items"
            :loading="table.loading"
            loading-text="Загрузка данных..."
          >
            <template v-slot:top>
              <v-toolbar
                flat
                color="white"
              >
                <v-toolbar-title>{{ table.header }}</v-toolbar-title>
              </v-toolbar>
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import mapSidebar from '../components/sidebar/MapSidebar'
  import { mapState } from 'vuex'

  export default {
    name: 'Classifiers',
    components: {
      mapSidebar,
    },
    data: () => ({
      table: {
        header: '',
        headers: [],
        items: [],
        isShow: false,
      },
    }),
    computed: {
      ...mapState(['classifiers']),
    },
    methods: {
      getTable (link, name, headers) {
        let vThis = this
        vThis.table.header = ''
        vThis.table.headers = []
        vThis.table.items = []
        vThis.table.loading = true
        axios.get('http://194.58.104.20/' + link)
          .then(response => {
            this.table.header = name
            this.table.headers = headers
            this.table.items = response.data
            this.table.loading = false
          })
          .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request)
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message)
            }
            console.log(error.config)
          })
      },
    },
  }
</script>

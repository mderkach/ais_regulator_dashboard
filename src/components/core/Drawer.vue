<template>
  <!-- color="grey darken-2" -->
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    style="z-index: 500"
    app
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar color="white">
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/v.png"
          height="34"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">
        AIS
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />
      <div
        v-for="(link, i) in links"
        :key="i"
        class="nav-links"
      >
        <v-list-group
          v-if="link.subMenu"
          :prepend-icon="link.icon"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(subLink, j) in link.subMenu"
            :key="j"
            :to="subLink.to"
            active-class="primary white--text"
          >
            <!-- <v-list-item-action>
              <v-icon>{{ subLink.icon }}</v-icon>
            </v-list-item-action> -->

            <v-list-item-title
              v-text="subLink.text"
            />
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :to="link.to"
          active-class="primary white--text"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-title v-text="link.text" />
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
  import { mapMutations, mapState } from 'vuex'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      links: [
        {
          to: '/',
          icon: 'mdi-map-marker',
          text: 'Карта',
        },
        {
          to: '#',
          icon: 'mdi-map-marker',
          text: 'Данные',
        },
        {
          icon: 'mdi-laptop-chromebook',
          text: 'Мониторинг',
          subMenu: [
            {
              to: '/monitor-car',
              text: 'Транспортные средства',
            },
            {
              to: '/monitor-ct',
              text: 'Контрольные точки',
            },
          ],
        },

      ],
    }),

    computed: {
      ...mapState('app', ['image', 'color']),
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        },
      },
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      openSubMenu (e) {
        console.log(e)
      },
    },
  }
</script>

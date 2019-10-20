import Vue from 'vue'
import Offset from '@/components/helper/Offset'
import Card from '@/components/material/Card'
import ChartCard from '@/components/material/ChartCard'
import Notification from '@/components/material/Notification'
import StatsCard from '@/components/material/StatsCard'
import { LMap, LTileLayer, LMarker, LIcon, LPolyline, LFeatureGroup } from 'vue2-leaflet'

Vue.component(Offset.name, Offset)
Vue.component(Card.name, Card)
Vue.component(ChartCard.name, ChartCard)
Vue.component(Notification.name, Notification)
Vue.component(StatsCard.name, StatsCard)
Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-icon', LIcon)
Vue.component('l-polyline', LPolyline)
Vue.component('l-feature-group', LFeatureGroup)

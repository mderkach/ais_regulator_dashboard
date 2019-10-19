import colors from 'vuetify/lib/util/colors'

export const chooseColorFunc = {
  methods: {
    chooseColor () {
      let colorsArr = Object.values(colors)
      let rand = Math.random()
      let randIndex = Math.floor(rand * colorsArr.length)
      let color = colorsArr[randIndex].base
      return color
    },
  },
}

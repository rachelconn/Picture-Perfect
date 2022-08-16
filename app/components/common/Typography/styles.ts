import { Dimensions, StyleSheet } from "react-native"

export const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  title: {
    fontFamily: 'roboto',
    color: 'black',
    fontSize: windowSize.width * 0.07,
    flexWrap: 'wrap',
  },
  bodyLarge: {
    fontFamily: 'roboto',
    color: 'black',
    fontSize: windowSize.width * 0.05,
    flexWrap: 'wrap',
  },
  bodyMedium: {
    fontFamily: 'roboto',
    color: 'black',
    fontSize: windowSize.width * 0.04,
    flexWrap: 'wrap',
  },
  bodySmall: {
    fontFamily: 'roboto',
    color: 'black',
    fontSize: windowSize.width * 0.03,
    flexWrap: 'wrap',
  },
  caption: {
    fontFamily: 'roboto',
    color: 'darkgray',
    fontSize: windowSize.width * 0.03,
    flexWrap: 'wrap',
  },
});

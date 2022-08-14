import { Dimensions, StyleSheet } from "react-native"

export const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    backgroundColor: 'lightgray',
    height: windowSize.height,
    width: windowSize.width,
    display: 'flex',
    flexDirection: 'column',
  },
  contentArea: {
    padding: windowSize.width * 0.025,
  },
});

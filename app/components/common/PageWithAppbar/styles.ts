import { Dimensions, StatusBar, StyleSheet } from "react-native"

const windowSize = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight ?? 0;
const pageHeight = windowSize.height - statusBarHeight

export default StyleSheet.create({
  background: {
    height: windowSize.height,
    width: windowSize.width,
    backgroundColor: 'lightgray',
    display: 'flex',
    flexDirection: 'column',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentAreaContainer: {
    height: pageHeight - 56,
  },
  contentArea: {
    padding: windowSize.width * 0.025,
  },
  fixedContentContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

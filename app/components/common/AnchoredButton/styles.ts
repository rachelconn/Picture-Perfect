import { Dimensions, StatusBar, StyleSheet } from 'react-native';

const windowSize = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight ?? 0;
const pageHeight = windowSize.height - statusBarHeight;

export default StyleSheet.create({
  anchoredButton: {
    position: 'absolute',
    right: windowSize.width * 0.05,
    bottom: windowSize.width * 0.05,
  },
  anchoredButtonContent: {
    flexDirection: 'row-reverse',
  },
});

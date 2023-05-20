import { Dimensions, StyleSheet } from 'react-native';

const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  anchoredButton: {
    position: 'absolute',
    right: windowSize.width * 0.05,
    bottom: windowSize.width * 0.05,
  },
  anchoredButtonColumn: {
    position: 'absolute',
    right: windowSize.width * 0.05,
    bottom: windowSize.width * 0.05,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  columnButton: {
    marginTop: 8,
  },
  anchoredButtonContent: {
    flexDirection: 'row-reverse',
  },
});

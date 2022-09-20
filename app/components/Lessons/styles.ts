import { Dimensions, StyleSheet } from 'react-native';

const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  startLessonButton: {
    position: 'absolute',
    right: windowSize.width * 0.05,
    bottom: windowSize.width * 0.05,
  },
  startLessonButtonContent: {
    flexDirection: 'row-reverse',
  },
  scrollContent: {
    paddingBottom: windowSize.width * 0.2,
  },
});

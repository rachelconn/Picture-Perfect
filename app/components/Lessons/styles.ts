import { Dimensions, StyleSheet } from 'react-native';

const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  scrollContent: {
    paddingBottom: windowSize.width * 0.2,
  },
});

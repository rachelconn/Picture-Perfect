import { Dimensions, StyleSheet } from 'react-native';

const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  articleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionHeader: {
    paddingBottom: windowSize.width * 0.03,
  },
});

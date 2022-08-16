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
  imageContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: windowSize.width,
    alignItems: 'center',
    paddingTop: windowSize.width * 0.03,
  },
  imageCaption: {
    width: windowSize.width * 0.8,
    textAlign: 'center',
  },
});

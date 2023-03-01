import { Dimensions, StyleSheet } from 'react-native';

const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  articleContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  sectionHeader: {
    paddingBottom: windowSize.width * 0.03,
  },
  paragraph: {
    marginLeft: windowSize.width * 0.02,
    marginRight: windowSize.width * 0.02,
  },
  list: {
    marginTop: windowSize.width * 0.025,
    marginBottom: windowSize.width * 0.025,
    marginLeft: windowSize.width * 0.1,
    marginRight: windowSize.width * 0.1,
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  listItemMarker: {
    marginRight: windowSize.width * 0.02,
  },
  imageContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: windowSize.width,
    alignItems: 'center',
    paddingTop: windowSize.width * 0.03,
  },
  listedImagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageCaption: {
    width: windowSize.width * 0.8,
    textAlign: 'center',
  },
});

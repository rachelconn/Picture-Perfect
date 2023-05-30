import { Dimensions, StyleSheet } from 'react-native';

const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  articleContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  sectionHeader: {
    paddingTop: windowSize.width * 0.03,
  },
  paragraph: {
    marginLeft: windowSize.width * 0.01,
    marginRight: windowSize.width * 0.01,
  },
  list: {
    marginTop: windowSize.width * 0.025,
    marginBottom: windowSize.width * 0.025,
    marginLeft: windowSize.width * 0.01,
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
    marginTop: windowSize.width * 0.03,
  },
  focusedImageContainer: {
    backgroundColor: '#000000b0',
    width: windowSize.width,
    height: windowSize.height,
  },
  listedImagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  listedImageContainer: {
    margin: windowSize.width * 0.01,
  },
  imageCaption: {
    width: windowSize.width * 0.8,
    textAlign: 'center',
  },
});

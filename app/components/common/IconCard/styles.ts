import { Dimensions, StyleSheet } from "react-native"

export const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  cardContainer: {
    // TODO: height needs to change to accomodate content
    backgroundColor: 'white',
    borderRadius: windowSize.width * 0.025,
    minHeight: windowSize.height * 0.15,
    marginBottom: windowSize.height * 0.01,
    padding: windowSize.width * 0.01,
  },
  textContainer: {
    flexGrow: 1,
    width: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexShrink: 1,
  },
  iconContainer: {
    alignSelf: 'center',
    marginRight: windowSize.width * 0.01,
  },
});

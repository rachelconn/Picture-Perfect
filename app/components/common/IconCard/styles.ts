import { Dimensions, StyleSheet } from "react-native"

export const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  cardContainer: {
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
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'fade',
    alignItems: 'center',
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

import { Dimensions, StyleSheet } from "react-native"

export const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  loadingModal: {
    width: windowSize.width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  loadingModalContent: {
    width: windowSize.width * 0.3,
    height: windowSize.width * 0.3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000b0',
    borderRadius: windowSize.width * 0.02,
  },
});

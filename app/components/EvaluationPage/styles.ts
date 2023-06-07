import { Dimensions, StyleSheet } from "react-native"

export const windowSize = Dimensions.get('window');

const exposureMeterMarkerDiameter = windowSize.width * 0.04;

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
  focusCardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  focusCardColumn: {
    display: 'flex',
    flexDirection: 'column',
    margin: windowSize.width * 0.02,
    alignItems: 'center',
  },
  focusCardImage: {
    width: windowSize.width * 0.4,
    height: windowSize.width * 0.4 * (3 / 4),
  },
  exposureMeterWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 14,
  },
  exposureMeterContainer: {
    width: '100%',
    height: windowSize.width * 0.02,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  exposureMeter: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  exposureMeterMarkerOuter: {
    position: 'absolute',
    width: exposureMeterMarkerDiameter,
    height: exposureMeterMarkerDiameter,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -exposureMeterMarkerDiameter / 2 }, { translateY: -exposureMeterMarkerDiameter / 4 }],
    backgroundColor: 'gray',
    borderRadius: exposureMeterMarkerDiameter,
  },
  exposureMeterMarkerInner: {
    position: 'absolute',
    width: exposureMeterMarkerDiameter * 0.75,
    height: exposureMeterMarkerDiameter  * 0.75,
    borderRadius: exposureMeterMarkerDiameter,
    backgroundColor: 'white',
    overflow: 'visible',
  },
  exposureMeterMarkerText: {
    width: 50,
    position: 'absolute',
    textAlign: 'center',
    top: -20,
  },
  axisMarkerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

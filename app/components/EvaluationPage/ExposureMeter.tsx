import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../common/Typography/Typography';
import { clamp, inverseInterpolate } from '../../utils/math';

function formatExposure(exposure: number): string {
    let formatted = exposure.toFixed(1);
    if (formatted[0] !== '-' && formatted !== '0.0') formatted = `+${formatted}`;
    return formatted;
}

interface ExposureMeterProps {
  value: number,
}

const colors = ['#ff0000', '#ffff00', '#00d466', '#ffff00', '#ff0000'];

const ExposureMeter: React.FC<ExposureMeterProps> = ({ value }) => {
  const [width, setWidth] = React.useState(0);

  const exposureMarker = width ? (
    <View style={{ ...styles.exposureMeterMarkerOuter, left: clamp(width * inverseInterpolate(value, -1.5, 1.5), 0, width) }}>
      <View style={styles.exposureMeterMarkerInner} />
      <Typography variant="bodyMedium" style={styles.exposureMeterMarkerText}>
        {formatExposure(value)}
      </Typography>
    </View>
  ) : undefined;

  const axisMarkers = [-1.5, -1, -0.5, 0, 0.5, 1, 1.5].map((x) => {
    return <Typography variant="bodySmall" color="gray" key={x}>{formatExposure(x)}</Typography>;
  });

  return (
    <View style={styles.exposureMeterWrapper}>
      <View style={styles.exposureMeterContainer}>
        <LinearGradient style={styles.exposureMeter} colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          {exposureMarker}
        </LinearGradient>
      </View>
      <View style={styles.axisMarkerContainer}>
        {axisMarkers}
      </View>
    </View>
  );
};

export default ExposureMeter;

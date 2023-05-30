import React from 'react';
import { View } from 'react-native';
import CardBase from '../common/IconCard/CardBase';
import Typography from '../common/Typography/Typography';
import styles from './styles';
import ImageBase from '../common/Article/ImageBase';
import { imageToSource, photoDimensions } from './FocusEvaluationCard';
import NavigationContext from '../common/NavigationStack/NavigationContext';

const PhotoDisplay: React.FC = () => {
  const { imageURI } = React.useContext(NavigationContext);
  const imageBase64 = imageToSource(imageURI);

  return (
    <CardBase>
      <Typography variant="title">Your Photo</Typography>
      <View style={styles.focusCardContent}>
        <ImageBase source={{ uri: imageBase64 }} widthRatio={0.7} imageSize={photoDimensions} />
      </View>
    </CardBase>
  );
};

export default PhotoDisplay;

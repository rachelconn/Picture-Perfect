import React from 'react';
import { Image, View } from 'react-native';
import { Evaluation } from '../../classes/evaluation';
import CardBase from '../common/IconCard/CardBase';
import NavigationContext from '../common/NavigationStack/NavigationContext';
import Typography from '../common/Typography/Typography';
import styles from './styles';

interface FocusEvaluationCardProps {
  evaluation: Evaluation,
};

const FocusEvaluationCard: React.FC<FocusEvaluationCardProps> = ({ evaluation }) => {
  const { imageURI } = React.useContext(NavigationContext);

  const imageBase64 = `data:image/jpeg;base64,${imageURI.replace(/_/g, '/').replace(/-/g, '+')}`
  const focusBase64 = `data:image/png;base64,${evaluation.rawValues.focus}`

  return (
    <CardBase>
      <Typography variant="title">Focus</Typography>
      <View style={styles.focusCardContent}>
        <View style={styles.focusCardColumn}>
          <Image style={styles.focusCardImage} source={{ uri: imageBase64 }} />
          <Typography variant="caption">Your image</Typography>
        </View>
        <View style={styles.focusCardColumn}>
          <Image style={styles.focusCardImage} source={{ uri: focusBase64 }} />
          <Typography variant="caption">Areas in focus</Typography>
        </View>
      </View>
    </CardBase>
  );
};

export default FocusEvaluationCard;

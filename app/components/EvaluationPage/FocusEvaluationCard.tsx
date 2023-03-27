import React from 'react';
import { Image, View } from 'react-native';
import { Evaluation, EvaluationCriteria } from '../../classes/evaluation';
import CardBase from '../common/IconCard/CardBase';
import Typography from '../common/Typography/Typography';
import styles from './styles';

interface FocusEvaluationCardProps {
  evaluation: Evaluation,
  imageURI: string,
};

const FocusEvaluationCard: React.FC<FocusEvaluationCardProps> = ({ evaluation, imageURI }) => {
  const imageBase64 = `data:image/jpeg;base64,${imageURI.replace(/_/g, '/').replace(/-/g, '+')}`
  const focusBase64 = `data:image/png;base64,${evaluation.value as string}`

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

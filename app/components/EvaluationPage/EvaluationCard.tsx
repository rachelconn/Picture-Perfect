import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles, { windowSize } from './styles';

export enum EvaluationCriteria {
  Exposure = 'exposure',
  GlobalBlur = 'blur',
  BackgroundBlur = 'backgroundBlur',
  WhiteBalance = 'whiteBalance',
  Noise = 'noise',
};

interface EvaluationCriteriaProps {
  name: string,
  descriptionGood: string,
  // descriptionHigh: string,
  // descriptionLow: string,
  // TODO: define threshold for low/high and provide feedback accordingly
  icon: string,
};

const evaluationCriteriaProps: Record<EvaluationCriteria, EvaluationCriteriaProps> = {
  [EvaluationCriteria.Exposure]: {
    name: 'Exposure',
    descriptionGood: 'Your image is properly exposed.',
    icon: 'contrast-box',
  },
  [EvaluationCriteria.GlobalBlur]: {
    name: 'Overall Blur',
    descriptionGood: 'The entire image is sharp. Well done.',
    icon: 'blur',
  },
  [EvaluationCriteria.BackgroundBlur]: {
    name: 'Background Blur',
    descriptionGood: 'The subject is in focus, while the background is blurred. Nice job emphasizing the subject!',
    icon: 'image-filter-center-focus',
  },
  [EvaluationCriteria.WhiteBalance]: {
    name: 'White Balance',
    descriptionGood: 'Your image has proper white balance, and the tones look natural.',
    icon: 'white-balance-sunny',
  },
  [EvaluationCriteria.Noise]: {
    name: 'Noise',
    descriptionGood: 'Your image is free of noise artifacts. Good job balancing ISO and exposure time!',
    icon: 'grain',
  },
};

interface EvaluationCardProps {
  criteria: EvaluationCriteria,
  value: number,
};

const EvaluationCard: React.FC<EvaluationCardProps> = ({ criteria, value }) => {
  const props = evaluationCriteriaProps[criteria];

  const icon = <MaterialCommunityIcons size={windowSize.height * 0.08} name={props.icon} color="#323232" />;

  return (
    <View style={styles.evaluationCardContainer}>
      <View style={styles.evaluationCardContent}>
        <View style={styles.evaluationCardIconContainer}>
          {icon}
        </View>
        <View style={styles.evaluationCardTextContainer}>
          <Text style={styles.evaluationCardTitle}>{`${props.name}: ${value.toFixed(2)}`}</Text>
          <Text style={styles.evaluationCardDescription}>{props.descriptionGood}</Text>
        </View>
      </View>
    </View>
  );
};

export default EvaluationCard;

import React from 'react';
import IconCard from '../common/IconCard/IconCard';

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

  return (
    <IconCard
      title={`${props.name}: ${value.toFixed(2)}`}
      description={props.descriptionGood}
      icon={props.icon}
    />
  );
};

export default EvaluationCard;

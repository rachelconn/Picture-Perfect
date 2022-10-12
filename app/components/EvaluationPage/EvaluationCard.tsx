import React from 'react';
import { EvaluationCriteria } from '../../classes/evaluation';
import IconCard from '../common/IconCard/IconCard';

interface EvaluationCriteriaProps {
  name: string,
  // TODO: incorporate camera settings into feedback
  getEvaluation: (value: number) => string,
  icon: string,
};

function getExposureEvaluation(value: number): string {
  // TODO: use min/max ISO/shutter time values to guide feedback
  if (value > 0.5) return 'The image you took is overexposed. Try decreasing your ISO or shutter time.'
  if (value < -0.5) return 'The image you took is underexposed. If your photo is stationary or slow-moving, increase your shutter time. If you notice blurred objects, instead increase your ISO.';
  return 'Your image is properly exposed.';
}

// TODO: give useful feedback
function getGlobalBlurEvaluation(value: number): string {
    return 'The entire image is sharp. Well done!';
}

// TODO: give useful feedback
function getBackgroundBlurEvaluation(value: number): string {
    return 'The subject is in focus, while the background is blurred. Nice job emphasizing the subject!';
}

// TODO: give useful feedback
function getWhiteBalanceEvaluation(value: number): string {
    return 'Your image has proper white balance, and the tones look natural.';
}

// TODO: give useful feedback
function getNoiseEvaluation(value: number): string {
    return 'Your image is free of noise artifacts. Good job balancing ISO and exposure time!';
}

const evaluationCriteriaProps: Record<EvaluationCriteria, EvaluationCriteriaProps> = {
  [EvaluationCriteria.Exposure]: {
    name: 'Exposure',
    getEvaluation: getExposureEvaluation,
    icon: 'contrast-box',
  },
  [EvaluationCriteria.GlobalBlur]: {
    name: 'Overall Blur',
    getEvaluation: getGlobalBlurEvaluation,
    icon: 'blur',
  },
  [EvaluationCriteria.BackgroundBlur]: {
    name: 'Background Blur',
    getEvaluation: getBackgroundBlurEvaluation,
    icon: 'image-filter-center-focus',
  },
  [EvaluationCriteria.WhiteBalance]: {
    name: 'White Balance',
    getEvaluation: getWhiteBalanceEvaluation,
    icon: 'white-balance-sunny',
  },
  [EvaluationCriteria.Noise]: {
    name: 'Noise',
    getEvaluation: getNoiseEvaluation,
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
      description={props.getEvaluation(value)}
      icon={props.icon}
    />
  );
};

export default EvaluationCard;

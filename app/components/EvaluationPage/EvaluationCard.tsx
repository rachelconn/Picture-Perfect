import React from 'react';
import { Evaluation, EvaluationCriteria } from '../../classes/evaluation';
import IconCard from '../common/IconCard/IconCard';

interface EvaluationCardProps {
  criteria: EvaluationCriteria,
  value: number,
};

const icon: Record<EvaluationCriteria, string> = {
  [EvaluationCriteria.Exposure]: 'contrast-box',
  [EvaluationCriteria.GlobalBlur]: 'blur',
  [EvaluationCriteria.Bokeh]: 'image-filter-center-focus',
  [EvaluationCriteria.WhiteBalance]: 'white-balance-sunny',
  [EvaluationCriteria.Noise]: 'grain',
};

const EvaluationCard: React.FC<EvaluationCardProps> = ({ criteria, value }) => {
  const evaluation = new Evaluation(criteria, value);

  return (
    <IconCard
      title={`${evaluation.getName()}: ${value.toFixed(2)}`}
      description={evaluation.getFeedback()}
      icon={icon[criteria]}
    />
  );
};

export default EvaluationCard;

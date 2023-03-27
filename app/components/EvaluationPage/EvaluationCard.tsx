import React from 'react';
import { Evaluation, EvaluationCriteria } from '../../classes/evaluation';
import IconCard from '../common/IconCard/IconCard';

interface EvaluationCardProps {
  evaluation: Evaluation,
};

const icon: Partial<Record<EvaluationCriteria, string>> = {
  [EvaluationCriteria.Exposure]: 'contrast-box',
  [EvaluationCriteria.GlobalBlur]: 'blur',
  [EvaluationCriteria.Bokeh]: 'image-filter-center-focus',
  [EvaluationCriteria.WhiteBalance]: 'white-balance-sunny',
  [EvaluationCriteria.Noise]: 'grain',
};

const EvaluationCard: React.FC<EvaluationCardProps> = ({ evaluation }) => {
  return (
    <IconCard
      title={`${evaluation.name}: ${evaluation.value.toFixed(2)}`}
      description={evaluation.feedback.comment}
      icon={icon[evaluation.criteria]}
    />
  );
};

export default EvaluationCard;

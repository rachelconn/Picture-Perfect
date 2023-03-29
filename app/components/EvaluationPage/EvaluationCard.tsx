import React from 'react';
import { Evaluation, EvaluationCriteria } from '../../classes/evaluation';
import IconCard from '../common/IconCard/IconCard';

interface EvaluationCardProps {
  evaluation: Evaluation,
};

const icon: Omit<Record<EvaluationCriteria, string>, EvaluationCriteria.Focus> = {
  [EvaluationCriteria.Exposure]: 'contrast-box',
  [EvaluationCriteria.GlobalBlur]: 'blur',
  [EvaluationCriteria.Bokeh]: 'image-filter-center-focus',
  [EvaluationCriteria.Noise]: 'grain',
  // [EvaluationCriteria.WhiteBalance]: 'white-balance-sunny',
};

const EvaluationCard: React.FC<EvaluationCardProps> = ({ evaluation }) => {
  if (evaluation.criteria === EvaluationCriteria.Focus) {
    throw new Error('<EvaluationCard /> cannot use Focus as EvaluationCriteria! Use <FocusEvaluationCard /> instead.');
  }

  return (
    <IconCard
      title={`${evaluation.name}: ${(evaluation.value as number).toFixed(2)}`}
      description={evaluation.feedback.comment}
      icon={icon[evaluation.criteria]}
    />
  );
};

export default EvaluationCard;

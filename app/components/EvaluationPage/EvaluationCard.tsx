import React from 'react';
import { Evaluation, EvaluationCriteria } from '../../classes/evaluation';
import IconCard from '../common/IconCard/IconCard';
import FocusEvaluationCard from './FocusEvaluationCard';
import ExposureMeter from './ExposureMeter';

interface EvaluationCardProps {
  evaluation: Evaluation,
};

const icon: Omit<Record<EvaluationCriteria, string>, EvaluationCriteria.Focus> = {
  [EvaluationCriteria.Exposure]: 'contrast-box',
  [EvaluationCriteria.Blur]: 'blur',
  [EvaluationCriteria.Bokeh]: 'image-filter-center-focus',
  [EvaluationCriteria.Noise]: 'grain',
  // [EvaluationCriteria.WhiteBalance]: 'white-balance-sunny',
};

const EvaluationCard: React.FC<EvaluationCardProps> = ({ evaluation }) => {
  // Use special card for focus since it needs to show image comparison
  if (evaluation.criteria === EvaluationCriteria.Focus) {
    return <FocusEvaluationCard evaluation={evaluation} />;
  }

  let title = evaluation.name;

  // Add exposure meter display for exposure card
  const content = evaluation.criteria === EvaluationCriteria.Exposure ? (
    <ExposureMeter value={evaluation.rawValues.exposure} />
  ) : undefined;

  return (
    <IconCard
      title={title}
      titleColor={evaluation.feedback.isGood ? 'black' : '#ed4337'}
      content={content}
      description={evaluation.feedback.comment}
      icon={icon[evaluation.criteria]}
    />
  );
};

export default EvaluationCard;

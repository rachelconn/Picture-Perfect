import React from 'react';
import { Evaluation, EvaluationCriteria } from '../../classes/evaluation';
import IconCard from '../common/IconCard/IconCard';
import FocusEvaluationCard from './FocusEvaluationCard';

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

  // Generate title based on criteria
  // TODO: show value as necessary
  let title = evaluation.name;
  if (evaluation.criteria === EvaluationCriteria.Exposure) {
    let formattedExposure = evaluation.rawValues.exposure.toFixed(1);
    if (formattedExposure[0] !== '-') formattedExposure = `+${formattedExposure}`;
    title = title.concat(`: ${formattedExposure}`)
  }

  return (
    <IconCard
      title={title}
      titleColor={evaluation.feedback.isGood ? '#00d466' : '#ff0000'}
      description={evaluation.feedback.comment}
      icon={icon[evaluation.criteria]}
    />
  );
};

export default EvaluationCard;

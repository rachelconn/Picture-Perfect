import Lesson from './lesson';

export enum EvaluationCriteria {
  Exposure = 'Exposure',
  GlobalBlur = 'Blur',
  Bokeh = 'Bokeh',
  WhiteBalance = 'White Balance',
  Noise = 'Noise',
};

export const LessonEvaluationCriteria: Record<Lesson, EvaluationCriteria[]> = {
  [Lesson.Exposure]: [
    EvaluationCriteria.Exposure,
    EvaluationCriteria.GlobalBlur,
    EvaluationCriteria.Noise,
  ],
};

// Helpers for Evaluation class
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

interface EvaluationCriteriaProps {
  name: string,
  // TODO: incorporate camera settings into feedback
  getEvaluation: (value: number) => string,
};

const evaluationCriteriaProps: Record<EvaluationCriteria, EvaluationCriteriaProps> = {
  [EvaluationCriteria.Exposure]: {
    name: 'Exposure',
    getEvaluation: getExposureEvaluation,
  },
  [EvaluationCriteria.GlobalBlur]: {
    name: 'Blur',
    getEvaluation: getGlobalBlurEvaluation,
  },
  [EvaluationCriteria.Bokeh]: {
    name: 'Bokeh',
    getEvaluation: getBackgroundBlurEvaluation,
  },
  [EvaluationCriteria.WhiteBalance]: {
    name: 'White Balance',
    getEvaluation: getWhiteBalanceEvaluation,
  },
  [EvaluationCriteria.Noise]: {
    name: 'Noise',
    getEvaluation: getNoiseEvaluation,
  },
};

/**
 * Object representing the evaluation given for a single criteria
 */
export class Evaluation {
  criteria: EvaluationCriteria;
  value: number;

  constructor(criteria: EvaluationCriteria, value: number) {
    this.criteria = criteria;
    this.value = value;
  }

  getName(): string {
    return evaluationCriteriaProps[this.criteria].name;
  }

  getFeedback(): string {
    return evaluationCriteriaProps[this.criteria].getEvaluation(this.value);
  }
}

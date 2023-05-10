import Lesson from './lesson';

// Criteria for lessons to evaluate
export enum EvaluationCriteria {
  Blur = 'Blur',
  Bokeh = 'Bokeh',
  Exposure = 'Exposure',
  Focus = 'Focus',
  Noise = 'Noise',
};

export enum BlurType {
  Sharp = 0,
  MotionBlur = 1,
  OutOfFocus = 2,
};

// Raw evaluation numbers from the backend
export interface BackendPhotoEvaluation {
  blurType: BlurType,
  bokeh: number,
  exposure: number,
  focus: string,
  noise: number,
  percentInFocus: number,
};

export const LessonEvaluationCriteria: Record<Lesson, EvaluationCriteria[]> = {
  [Lesson.Focus]: [
    EvaluationCriteria.Blur,
    EvaluationCriteria.Focus,
  ],
  [Lesson.Exposure]: [
    EvaluationCriteria.Blur,
    EvaluationCriteria.Exposure,
    EvaluationCriteria.Noise,
  ],
  [Lesson.LowLight]: [
    EvaluationCriteria.Blur,
    EvaluationCriteria.Exposure,
    EvaluationCriteria.Noise,
  ],
  [Lesson.Bokeh]: [
    EvaluationCriteria.Blur,
    EvaluationCriteria.Bokeh,
    EvaluationCriteria.Focus,
  ],
};

interface EvaluationFeedback {
  comment: string,
  isGood: boolean,
};


/**
 * Helpers for Evaluation class
 */
function getExposureFeedback({ exposure }: BackendPhotoEvaluation): EvaluationFeedback {
  // TODO: use min/max ISO/shutter time values to guide feedback
  if (exposure > 0.6) {
    return {
      comment: 'The image you took is overexposed. Try decreasing your ISO or shutter time.',
      isGood: false,
    };
  }
  if (exposure < -0.6) {
    return {
      comment: 'The image you took is underexposed. If objects in your photo are stationary or slow-moving, increase your shutter time. If you notice blurred objects, instead increase your ISO.',
      isGood: false,
    };
  }
  return {
    comment: 'Your image is properly exposed.',
    isGood: true,
  };
}

// TODO: need to make sure this distinguishes between motion blur and focal length issues
function getBlurTypeFeedback({ blurType }: BackendPhotoEvaluation): EvaluationFeedback {
  if (blurType === BlurType.MotionBlur) {
    return {
      comment: 'Your photo seems to suffer from motion blur. Try keeping your camera steady with techniques like controlling your breathing, placing your camera on a stable surface, or keeping your elbows tucked into your body.',
      isGood: false,
    };
  }
  if (blurType === BlurType.OutOfFocus) {
    return {
      comment: "Your photo isn't properly focused on the subject. Try adjusting it by starting with the focal distance at either the minimum or maximum value, then slowly adjust until you see the subject become sharper.",
      isGood: false,
    }
  }
  if (blurType === BlurType.Sharp) {
    return {
      comment: "Your photo doesn't seem to have motion blur, and the focus is clear and sharp. Great job!",
      isGood: true,
    };
  }
  throw Error(`Undefined blur type: ${blurType}. Make sure the API output is correct.`);
}

// TODO: give useful feedback
function getBokehFeedback(evaluations: BackendPhotoEvaluation): EvaluationFeedback {
    return {
      comment: 'The subject is in focus, while the background is blurred. Nice job emphasizing the subject!',
      isGood: true,
    };
}

// // TODO: give useful feedback
// function getWhiteBalanceFeedback(value: number): EvaluationFeedback {
//     return {
//       comment: 'Your image has proper white balance, and the tones look natural.',
//       isGood: true,
//     };
// }

// TODO: give useful feedback
function getNoiseFeedback(evaluations: BackendPhotoEvaluation): EvaluationFeedback {
    return {
      comment: 'Your image is free of noise artifacts. Good job balancing ISO and exposure time!',
      isGood: true,
    };
}

// TODO: give useful feedback
function getFocusFeedback(evaluations: BackendPhotoEvaluation): EvaluationFeedback {
  return {
    comment: 'Placeholder.',
    isGood: true,
  };
}

interface EvaluationCriteriaProps {
  name: string,
  // TODO: incorporate camera settings into feedback
  getFeedback: (evaluations: BackendPhotoEvaluation) => EvaluationFeedback,
};

const evaluationCriteriaProps: Record<EvaluationCriteria, EvaluationCriteriaProps> = {
  [EvaluationCriteria.Exposure]: {
    name: 'Exposure',
    getFeedback: getExposureFeedback,
  },
  [EvaluationCriteria.Blur]: {
    name: 'Blur',
    getFeedback: getBlurTypeFeedback,
  },
  [EvaluationCriteria.Bokeh]: {
    name: 'Bokeh',
    getFeedback: getBokehFeedback,
  },
  [EvaluationCriteria.Noise]: {
    name: 'Noise',
    getFeedback: getNoiseFeedback,
  },
  [EvaluationCriteria.Focus]: {
    name: 'Focus',
    getFeedback: getFocusFeedback,
  },
};

/**
 * Object representing the evaluation given for a single criteria
 */
export class Evaluation {
  #criteria: EvaluationCriteria;
  #evaluations: BackendPhotoEvaluation;
  #feedback?: EvaluationFeedback;

  constructor(criteria: EvaluationCriteria, evaluations: BackendPhotoEvaluation) {
    this.#criteria = criteria;
    this.#evaluations = evaluations;
  }

  public get criteria(): EvaluationCriteria {
    return this.#criteria;
  }

  // Returns a user-friendly name for the evaluation criteria
  public get name(): string {
    return evaluationCriteriaProps[this.#criteria].name;
  }

  // Returns feedback for the criteria based on its value
  public get feedback(): EvaluationFeedback {
    // Cache feedback to avoid recalculating
    if (!this.#feedback) {
      this.#feedback = evaluationCriteriaProps[this.#criteria].getFeedback(this.#evaluations);
    }
    return this.#feedback;
  }

  // Returns raw feedback values in case they are needed for other logic
  public get rawValues(): BackendPhotoEvaluation {
    return this.#evaluations;
  }
}

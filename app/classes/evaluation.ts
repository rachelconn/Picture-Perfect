import Lesson from './lesson';

/**
 * Evaluation criteria avaiable from the evaluation backend.
 * Note that the names match those used by the backend, not user-friendly display names.
 */
export enum EvaluationCriteria {
  Exposure = 'exposure',
  GlobalBlur = 'blur',
  Bokeh = 'backgroundBlur',
  WhiteBalance = 'whiteBalance',
  Noise = 'noise',
  Focus = 'focus',
};

export const LessonEvaluationCriteria: Record<Lesson, EvaluationCriteria[]> = {
  [Lesson.Exposure]: [
    EvaluationCriteria.Exposure,
    EvaluationCriteria.GlobalBlur,
    EvaluationCriteria.Noise,
    EvaluationCriteria.Focus,
  ],
  [Lesson.Focus]: [
    EvaluationCriteria.Focus,
  ],
};

interface EvaluationFeedback {
  comment: string,
  isGood: boolean,
};

// Helpers for Evaluation class
function getExposureFeedback(value: number): EvaluationFeedback {
  // TODO: use min/max ISO/shutter time values to guide feedback
  if (value > 0.5) {
    return {
      comment: 'The image you took is overexposed. Try decreasing your ISO or shutter time.',
      isGood: false,
    };
  }
  if (value < -0.5) {
    return {
      comment: 'The image you took is underexposed. If your photo is stationary or slow-moving, increase your shutter time. If you notice blurred objects, instead increase your ISO.',
      isGood: false,
    };
  }
  return {
    comment: 'Your image is properly exposed.',
    isGood: true,
  };
}

// TODO: give useful feedback
function getGlobalBlurFeedback(value: number): EvaluationFeedback {
    return {
      comment: 'The entire image is sharp. Well done!',
      isGood: true,
    };
}

// TODO: give useful feedback
function getBackgroundBlurFeedback(value: number): EvaluationFeedback {
    return {
      comment: 'The subject is in focus, while the background is blurred. Nice job emphasizing the subject!',
      isGood: true,
    };
}

// TODO: give useful feedback
function getWhiteBalanceFeedback(value: number): EvaluationFeedback {
    return {
      comment: 'Your image has proper white balance, and the tones look natural.',
      isGood: true,
    };
}

// TODO: give useful feedback
function getNoiseFeedback(value: number): EvaluationFeedback {
    return {
      comment: 'Your image is free of noise artifacts. Good job balancing ISO and exposure time!',
      isGood: true,
    };
}

// TODO: give useful feedback
function getFocusFeedback(value: string): EvaluationFeedback {
  return {
    comment: 'Placeholder.',
    isGood: true,
  };
}

interface EvaluationCriteriaProps {
  name: string,
  // TODO: incorporate camera settings into feedback
  getFeedback: (value: any) => EvaluationFeedback,
};

const evaluationCriteriaProps: Record<EvaluationCriteria, EvaluationCriteriaProps> = {
  [EvaluationCriteria.Exposure]: {
    name: 'Exposure',
    getFeedback: getExposureFeedback,
  },
  [EvaluationCriteria.GlobalBlur]: {
    name: 'Blur',
    getFeedback: getGlobalBlurFeedback,
  },
  [EvaluationCriteria.Bokeh]: {
    name: 'Bokeh',
    getFeedback: getBackgroundBlurFeedback,
  },
  [EvaluationCriteria.WhiteBalance]: {
    name: 'White Balance',
    getFeedback: getWhiteBalanceFeedback,
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
  #value: number | string;
  #feedback?: EvaluationFeedback;

  constructor(criteria: EvaluationCriteria, value: number) {
    this.#criteria = criteria;
    this.#value = value;
  }

  public get criteria(): EvaluationCriteria {
    return this.#criteria;
  }

  // Returns a user-friendly name for the evaluation criteria
  public get name(): string {
    return evaluationCriteriaProps[this.#criteria].name;
  }

  public get value(): number | string {
    return this.#value;
  }

  // Returns feedback for the criteria based on its value
  public get feedback(): EvaluationFeedback {
    // Cache feedback to avoid recalculating
    if (!this.#feedback) {
      this.#feedback = evaluationCriteriaProps[this.#criteria].getFeedback(this.value);
    }
    return this.#feedback;
  }
}

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

function getBokehFeedback(evaluations: BackendPhotoEvaluation): EvaluationFeedback {
  if (evaluations.bokeh > 0.65 || (evaluations.percentInFocus >= 20 && evaluations.percentInFocus <= 70)) {
    return {
      comment: 'The subject is in focus, while the background is blurred. Nice job emphasizing the subject!',
      isGood: true,
    };
  }
  if (evaluations.percentInFocus > 70) {
    return {
      comment: 'Too much of the image is in focus for a striking bokeh effect. Try using some of the tips you learned in the lesson to make it so more of the background is blurred.',
      isGood: false,
    };
  }
  if (evaluations.percentInFocus < 20) {
    return {
      comment: "Most of the image seems to be out of focus. It might help to use forced perspective to get your subject far away from the background, then adjusting your focal length so that the subject is sharp but the background is blurry.",
      isGood: false,
    };
  }
  throw Error(`Evaluations:\n${evaluations}\n  Unhandled evaluation values for bokeh feedback. See above for details about the evaluations given.`);
}

function getNoiseFeedback(evaluations: BackendPhotoEvaluation): EvaluationFeedback {
  // TODO: might want to adjust threshold based on accuracy of the model
  if (evaluations.noise > 0.4) {
    return {
      comment: "Your photo is fairly noisy. Using a lower ISO value in combination with a longer exposure time in order to reduce noise artifacts, and use some of the techniques you've learned to avoid motion blur.",
      isGood: false,
    };
  }
  return {
    comment: 'Your image is free of noise artifacts. Good job balancing ISO and exposure time!',
    isGood: true,
  };
}

// TODO: give useful feedback
// TODO: is this necessary? Focus should be used in conjuction with blur type feedback to provide text while this gives an image to see what areas are in focus
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

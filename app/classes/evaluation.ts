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
  blurTypeLogits: [number, number, number],
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
    EvaluationCriteria.Bokeh,
    EvaluationCriteria.Blur,
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
function getExposureFeedback({ exposure }: BackendPhotoEvaluation, lesson: Lesson): EvaluationFeedback {
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

const blurLessons = new Set<Lesson>([Lesson.Focus, Lesson.Bokeh]);
function getBlurTypeFeedback({ blurType, blurTypeLogits, percentInFocus }: BackendPhotoEvaluation, lesson: Lesson): EvaluationFeedback {
  /* Evaluate as sharp in the following situations:
   * - When the blur type model recognizes the image is sharp
   * - When >=80% of the image is in focus (to make detection more robust)
   * - When completing the low-light lesson and the blur type model gives p>=0.25 that the image is sharp (to make the blur evaluation more forgiving as the lesson is difficult)
   */
  if (
    blurType === BlurType.Sharp
    || percentInFocus >= 80
    || (lesson === Lesson.LowLight && blurTypeLogits[BlurType.Sharp] >= 0.25)
  ) {
    return {
      comment: "Your photo doesn't seem to have motion blur, and the focus is clear and sharp. Great job!",
      isGood: true,
    };
  }
  if (blurType === BlurType.MotionBlur) {
    let comment =  'Your photo seems to suffer from motion blur. Try keeping your camera steady with techniques like controlling your breathing, placing your camera on a stable surface, or keeping your elbows tucked into your body.';
    if (lesson === Lesson.LowLight) comment += ' You might also want to make sure your focus is correctly adjusted, as this could create even more blur!';
    return {
      comment,
      isGood: false,
    };
  }
  // Only evaluate out of focus blur as incorrect if the lesson teaches blur
  if (blurType === BlurType.OutOfFocus) {
    if (blurLessons.has(lesson)) {
      return {
        comment: "Your photo isn't properly focused on the subject. Try adjusting it by starting with the focal distance at either the minimum or maximum value, then slowly adjust until you see the subject become sharper.",
        isGood: false,
      }
    }
    else {
      return {
        comment: "Although it's not the point of this lesson, you might want to know that your image is out of focus. Try looking at the focus or bokeh lessons for more information on how to improve!",
        isGood: true,
      };
    }
  }
  throw Error(`Undefined blur type: ${blurType}. Make sure the API output is correct.`);
}

function getBokehFeedback(evaluations: BackendPhotoEvaluation, lesson: Lesson): EvaluationFeedback {
  if (evaluations.bokeh > 0.65 || (evaluations.percentInFocus >= 20 && evaluations.percentInFocus <= 70)) {
    return {
      comment: 'The subject is in focus, while the background is blurred. Nice job emphasizing the subject!',
      isGood: true,
    };
  }
  if (evaluations.percentInFocus > 65) {
    return {
      comment: 'Too much of the image is in focus for a striking bokeh effect. Try using some of the tips you learned in the lesson to make it so more of the background is blurred.',
      isGood: false,
    };
  }
  if (evaluations.percentInFocus < 30) {
    return {
      comment: "Most of the image seems to be out of focus. It might help to use forced perspective to get your subject far away from the background, then adjusting your focal length so that the subject is sharp but the background is blurry.",
      isGood: false,
    };
  }
  throw Error(`Evaluations:\n${evaluations}\n  Unhandled evaluation values for bokeh feedback. See above for details about the evaluations given.`);
}

function getNoiseFeedback(evaluations: BackendPhotoEvaluation, lesson: Lesson): EvaluationFeedback {
  // TODO: might want to adjust threshold based on accuracy of the model
  if (evaluations.noise > 0.4) {
    return {
      comment: "Your photo is fairly noisy. Using a lower ISO value in combination with a longer exposure time in order to reduce noise artifacts, and use some of the techniques you've learned to avoid motion blur.",
      isGood: false,
    };
  }
  return {
    comment: 'Your image is free of noise artifacts. Good job adjusting your ISO value!',
    isGood: true,
  };
}

// TODO: give useful feedback
// TODO: is this necessary? Focus should be used in conjuction with blur type feedback to provide text while this gives an image to see what areas are in focus
function getFocusFeedback(evaluations: BackendPhotoEvaluation, lesson: Lesson): EvaluationFeedback {
  return {
    comment: 'Placeholder.',
    isGood: true,
  };
}

interface EvaluationCriteriaProps {
  name: string,
  // TODO: incorporate camera settings into feedback
  getFeedback: (evaluations: BackendPhotoEvaluation, lesson: Lesson) => EvaluationFeedback,
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
  #lesson: Lesson | undefined;
  #feedback?: EvaluationFeedback;

  constructor(criteria: EvaluationCriteria, evaluations: BackendPhotoEvaluation, lesson: Lesson | undefined) {
    this.#criteria = criteria;
    this.#evaluations = evaluations;
    this.#lesson = lesson;
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
      this.#feedback = evaluationCriteriaProps[this.#criteria].getFeedback(this.#evaluations, this.#lesson);
    }
    return this.#feedback;
  }

  // Returns raw feedback values in case they are needed for other logic
  public get rawValues(): BackendPhotoEvaluation {
    return this.#evaluations;
  }
}

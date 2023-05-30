import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackendPhotoEvaluation, EvaluationCriteria } from '../classes/evaluation';
import  Lesson from '../classes/lesson';
/**
 * Helper functions that manage saving/loading persistent storage like lesson progress and evaluations.
 */

// Status for a single lesson
export interface LessonStatus {
  completed: boolean;
  submittedPhoto?: string;
  evaluation?: BackendPhotoEvaluation;
};

// Status for all lessons
type LessonStatusRecords = Partial<Record<Lesson, LessonStatus>>;

export async function getLessonStatus(): Promise<LessonStatusRecords> {
  return AsyncStorage.getItem('LessonStatus').then((storageItem) => {
    return storageItem ? JSON.parse(storageItem) : {};
  });
}

export function setLessonStatus(lesson: Lesson, status: LessonStatus): Promise<void> {
  return getLessonStatus().then((lessonStatusRecords) => {
    lessonStatusRecords[lesson] = status;
    return AsyncStorage.setItem('LessonStatus', JSON.stringify(lessonStatusRecords));
  });
}

export function resetAllLessons(): Promise<void> {
  return AsyncStorage.setItem('LessonStatus', JSON.stringify({}));
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvaluationCriteria } from '../classes/evaluation';
import  Lesson from '../classes/lesson';
/**
 * Helper functions that manage saving/loading persistent storage like lesson progress and evaluations.
 */

// Status for a section within a lesson
interface LessonSectionStatus {
  completed: boolean;
  submittedPhoto?: string;
  evaluation?: Partial<Record<EvaluationCriteria, number>>;
};

// Status for an individual lesson: each section has a string name with a corresponding status here
type LessonStatus = Partial<Record<string, LessonSectionStatus>>;

// Status for all lessons
type LessonStatusRecords = Partial<Record<Lesson, LessonStatus>>;

export async function getLessonStatus(): Promise<LessonStatusRecords> {
  return AsyncStorage.getItem('LessonStatus').then((storageItem) => {
    return storageItem ? JSON.parse(storageItem) : {};
  });
}

export function updateSectionStatus(lesson: Lesson, section: string, status: LessonSectionStatus) {
  getLessonStatus().then((lessonStatusRecords) => {
    const lessonStatus = lessonStatusRecords[lesson] ?? {};

    // Propagate section status update
    lessonStatus[section] = status;
    lessonStatusRecords[lesson] = lessonStatus;

    AsyncStorage.setItem('LessonStatus', JSON.stringify(lessonStatusRecords));
  });
}

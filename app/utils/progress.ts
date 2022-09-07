import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvaluationCriteria } from '../components/EvaluationPage/EvaluationCard';
import { Lesson } from '../components/LessonSelectPage/LessonSelectPage';
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
type LessonStatusStorageItem = Partial<Record<Lesson, LessonStatus>>;

// When this file is loaded, ensure lesson status is initialized
AsyncStorage.getItem('LessonStatus').then((storageItem) => {
  if (!storageItem) {
    AsyncStorage.setItem('LessonStatus', '{}');
  }
});

export function markSectionAsCompleted(lesson: Lesson, section: string) {
  AsyncStorage.getItem('LessonStatus').then((storageItem) => {
    const lessonStatusStorageItem: LessonStatusStorageItem = storageItem ? JSON.parse(storageItem) : {};
    const lessonStatus: LessonStatus = lessonStatusStorageItem[lesson] ?? {};

    lessonStatus[section] = {
      completed: true,
    };
    lessonStatusStorageItem[lesson] = lessonStatus;
    AsyncStorage.setItem('LessonStatus', JSON.stringify(lessonStatusStorageItem));
  });
}

export async function getLessonStatus(): Promise<LessonStatusStorageItem> {
  return AsyncStorage.getItem('LessonStatus') as Promise<LessonStatusStorageItem>;
}

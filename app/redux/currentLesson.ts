import { createAction, createReducer } from '@reduxjs/toolkit';
import { Lesson } from '../classes/lesson';

interface CurrentLessonState {
  lesson: Lesson | undefined,
  section: string | undefined,
};

export const setCurrentLesson = createAction<Lesson>('lessonStatus/currentLesson/set');
export const setCurrentLessonSection = createAction<string>('lessonStatus/currentSection/set');

const initialState: CurrentLessonState = {
  lesson: undefined,
  section: undefined,
};

export const currentLessonReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentLesson, (state, action) => {
      state.lesson = action.payload;
    })
    .addCase(setCurrentLessonSection, (state, action) => {
      state.section = action.payload;
    })
});

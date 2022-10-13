import { createAction, createReducer } from '@reduxjs/toolkit';
import Lesson from '../classes/lesson';

interface CurrentLessonState {
  lesson: Lesson | undefined,
};

export const setCurrentLesson = createAction<Lesson>('lessonStatus/currentLesson/set');

const initialState: CurrentLessonState = {
  lesson: undefined,
};

export const currentLessonReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentLesson, (state, action) => {
      state.lesson = action.payload;
    });
});

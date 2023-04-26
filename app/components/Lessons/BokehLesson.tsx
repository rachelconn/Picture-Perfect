import React from 'react';
import Article from '../common/Article/index';
import LessonPage from './LessonPage';
import Lesson from '../../classes/lesson';

const bokehImageListCaption = 'TODO: finish';
const bokehFocusDiagramCaption = 'This diagram shows the area of an image that is in focus, and the gradually decreasing focus the further you are from that area.';

const BokehLesson: React.FC = () => {
  return (
    <LessonPage title="Bokeh" lessonId={Lesson.Bokeh}>
      <Article.SectionHeader>What is Bokeh?</Article.SectionHeader>
      <Article.Paragraph>
        Bokeh is an aesthetic quality of a photograph where the subject is sharply in focus,
        while the background is blurred.
        It can be used for a variety of reasons such as placing emphasis on the subject,
        making messy backgrounds more pleasant to look at, or to create interesting visual effects.
        Below, you can see a couple photos that exhibit bokeh.
        As you look at them, think about how the bokeh adds to the photo
        and what emotions looking at them invokes.
      </Article.Paragraph>
      <Article.CaptionedImageList sources={[/* TODO: add images */]} caption={bokehImageListCaption} />
      <Article.Paragraph>
        Knowing what bokeh is and how to create photos with it can be a great tool
        for improving your photos.
        While not every photo needs to (or should) utilize bokeh,
        using it tastefully can help you to create interesting photos
        and express yourself through your photography.
      </Article.Paragraph>
      <Article.SectionHeader>Learning More About Focus</Article.SectionHeader>
      <Article.Paragraph>
        In the previous lesson on focus,
        you learned that when taking a photo there is a single area that's completely in focus,
        and that this focus area can be moved forward or backward by adjusting your camera's focus.
        Here, we will develop a more nuanced understanding of how this plane of focus works,
        and how to manipulate it to create bokeh.
        While the diagram from the focus lesson is a useful tool when first learning how focus works,
        it is a simplification.
        The diagram below gives a better idea of how the plane of focus works.
      </Article.Paragraph>
      <Article.CaptionedImage source="" caption={bokehFocusDiagramCaption} />
      <Article.SectionHeader>Understanding Depth of Field</Article.SectionHeader>
      <Article.Paragraph>
        In the image above, you can see that rather than a single flat plane being in focus,
        all of the area between a near and far plane is in focus,
        and the further an area is from that area, the less sharp the image.
        The depth of this in-focus area is known as depth of field,
        where having a larger depth of field means both that a larger area will be in focus,
        and that the blurring as you get further from the plane of focus becomes more gradual.
        Depth of field can be manipulated by adjusting your camera's aperture.
        This is one area in which phone cameras pale in comparison to traditional cameras like DSLRs:
        due to how compact they are, the vast majority of smartphone cameras lack an adjustable aperture.
        This makes creating bokeh with a smartphone camera is much more difficult,
        and thus in order to take photos with bokeh you'll have to employ a clever understanding of depth of field
        to make up for the lack of an adjustable aperture.
      </Article.Paragraph>
      <Article.SectionHeader>How to Create Bokeh</Article.SectionHeader>
        Recall that bokeh means having contrast between an in-focus subject and a highly blurred background.
        With a traditional camera, this can be done relatively easily by making the aperture more narrow,
        meaning that objects even slightly outside the plane of focus can be heavily blurred.
        However, with a phone camera you'll have to create this
      <Article.SectionHeader>Your Task</Article.SectionHeader>
    </LessonPage>
  );
};

export default BokehLesson;

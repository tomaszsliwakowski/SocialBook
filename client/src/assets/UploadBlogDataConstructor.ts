import { UploadedDataType } from "../components/BlogCreator/Attachment";
import { CreatorReducerType } from "../reducers/BlogCreatorReducer";
import { idGenerator } from "./assets";

export type CreatorDataType = {
  id: string;
  user_id: string;
  title: string;
  blogContent: (
    | {
        id: string;
        type: string;
        content: string | undefined;
        images: string[];
      }
    | {
        id: string;
        type: string;
        images: string[];
      }
    | {
        id: string;
        type: string;
        content: string | undefined;
      }
  )[];
  tags: string[];
  baner: string;
  miniature: string;
};

export default async function UploadBlogDataConstructor(
  state: CreatorReducerType,
  uploaded: UploadedDataType,
  user_id: string
) {
  if (!uploaded) return;
  //destructuring
  const { title, tags } = state;
  const baner = uploaded.baner;
  const miniature = uploaded.miniature;
  const content = state.blogContent;
  const paragraphs = [];
  //iteration and constructing paragraph
  for (let index = 0; index < content.length; index++) {
    const paragraph = content[index];
    if (paragraph.paragraphType !== "Text") {
      const id = paragraph.id;
      const images = uploaded.paragraphsImages.filter(
        (item) => item.id === id
      )[0];
      if (images.type === "TextAndImage") {
        paragraphs.push({
          id: paragraph.id,
          type: paragraph.paragraphType,
          content: paragraph.content,
          images: [...images.images],
        });
      } else if (images.type === "Image") {
        paragraphs.push({
          id: paragraph.id,
          type: paragraph.paragraphType,
          images: [...images.images],
        });
      }
    } else {
      paragraphs.push({
        id: paragraph.id,
        type: paragraph.paragraphType,
        content: paragraph.content,
      });
    }
  }
  //construct object
  const creatorData: CreatorDataType = {
    id: idGenerator(),
    user_id: user_id,
    title: title,
    blogContent: paragraphs,
    tags: tags,
    baner: baner,
    miniature: miniature,
  };
  return creatorData;
}

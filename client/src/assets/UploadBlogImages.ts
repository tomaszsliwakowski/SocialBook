import axios from "axios";
import { CreatorReducerType } from "../reducers/BlogCreatorReducer";

export type ImagesDataType = {
  id: string;
  images: string[];
  type: string;
};

export default async function uploadBlogImages(state: CreatorReducerType) {
  const banerData = state.baner;
  const miniatureDate = state.miniature;
  const blogContent = state.blogContent;
  if (!banerData || !miniatureDate) return;
  banerData.append("upload_preset", "yiotmaki");
  miniatureDate.append("upload_preset", "yiotmaki");
  //upload baner
  const baner: string = await callApi(banerData);
  //upload miniature
  const miniature: string = await callApi(miniatureDate);
  //destructuring and filter paragraph images
  const paragraphs = blogContent.filter(
    (item) =>
      item.paragraphType === "TextAndImage" || item.paragraphType === "Image"
  );
  const paragraphsImages = paragraphs.map((item) =>
    item.paragraphType === "TextAndImage"
      ? { id: item.id, type: "TextAndImage", image: item.image_0 }
      : {
          id: item.id,
          type: "Image",
          images: [item.image_0, item.image_1, item.image_2, item.image_3],
        }
  );
  //upload paragraph images and create object of uploaded images
  const imagesData: ImagesDataType[] = [];
  for (let index = 0; index < paragraphsImages.length; index++) {
    //image
    if (paragraphsImages[index].type === "TextAndImage") {
      //destructuring image
      const paragraph = paragraphsImages[index];
      let paragraphImage = paragraph.image;
      if (!paragraphImage) return;
      //upload image and add response url to array
      paragraphImage.append("upload_preset", "yiotmaki");
      let imageRes = await callApi(paragraphImage);
      //add uploaded paragraph image
      imagesData.push({
        id: paragraph.id,
        type: "TextAndImage",
        images: [imageRes],
      });
      //images
    } else if (paragraphsImages[index].type === "Image") {
      //destructuring and filter images
      const paragraph = paragraphsImages[index];
      let paragraphImages = paragraph.images?.filter(
        (item) => item !== undefined
      );
      if (!paragraphImages) return;
      let uploadedImages: string[] = [];
      //images iteration, upload and add response url to array
      for (let i = 0; i < paragraphImages.length; i++) {
        let item = paragraphImages[i];
        if (!item) return;
        item.append("upload_preset", "yiotmaki");
        const image = await callApi(item);
        uploadedImages.push(image);
      }
      //add uploaded paragraph images
      imagesData.push({
        id: paragraph.id,
        type: "Image",
        images: uploadedImages,
      });
    }
  }
  return { baner: baner, miniature: miniature, paragraphsImages: imagesData };
}

const callApi = async (content: FormData) => {
  const res: string = await axios
    .post("https://api.cloudinary.com/v1_1/dhte02cxo/image/upload", content)
    .then((res) => {
      const data = res.data;
      const { secure_url } = data;
      return secure_url;
    });
  return res;
};

import axios from "axios";
import { CreatorReducerType } from "../reducers/BlogCreatorReducer";

export type ImagesDataType =
  | {
      id: string;
      image: string;
    }
  | {
      id: string;
      images: string[];
    };

export default async function uploadBlogImages(state: CreatorReducerType) {
  //upload image
  const banerData = state.baner;
  const miniatureDate = state.miniature;
  const blogContent = state.blogContent;
  if (!banerData || !miniatureDate) return;
  banerData.append("upload_preset", "yiotmaki");
  miniatureDate.append("upload_preset", "yiotmaki");
  //upload baner
  const baner: string = await axios
    .post("https://api.cloudinary.com/v1_1/dhte02cxo/image/upload", banerData)
    .then((res) => {
      const data = res.data;
      const { secure_url } = data;
      return secure_url;
    });
  //upload miniature
  const miniature: string = await axios
    .post(
      "https://api.cloudinary.com/v1_1/dhte02cxo/image/upload",
      miniatureDate
    )
    .then((res) => {
      const data = res.data;
      const { secure_url } = data;
      return secure_url;
    });
  //filter paragraph images
  const paragraphs = blogContent.filter(
    (item) =>
      item.paragraphType === "TextAndImage" || item.paragraphType === "Image"
  );
  const paragraphsImages = paragraphs.map((item) =>
    item.paragraphType === "TextAndImage"
      ? { id: item.id, type: "image", image: item.image_0 }
      : {
          id: item.id,
          type: "images",
          images: [item.image_0, item.image_1, item.image_2, item.image_3],
        }
  );
  //upload paragraph images and create object of uploaded images
  const imagesData: ImagesDataType[] = [];
  for (let index = 0; index < paragraphsImages.length; index++) {
    if (paragraphsImages[index].type === "image") {
      const paragraph = paragraphsImages[index];
      let paragraphImage = paragraph.image;
      if (!paragraphImage) return;
      paragraphImage.append("upload_preset", "yiotmaki");
      let imageRes = await axios
        .post(
          "https://api.cloudinary.com/v1_1/dhte02cxo/image/upload",
          paragraphImage
        )
        .then((res) => {
          const data = res.data;
          const { secure_url } = data;
          return secure_url;
        });

      imagesData.push({ id: paragraph.id, image: imageRes });
    } else if (paragraphsImages[index].type === "images") {
      const paragraph = paragraphsImages[index];
      let paragraphImages = paragraph.images?.filter(
        (item) => item !== undefined
      );
      if (!paragraphImages) return;
      let uploadedImages = [];
      for (let i = 0; i < paragraphImages.length; i++) {
        let item = paragraphImages[i];
        if (!item) return;
        item.append("upload_preset", "yiotmaki");
        const image = await axios
          .post("https://api.cloudinary.com/v1_1/dhte02cxo/image/upload", item)
          .then((res) => {
            const data = res.data;
            const { secure_url } = data;
            return secure_url;
          });

        uploadedImages.push(image);
      }
      imagesData.push({ id: paragraph.id, images: uploadedImages });
    }
  }
  return { baner: baner, miniature: miniature, imagesData };
}

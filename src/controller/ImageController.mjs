export class ImageController {
  animations;
  constructor() {
    this.animations = {};
  }

  init(animations) {
    const promises = [];
    for (const animation of animations) {
      promises.push(
        new Promise(async (resolve) => {
          const anim = (this.animations[animation.name] = []);
          for (const sprite of animation.sprites) {
            const bitmap = await this.loadImage(sprite);
            if (bitmap) anim.push(bitmap);
          }
          resolve();
        })
      );
    }
    return Promise.all(promises).then();
  }

  loadImage(image_url) {
    return new Promise((resolve) => {
      var request = new XMLHttpRequest();
      request.open("GET", image_url, true);
      request.responseType = "blob";

      // Decode asynchronously
      request.onload = () => {
        if (request.status == 200) {
          resolve(createImageBitmap(request.response));
        } else {
          console.error(
            "Image didn't load successfully; error code: " + request.statusText
          );
          resolve();
        }
      };
      request.send();
    });
  }
}

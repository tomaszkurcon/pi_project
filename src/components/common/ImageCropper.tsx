import "cropperjs/dist/cropper.css";
import { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";

type TImageCropperProps = {
    src:string
}
const ImageCropper = ({src, ...props}:TImageCropperProps) => {
    const cropperRef = useRef<ReactCropperElement>(null);
    const onCrop = () => {
      const cropper = cropperRef.current?.cropper;
    //   console.log(cropper?.getCroppedCanvas().toDataURL());
    };
    return (
      <Cropper
        src={src}
        style={{ height: 400, width: "100%" }}
        aspectRatio={1}
        guides={false}
        crop={onCrop}
        zoomable={false}
        ref={cropperRef}
        
      />
    )
}

export default ImageCropper
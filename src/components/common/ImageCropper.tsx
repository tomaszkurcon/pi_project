import "cropperjs/dist/cropper.css";
import { Dispatch, SetStateAction, useRef } from "react";
import { Cropper, ReactCropperElement, ReactCropperProps } from "react-cropper";

type TImageCropperProps = {
    src:string,
    setBase64:Dispatch<SetStateAction<string | ArrayBuffer | undefined>>
} & ReactCropperProps
const ImageCropper = ({src, setBase64, ...props}:TImageCropperProps) => {
    const cropperRef = useRef<ReactCropperElement>(null);
    const onCrop = () => {
      const cropper = cropperRef.current?.cropper;
      setBase64(cropper?.getCroppedCanvas().toDataURL())
 
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
        {...props}
      />
    )
}

export default ImageCropper
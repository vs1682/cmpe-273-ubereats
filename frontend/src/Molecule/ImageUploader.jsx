import React, { useState } from 'react';
import { useStyletron } from 'baseui';
import { FileUploader } from "baseui/file-uploader";
import {Button, KIND, SHAPE} from 'baseui/button';
import Upload from 'baseui/icon/upload';

const ImageUploader = ({ onUpload }) => {
  const [css] = useStyletron();
  const [src, setSrc] = useState(null);

  return (
    <div className={css({
      position: 'relative',
      display: 'inline-flex'
    })}>
      <FileUploader
        // onCancel={stopFakeProgress}
        onDrop={(acceptedFiles) => {
          setSrc(URL.createObjectURL(acceptedFiles[0]));
          onUpload(acceptedFiles[0]);
        }}
        overrides={{
          FileDragAndDrop: {
            style: () => ({
              justifyContent: 'center',
              minHeight: '200px',
              minWidth: '200px',
              width: '120px'
            })
          },
          ContentMessage: {
            component: () => src && (
              <img
                src={src}
                className={css({
                  width: '200px',
                  height: 'auto',
                  objectFit: 'contain'
                })}
              />
            )
          },
          ButtonComponent: {
            component: props => (
              <Button {...props} kind={KIND.primary} shape={SHAPE.circle}>
                <Upload />
              </Button>
            )
          }
        }}
      />
    </div>
  );
}

export default ImageUploader;

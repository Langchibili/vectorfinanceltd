'use client'

import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { api_url, getJwt, log } from '@/Constants';

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

export default function Uploader(props) {
  const maxFileSize = '20MB'; // 10MB limit for upload


  const handleProcess = async (fieldName, file, metadata, load, error, progress, abort) => {
    const formData = new FormData();
    formData.append(props.allowMultiple ? 'files[]' : 'files', file);
    formData.append('refId', props.refId.toString());
    formData.append('ref', props.refName);
    formData.append('field', props.fieldName);

    const request = new XMLHttpRequest();
    request.open('POST', `${api_url}/upload`);
    request.setRequestHeader('Authorization', `Bearer ${getJwt()}`);

    request.upload.onprogress = (e) => {
      progress(e.lengthComputable, e.loaded, e.total);
    };

    request.onload = async function () {
      if (request.status >= 200 && request.status < 300) {
        if(props.addFiles){ // means a user is updating their profile pic
          const responseData = await JSON.parse(request.responseText)
          props.addFiles(responseData)
          load(request.responseText)
          return
        }

        // if (props.addMediaOnUpload) {
        //   props.addMediaOnUpload();
        // }
        load(request.responseText);
      } else {
        error('Upload failed');
      }
    };

    request.onerror = () => error('Upload error');
    request.onabort = () => abort();

    request.send(formData);

    return {
      abort: () => {
        request.abort();
        abort();
      },
    };
  };

  const uploaderClassName = props.displayType === 'circular' ? 'filepond--circle' : '';

  return (
    <FilePond
      className={uploaderClassName}
      allowMultiple={props.allowMultiple}
      maxFileSize={maxFileSize}
      acceptedFileTypes={props.allowedTypes}
      server={{
        url: `${api_url}/upload`,
        process: handleProcess,
      }}
      // onaddfile={(error, file) => checkFileDimensions(file.file)} // Call checkFileDimensions only for videos/images
      stylePanelLayout={props.displayType}
    />
  );
}

import React from "react";
import Download from "@mui/icons-material/Download"; // or your icon import

const getFileUrl = (file, backEndUrl) => {
  // Handles various Strapi file object shapes
  if (!file) return null;

  // If file is an array, use the first item
  if (Array.isArray(file)) file = file[0];

  // Drill down to the actual file object if nested
  let actualFile = file;
  if (file.data) actualFile = file.data;
  if (actualFile.attributes) actualFile = actualFile.attributes;
  if (actualFile.media) actualFile = actualFile.media;
  if (actualFile.data) actualFile = actualFile.data;
  if (actualFile.attributes) actualFile = actualFile.attributes;

  // Get the URL and name
  const url = actualFile.url ? backEndUrl + actualFile.url : null;
  const name = actualFile.name || actualFile.fileDisplayName || "Download";

  return { url, name };
};

const FileDownload = ({ files, backEndUrl, fileDisplayName }) => {
  // Normalize files to array
  let fileArray = [];
  if (!files) return null;
  if (Array.isArray(files)) {
    fileArray = files;
  } else if (files.data && Array.isArray(files.data)) {
    fileArray = files.data;
  } else if (files.data) {
    fileArray = [files.data];
  } else {
    fileArray = [files];
  }

  return (
    <div>
      {fileArray.map((file, idx) => {
        const { url, name } = getFileUrl(file, backEndUrl) || {};
        if (!url) return null;
        return (
          <a
            key={file.id || idx}
            href={url}
            download={fileDisplayName || name}
            className="btn btn-danger mb-2"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <Download style={{ marginRight: 8 }} />
            Download {fileDisplayName || name}
          </a>
        );
      })}
    </div>
  );
};

export default FileDownload;
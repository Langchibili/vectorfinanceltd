import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Button } from '@mui/material'
import { getImage } from '@/Functions'
import Uploader from '../Uploader/Uploader'
import { backEndUrl } from '@/Constants'

const CollateralMedia = ({ mediaSlots, media, onAdd, onRemove, refId }) => {
    return (
    <Box>
        {mediaSlots.map((slot) => {
        // grab the uploaded file attrs (if any)
        const file = media[slot]?.attributes ?? null;
        const isImage = file?.mime?.startsWith("image/") ?? false;
        const url = isImage
            ? getImage(file, "thumbnail")
            : backEndUrl + (file?.url ?? "");

        return (
            <Box key={slot} mb={3}>
            <Typography variant="subtitle1" gutterBottom>
                {slot.charAt(0).toUpperCase() + slot.slice(1)}
            </Typography>

            <Uploader
                addFiles={(files) => onAdd(slot, files)}
                displayType="grid"
                refId={refId}
                refName="media-and-documents.collateral"
                fieldName="CollateralMedia"
                allowMultiple={false}
                allowedTypes={["image/*", "application/pdf"]}
            />

            <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {file && (
                <Box position="relative">
                    {isImage ? (
                    <Box
                        component="img"
                        src={url}
                        alt={file.name}
                        sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 1 }}
                    />
                    ) : (
                    <Box sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1 }}>
                        <Typography variant="caption">{file.name}</Typography>
                    </Box>
                    )}
                    <Button
                    size="small"
                    onClick={() => onRemove(slot, media[slot].id)}
                    sx={{ position: "absolute", top: 2, right: 2 }}
                    >
                    Remove
                    </Button>
                </Box>
                )}
            </Box>
            </Box>
        );
        })}
    </Box>
    )
}

CollateralMedia.propTypes = {
  mediaSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
  media: PropTypes.objectOf(PropTypes.array).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  refId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default CollateralMedia
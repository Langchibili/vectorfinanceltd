// FormSkeleton.jsx (or inside the same file)
import React from "react";
import { Skeleton, Box, Paper, Grid } from "@mui/material";

const FormSkeleton = () => {
    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
            {/* Form title skeleton */}
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 3 }} />

            {/* Loop for form fields */}
            {[...Array(6)].map((_, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                    <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
                    <Skeleton variant="rounded" width="100%" height={56} />
                </Box>
            ))}

            {/* Action buttons skeleton */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item>
                    <Skeleton variant="rounded" width={100} height={36} />
                </Grid>
                <Grid item>
                    <Skeleton variant="rounded" width={100} height={36} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FormSkeleton;
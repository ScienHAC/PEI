import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Autocomplete,
    LinearProgress,
    Snackbar,
    Alert,
    styled
} from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

const StyledForm = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(4),
    background: "linear-gradient(145deg, #f3f4f6 0%, #ffffff 100%)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.shape.borderRadius * 2,
    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.primary.light,
            borderRadius: theme.shape.borderRadius,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.dark,
        },
    },
}));

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const ResearchPaperForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        authors: [],
        abstract: "",
        file: null,
    });
    const [errors, setErrors] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setFormData({ ...formData, file });
            setErrors({ ...errors, file: "" });
        } else {
            setErrors({ ...errors, file: "Please upload a PDF file." });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (formData.authors.length === 0) newErrors.authors = "At least one author is required";
        if (!formData.abstract.trim()) newErrors.abstract = "Abstract is required";
        if (!formData.file) newErrors.file = "Please upload a PDF file";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            // Simulate file upload
            for (let i = 0; i <= 100; i += 10) {
                setUploadProgress(i);
                await new Promise((resolve) => setTimeout(resolve, 200));
            }
            setSnackbar({ open: true, message: "Research paper submitted successfully!", severity: "success" });
            // Reset form
            setFormData({ title: "", authors: [], abstract: "", file: null });
            setUploadProgress(0);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <StyledForm component="form" onSubmit={handleSubmit} elevation={3}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                Publish Research Paper
            </Typography>

            <StyledTextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
                required
                inputProps={{ "aria-label": "Research paper title" }}
            />

            {/* Alert box that informs users they can add authors by pressing Enter */}
            <Alert severity="info" sx={{ mb: 2 }}>
                You can add authors by pressing "Enter" and add multiple authors.
            </Alert>

            <Autocomplete
                multiple
                options={[]}  // No suggestions provided
                freeSolo
                renderInput={(params) => (
                    <StyledTextField
                        {...params}
                        label="Authors"
                        error={!!errors.authors}
                        helperText={errors.authors}
                        required
                        inputProps={{ ...params.inputProps, "aria-label": "Authors" }}
                    />
                )}
                value={formData.authors}
                onChange={(event, newValue) => {
                    setFormData({ ...formData, authors: newValue });
                    setErrors({ ...errors, authors: "" });
                }}
            />

            <StyledTextField
                fullWidth
                label="Abstract"
                name="abstract"
                value={formData.abstract}
                onChange={handleInputChange}
                error={!!errors.abstract}
                helperText={errors.abstract}
                required
                multiline
                rows={4}
                inputProps={{ "aria-label": "Research paper abstract" }}
            />

            <Box sx={{ mb: 2 }}>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<FaCloudUploadAlt />}
                    sx={{ mt: 2 }}
                >
                    Upload PDF
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        aria-label="Upload PDF file"
                    />
                </Button>
                {formData.file && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        File: {formData.file.name}
                    </Typography>
                )}
                {errors.file && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {errors.file}
                    </Typography>
                )}
            </Box>

            {uploadProgress > 0 && (
                <Box sx={{ width: "100%", mb: 2 }}>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                </Box>
            )}

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Submit Paper
            </Button>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </StyledForm>
    );
};

export default ResearchPaperForm;

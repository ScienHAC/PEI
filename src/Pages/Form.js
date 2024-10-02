import React, { useState, useCallback } from "react";
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
import { useDropzone } from "react-dropzone"; // Import dropzone

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

    // useDropzone hook for drag-and-drop functionality
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type === "application/pdf") {
            setFormData({ ...formData, file });
            setErrors({ ...errors, file: "" });
        } else {
            setErrors({ ...errors, file: "Please upload a PDF file." });
        }
    }, [formData, errors]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'application/pdf': ['.pdf']
        },
        onDrop,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.abstract.trim()) newErrors.abstract = "Abstract is required";
        if (formData.authors.length === 0) newErrors.authors = "At least one author is required";
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

            console.log(formData);
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

            <Alert severity="info" sx={{ mb: 2 }}>
                You can add authors by pressing "Enter" and add multiple authors.
            </Alert>

            <Autocomplete
                multiple
                freeSolo
                options={[]}  // No suggestions provided
                renderInput={(params) => (
                    <StyledTextField
                        {...params}
                        label="Authors"
                        error={!!errors.authors}
                        helperText={errors.authors}
                        // Remove the required attribute
                        inputProps={{ ...params.inputProps, "aria-label": "Authors" }}
                    />
                )}
                value={formData.authors}
                onChange={(event, newValue) => {
                    const filteredAuthors = newValue.filter((author) => author.trim() !== "");
                    setFormData({ ...formData, authors: filteredAuthors });
                    setErrors({ ...errors, authors: "" });
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && event.target.value.trim() !== "") {
                        event.preventDefault();
                        const newAuthor = event.target.value.trim();
                        if (!formData.authors.includes(newAuthor)) {
                            setFormData({ ...formData, authors: [...formData.authors, newAuthor] });
                        }
                    }
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
                <div {...getRootProps()} style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer'
                }}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <Typography variant="body2">Drop the PDF here...</Typography>
                    ) : (
                        <Typography variant="body2">Drag 'n' drop a PDF file here, or click to select one</Typography>
                    )}
                </div>
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

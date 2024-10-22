import React, { useState, useCallback } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    LinearProgress,
    Snackbar,
    Alert,
    styled,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
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
        author: "",
        contactNumber: "",
        abstract: "",
        articleType: "",
        journal: "",
        country: "",
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
        if (!formData.author.trim()) newErrors.author = "Author is required";
        if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
        if (!formData.abstract.trim()) newErrors.abstract = "Abstract is required";
        if (!formData.articleType) newErrors.articleType = "Article type is required";
        if (!formData.journal) newErrors.journal = "Journal is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.file) newErrors.file = "Please upload a PDF file";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // ** Handle form submission**
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formDataToSend = new FormData(); // Create FormData object to handle files

            // Append all form fields to FormData
            formDataToSend.append("title", formData.title);
            formDataToSend.append("author", formData.author);
            formDataToSend.append("contactNumber", formData.contactNumber);
            formDataToSend.append("abstract", formData.abstract);
            formDataToSend.append("articleType", formData.articleType);
            formDataToSend.append("journal", formData.journal);
            formDataToSend.append("country", formData.country);
            formDataToSend.append("file", formData.file); // Append file

            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/submit-paper`, {
                    method: "POST",
                    body: formDataToSend,
                    credentials: "include",
                });

                if (response.ok) {
                    setSnackbar({
                        open: true,
                        message: "Research paper submitted successfully!",
                        severity: "success",
                    });
                    setFormData({
                        title: "",
                        author: "",
                        contactNumber: "",
                        abstract: "",
                        articleType: "",
                        journal: "",
                        country: "",
                        file: null,
                    });
                    setUploadProgress(0);
                } else {
                    const errorData = await response.json();
                    setSnackbar({
                        open: true,
                        message: errorData.message || "Failed to submit the research paper",
                        severity: "error",
                    });
                }
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: "An error occurred. Please try again.",
                    severity: "error",
                });
                console.error("Submission error:", error);
            }
        }
    };
    //** end of this submission function**

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <br />
            <StyledForm component="form" onSubmit={handleSubmit} elevation={3}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                    Research Archives Submission
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

                <StyledTextField
                    fullWidth
                    label="Author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    error={!!errors.author}
                    helperText={errors.author}
                    required
                    inputProps={{ "aria-label": "Author" }}
                />

                <StyledTextField
                    fullWidth
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                    required
                    inputProps={{ "aria-label": "Contact number" }}
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

                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <InputLabel id="article-type-label">Select Article Type</InputLabel>
                    <Select
                        labelId="article-type-label"
                        value={formData.articleType}
                        onChange={handleInputChange}
                        name="articleType"
                        label="Article Type"
                        error={!!errors.articleType}
                    >
                        <MenuItem value="commentary">Commentary</MenuItem>
                        <MenuItem value="research">Research Article</MenuItem>
                    </Select>
                    {errors.articleType && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errors.articleType}
                        </Typography>
                    )}
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <InputLabel id="journal-label">Select Journal</InputLabel>
                    <Select
                        labelId="journal-label"
                        value={formData.journal}
                        onChange={handleInputChange}
                        name="journal"
                        label="Journal"
                        error={!!errors.journal}
                    >
                        <MenuItem value="globalJournalSurgery">Global Journal of Surgery</MenuItem>
                        <MenuItem value="globalJournalPharma">Global Journal of Pharmaceuticals</MenuItem>
                    </Select>
                    {errors.journal && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errors.journal}
                        </Typography>
                    )}
                </FormControl>

                <StyledTextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    error={!!errors.country}
                    helperText={errors.country}
                    required
                    inputProps={{ "aria-label": "Country" }}
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
        </>
    );
};

export default ResearchPaperForm;

import React, { useState, useCallback } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    LinearProgress,
    Snackbar,
    Autocomplete,
    Alert,
    styled,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Country } from "../Components/CountryNames";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import TemplatePaper from "../template/TemplatePaper.pdf";

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
        author: [],
        contactNumber: "",
        abstract: "",
        articleType: "",
        journal: "",
        country: "",
        file: null,
    });

    const [errors, setErrors] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [suggestions, setSuggestions] = useState([]);

    // useDropzone hook for drag-and-drop functionality
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setFormData({ ...formData, file });
            setErrors({ ...errors, file: "" });

            // Show file size info
            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
            console.log(`File selected: ${file.name} (${fileSizeMB} MB)`);
        } else {
            setErrors({ ...errors, file: "Please upload a PDF or DOCX file." });
        }
    }, [formData, errors]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        onDrop,
        disabled: isSubmitting, // Disable during submission
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handlePhoneChange = (value, data, event, formattedValue) => {
        setFormData((prev) => ({ ...prev, contactNumber: formattedValue || value }));
        setErrors((prev) => ({ ...prev, contactNumber: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.author || formData.author.length === 0) newErrors.author = "At least one author is required";
        if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
        if (!formData.abstract.trim()) newErrors.abstract = "Abstract is required";
        if (!formData.articleType) newErrors.articleType = "Article type is required";
        if (!formData.journal) newErrors.journal = "Journal is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.file) newErrors.file = "Please upload a PDF or DOCX file";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission with file upload progress
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.author.length === 0) {
            setSnackbar({
                open: true,
                message: "Please add at least one author before submitting.",
                severity: "error",
            });
            return;
        }

        if (!validateForm()) {
            setSnackbar({
                open: true,
                message: "Please fill in all required fields correctly.",
                severity: "error",
            });
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("author", formData.author.join(', '));
        formDataToSend.append("contactNumber", formData.contactNumber);
        formDataToSend.append("abstract", formData.abstract);
        formDataToSend.append("articleType", formData.articleType);
        formDataToSend.append("journal", formData.journal);
        formDataToSend.append("country", formData.country);
        formDataToSend.append("file", formData.file);

        try {
            // Show file size info to user
            const fileSizeMB = (formData.file.size / (1024 * 1024)).toFixed(2);
            console.log(`Uploading file: ${formData.file.name} (${fileSizeMB} MB)`);

            const xhr = new XMLHttpRequest();

            // Track upload progress
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    setUploadProgress(percentComplete);
                }
            };

            // Handle completion
            xhr.onload = () => {
                if (xhr.status === 200 || xhr.status === 201) {
                    const response = JSON.parse(xhr.responseText);
                    setSnackbar({
                        open: true,
                        message: response.message || "Research paper submitted successfully! You will receive a confirmation email shortly.",
                        severity: "success",
                    });

                    // Reset form
                    setFormData({
                        title: "",
                        author: [],
                        contactNumber: "",
                        abstract: "",
                        articleType: "",
                        journal: "",
                        country: "",
                        file: null,
                    });
                    setUploadProgress(0);
                } else {
                    const errorData = JSON.parse(xhr.responseText);
                    setSnackbar({
                        open: true,
                        message: errorData.message || "Failed to submit the research paper. Please try again.",
                        severity: "error",
                    });
                }
                setIsSubmitting(false);
            };

            // Handle errors
            xhr.onerror = () => {
                setSnackbar({
                    open: true,
                    message: "Network error occurred. Please check your connection and try again.",
                    severity: "error",
                });
                setIsSubmitting(false);
                setUploadProgress(0);
            };

            // Handle timeout
            xhr.ontimeout = () => {
                setSnackbar({
                    open: true,
                    message: "Upload timeout. Please try again with a smaller file or check your connection.",
                    severity: "error",
                });
                setIsSubmitting(false);
                setUploadProgress(0);
            };

            // Set timeout (10 minutes for large files)
            xhr.timeout = 600000;

            // Open connection and send
            xhr.open("POST", `${process.env.REACT_APP_hostURL}/auth/submit-paper`, true);
            xhr.withCredentials = true;
            xhr.send(formDataToSend);

        } catch (error) {
            console.error("Submission error:", error);
            setSnackbar({
                open: true,
                message: "An unexpected error occurred. Please try again.",
                severity: "error",
            });
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbar({ ...snackbar, open: false });
    };

    const getFileSizeDisplay = () => {
        if (formData.file) {
            const fileSizeMB = (formData.file.size / (1024 * 1024)).toFixed(2);
            let sizeColor = "green";
            let sizeWarning = "";

            if (formData.file.size > 50 * 1024 * 1024) { // > 50MB
                sizeColor = "red";
                sizeWarning = " (Large file - upload may take longer)";
            } else if (formData.file.size > 10 * 1024 * 1024) { // > 10MB
                sizeColor = "orange";
                sizeWarning = " (Medium file size)";
            }

            return (
                <Typography variant="body2" sx={{ mt: 1, color: sizeColor }}>
                    File: {formData.file.name} ({fileSizeMB} MB){sizeWarning}
                </Typography>
            );
        }
        return null;
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
                    disabled={isSubmitting}
                    inputProps={{ "aria-label": "Research paper title" }}
                />

                <Alert severity="info" sx={{ mb: 2 }}>
                    Press "Enter" to add authors. You can add multiple authors.
                </Alert>

                <Autocomplete
                    multiple
                    freeSolo
                    options={suggestions}
                    disabled={isSubmitting}
                    renderInput={(params) => (
                        <StyledTextField
                            {...params}
                            label="Author"
                            error={!!errors.author}
                            helperText={errors.author}
                            inputProps={{ ...params.inputProps, "aria-label": "Author" }}
                        />
                    )}
                    value={formData.author}
                    onChange={(event, newValue) => {
                        const filteredAuthors = newValue
                            .map((author) => author.trim())
                            .filter((author) => author !== "");
                        setFormData({ ...formData, author: filteredAuthors });
                        setErrors({ ...errors, author: "" });
                    }}
                    onInputChange={(event, newInputValue) => {
                        if (newInputValue.trim() !== "") {
                            const filteredSuggestions = [newInputValue];
                            setSuggestions(filteredSuggestions);
                        } else {
                            setSuggestions([]);
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && event.target.value.trim() !== "") {
                            event.preventDefault();
                            const newAuthor = event.target.value.trim();
                            if (!formData.author.includes(newAuthor)) {
                                setFormData({ ...formData, author: [...formData.author, newAuthor] });
                            }
                        }
                    }}
                />

                <PhoneInput
                    country={"in"}
                    value={formData.contactNumber}
                    onChange={(value, data, event, formattedValue) => handlePhoneChange(value, data, event, formattedValue)}
                    disabled={isSubmitting}
                    inputProps={{
                        name: "contactNumber",
                        required: true,
                    }}
                    enableSearch
                    countryCodeEditable={false}
                    containerStyle={{ width: "100%", marginBottom: "16px" }}
                    inputStyle={{
                        width: "100%",
                        height: "45px",
                        fontSize: "16px",
                        opacity: isSubmitting ? 0.6 : 1,
                    }}
                />

                {errors.contactNumber && (
                    <Typography color="error" variant="body2">
                        {errors.contactNumber}
                    </Typography>
                )}

                <StyledTextField
                    fullWidth
                    label="Abstract"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleInputChange}
                    error={!!errors.abstract}
                    helperText={errors.abstract}
                    required
                    disabled={isSubmitting}
                    multiline
                    rows={4}
                    inputProps={{ "aria-label": "Research paper abstract" }}
                />

                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} disabled={isSubmitting}>
                    <InputLabel id="article-type-label">Select Article Type</InputLabel>
                    <Select
                        labelId="article-type-label"
                        value={formData.articleType}
                        onChange={handleInputChange}
                        name="articleType"
                        label="Article Type"
                        error={!!errors.articleType}
                    >
                        <MenuItem value="Research Article">Research Article</MenuItem>
                        <MenuItem value="Review Article">Review Article</MenuItem>
                        <MenuItem value="Technical Note">Technical Note</MenuItem>
                        <MenuItem value="Case Study">Case Study</MenuItem>
                        <MenuItem value="Methodology">Methodology Article</MenuItem>
                        <MenuItem value="Design Study">Design Study</MenuItem>
                        <MenuItem value="Project Report">Project Report</MenuItem>
                        <MenuItem value="Short Communication">Short Communication</MenuItem>
                    </Select>
                    {errors.articleType && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errors.articleType}
                        </Typography>
                    )}
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} disabled={isSubmitting}>
                    <InputLabel id="journal-label">Select Journal</InputLabel>
                    <Select
                        labelId="journal-label"
                        value={formData.journal}
                        onChange={handleInputChange}
                        name="journal"
                        label="Journal"
                        error={!!errors.journal}
                    >
                        <MenuItem value="Journal of Mechanical Engineering">Journal of Mechanical Engineering</MenuItem>
                        <MenuItem value="Journal of Electrical Engineering">Journal of Electrical Engineering</MenuItem>
                        <MenuItem value="Journal of Civil Engineering">Journal of Civil Engineering</MenuItem>
                        <MenuItem value="Journal of Computer Engineering">Journal of Computer Engineering</MenuItem>
                        <MenuItem value="Journal of Chemical Engineering">Journal of Chemical Engineering</MenuItem>
                        <MenuItem value="Journal of Aerospace Engineering">Journal of Aerospace Engineering</MenuItem>
                        <MenuItem value="Journal of Environmental Engineering">Journal of Environmental Engineering</MenuItem>
                        <MenuItem value="Journal of Industrial Engineering">Journal of Industrial Engineering</MenuItem>
                        <MenuItem value="Journal of Materials Engineering">Journal of Materials Engineering</MenuItem>
                        <MenuItem value="Journal of Biomedical Engineering">Journal of Biomedical Engineering</MenuItem>
                        <MenuItem value="Journal of Software Engineering">Journal of Software Engineering</MenuItem>
                        <MenuItem value="Journal of Robotics Engineering">Journal of Robotics Engineering</MenuItem>
                    </Select>
                    {errors.journal && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errors.journal}
                        </Typography>
                    )}
                </FormControl>

                <Autocomplete
                    fullWidth
                    options={Country}
                    getOptionLabel={(option) => option}
                    disabled={isSubmitting}
                    renderInput={(params) => (
                        <StyledTextField
                            {...params}
                            label="Country"
                            name="country"
                            error={!!errors.country}
                            helperText={errors.country}
                            required
                            inputProps={{
                                ...params.inputProps,
                                "aria-label": "Search Country",
                                autoComplete: "off",
                            }}
                        />
                    )}
                    onChange={(event, value) => {
                        setFormData({ ...formData, country: value || "" });
                        setErrors({ ...errors, country: "" });
                    }}
                    value={formData.country || null}
                    disableClearable
                    ListboxProps={{
                        style: {
                            maxHeight: "200px",
                            overflowY: "auto",
                        },
                    }}
                    noOptionsText="No countries found"
                />

                <Box sx={{ mb: 2 }}>
                    <div {...getRootProps()} style={{
                        border: '2px dashed #ccc',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.6 : 1,
                        backgroundColor: isSubmitting ? '#f5f5f5' : 'transparent'
                    }}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <Typography variant="body2">Drop the file here...</Typography>
                        ) : (
                            <Typography variant="body2">
                                {isSubmitting
                                    ? "Uploading... Please wait"
                                    : "Drag 'n' drop a PDF or DOCX file here, or click to select one"
                                }
                            </Typography>
                        )}
                    </div>

                    {getFileSizeDisplay()}

                    {errors.file && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errors.file}
                        </Typography>
                    )}
                </Box>

                {/* Upload Progress Bar */}
                {isSubmitting && (
                    <Box sx={{ width: "100%", mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                            <Typography variant="body2" color="primary">
                                Uploading... {Math.round(uploadProgress)}%
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={uploadProgress}
                            sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            Please don't close this page while uploading
                        </Typography>
                    </Box>
                )}

                <div className="d-flex justify-content-end">
                    <a
                        href={TemplatePaper}
                        className="btn btn-link"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            pointerEvents: isSubmitting ? 'none' : 'auto',
                            opacity: isSubmitting ? 0.6 : 1
                        }}
                    >
                        View Template/Instructions
                    </a>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                        mt: 2,
                        position: 'relative',
                        minHeight: '48px'
                    }}
                >
                    {isSubmitting ? (
                        <>
                            <CircularProgress size={24} sx={{ mr: 1 }} />
                            Uploading Paper... {Math.round(uploadProgress)}%
                        </>
                    ) : (
                        "Submit Paper"
                    )}
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

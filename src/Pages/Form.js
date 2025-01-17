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
} from "@mui/material";
import { useDropzone } from "react-dropzone";
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
        // author: "",
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
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [suggestions, setSuggestions] = useState([]);

    // useDropzone hook for drag-and-drop functionality
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setFormData({ ...formData, file });
            setErrors({ ...errors, file: "" });
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
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        // if (!formData.author.trim()) newErrors.author = "Author is required";
        if (!formData.author) newErrors.author = "Author is required";
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
            const formDataToSend = new FormData();

            // Append all form fields to FormData
            formDataToSend.append("title", formData.title);
            // formDataToSend.append("author", formData.author);
            formDataToSend.append("author", formData.author.join(', '));
            formDataToSend.append("contactNumber", formData.contactNumber);
            formDataToSend.append("abstract", formData.abstract);
            formDataToSend.append("articleType", formData.articleType);
            formDataToSend.append("journal", formData.journal);
            formDataToSend.append("country", formData.country);
            formDataToSend.append("file", formData.file);

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

                    console.log(formData);

                    setFormData({
                        title: "",
                        // author: "",
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

                {/* add multiple author code */}

                <Alert severity="info" sx={{ mb: 2 }}>
                    You can add authors by pressing "Enter" and add multiple authors.
                </Alert>

                <Autocomplete
                    multiple
                    freeSolo
                    options={suggestions}
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



                {/* <StyledTextField
                    fullWidth
                    label="Author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    error={!!errors.author}
                    helperText={errors.author}
                    required
                    inputProps={{ "aria-label": "Author" }}
                /> */}

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
                            <Typography variant="body2">Drop the file here...</Typography>
                        ) : (
                            <Typography variant="body2">Drag 'n' drop a PDF or DOCX file here, or click to select one</Typography>
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

                <div className="d-flex justify-content-end">
                    <a href={TemplatePaper} className="btn btn-link" target="_blank" rel="noreferrer">
                        View Template/Instructions
                    </a>
                </div>

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

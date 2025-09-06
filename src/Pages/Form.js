/*
====================================================================
 ORIGINAL SUBMISSION FORM (COMMENTED OUT AS PER REQUEST)
 Keeping for reference without altering any logic. New international
 standard form implementation is appended below.
====================================================================
The entire previous component code (imports, state, handlers, JSX) has
been removed from execution and preserved in repository history. If you
need to reinstate it, retrieve an earlier commit or uncomment this block.
====================================================================
*/

// New International Standard Manuscript Submission Form
import React, { useState } from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    LinearProgress,
    Checkbox,
    FormControlLabel,
    IconButton,
    Divider,
    Snackbar,
    Alert,
    MenuItem,
    Chip,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Article types (per required list)
const articleTypes = [
    "Research Article",
    "Review Article",
    "Technical Note",
    "Case Study",
    "Methodology Article",
    "Design Study",
    "Project Report",
    "Short Communication"
];

// Journal list (select options)
const journalOptions = [
    "Journal of Mechanical Engineering",
    "Journal of Electrical Engineering",
    "Journal of Civil Engineering",
    "Journal of Computer Engineering",
    "Journal of Chemical Engineering",
    "Journal of Aerospace Engineering",
    "Journal of Environmental Engineering",
    "Journal of Industrial Engineering",
    "Journal of Materials Engineering",
    "Journal of Biomedical Engineering",
    "Journal of Software Engineering",
    "Journal of Robotics Engineering"
];

const emptyAuthor = () => ({ firstName: "", lastName: "", email: "", affiliation: "", orcid: "" });

const InternationalSubmissionForm = () => {
    const [authors, setAuthors] = useState([emptyAuthor()]);
    const [correspondingAuthorIndex, setCorrespondingAuthorIndex] = useState(0);
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [keywords, setKeywords] = useState([]); // array of strings
    const [keywordInput, setKeywordInput] = useState("");
    const [articleType, setArticleType] = useState("");
    const [manuscriptFile, setManuscriptFile] = useState(null);
    const [coverLetterFile, setCoverLetterFile] = useState(null);
    const [journal, setJournal] = useState("");
    const [funding, setFunding] = useState("");
    const [conflictOfInterest, setConflictOfInterest] = useState("");
    const [ethicsApproved, setEthicsApproved] = useState(false);
    const [ethicsDetails, setEthicsDetails] = useState("");
    const [acknowledgements, setAcknowledgements] = useState("");
    const [suggestedReviewers, setSuggestedReviewers] = useState("");
    const [opposedReviewers, setOpposedReviewers] = useState("");
    const [consent, setConsent] = useState(false);
    const [progress, setProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [errors, setErrors] = useState({});
    const [showPreview, setShowPreview] = useState(false);

    // Helpers
    const updateAuthor = (idx, field, value) => {
        setAuthors(prev => prev.map((a, i) => i === idx ? { ...a, [field]: value } : a));
    };

    const addAuthor = () => setAuthors(prev => [...prev, emptyAuthor()]);
    const removeAuthor = (idx) => {
        if (authors.length === 1) return; // keep at least one
        setAuthors(prev => prev.filter((_, i) => i !== idx));
        if (correspondingAuthorIndex === idx) setCorrespondingAuthorIndex(0);
    };

    const validate = () => {
        const e = {};
        if (!title.trim()) e.title = "Title required";
        if (!articleType) e.articleType = "Select article type";
    if (!abstract.trim() || abstract.trim().split(/\s+/).length < 50) e.abstract = "Abstract min 50 words";
        if (keywords.length < 3) e.keywords = "Min 3 keywords";
    if (!journal) e.journal = "Select journal";
        authors.forEach((a, i) => {
            if (!a.firstName.trim() || !a.lastName.trim()) e[`author_${i}`] = "Name required";
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a.email)) e[`authorEmail_${i}`] = "Valid email required";
            if (!a.affiliation.trim()) e[`authorAff_${i}`] = "Affiliation required";
        });
        if (!manuscriptFile) e.manuscriptFile = "Manuscript required (PDF/DOCX)";
        if (!consent) e.consent = "Consent required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleFile = (setter) => (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const ok = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"].includes(file.type);
        if (!ok) {
            setSnackbar({ open: true, message: "Only PDF or DOC/DOCX allowed", severity: "error" });
            return;
        }
        setter(file);
    };

    const addKeyword = () => {
        const k = keywordInput.trim();
        if (k && !keywords.includes(k)) setKeywords(prev => [...prev, k]);
        setKeywordInput("");
    };

    const removeKeyword = (k) => setKeywords(prev => prev.filter(x => x !== k));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            setSnackbar({ open:true, message:'Please fix highlighted validation errors.', severity:'error'});
            return;
        }
        // Show preview dialog instead of submitting directly
        setShowPreview(true);
    };

    const handleConfirmSubmit = async () => {
        setShowPreview(false);
        setSubmitting(true);
        setProgress(5); // show immediate progress feedback
        const apiBase = process.env.REACT_APP_hostURL || 'http://localhost:8080';
        const endpoint = apiBase.replace(/\/?$/, '') + '/api/submission';

        const metadata = {
            title,
            articleType,
            journal,
            abstract,
            keywords,
            authors,
            correspondingAuthorIndex,
            declarations: {
                funding,
                conflictOfInterest,
                ethicsApproved,
                ethicsDetails: ethicsApproved ? ethicsDetails : "",
                acknowledgements,
            },
            reviewerSuggestions: {
                suggested: suggestedReviewers.split(/\n+/).map(s => s.trim()).filter(Boolean),
                opposed: opposedReviewers.split(/\n+/).map(s => s.trim()).filter(Boolean)
            }
        };

    const fd = new FormData();
    // Append metadata as plain text so Multer treats it as a text field (avoids Unexpected field error)
    fd.append('metadata', JSON.stringify(metadata));
        fd.append('manuscript', manuscriptFile);
        if (coverLetterFile) fd.append('coverLetter', coverLetterFile);

        try {
            console.log('[Submission] POST', endpoint, metadata); // debug
            await axios.post(endpoint, fd, {
                headers: { 'Accept': 'application/json' },
                onUploadProgress: (evt) => {
                    if (!evt.total) return;
                    const percent = Math.round((evt.loaded / evt.total) * 100);
                    setProgress(percent > 99 ? 99 : percent);
                },
                withCredentials: false
            });
            setProgress(100);
            setSnackbar({ open: true, message: 'Manuscript submitted successfully', severity: 'success' });
            // Reset form
            setAuthors([emptyAuthor()]);
            setCorrespondingAuthorIndex(0);
            setTitle('');
            setAbstract('');
            setKeywords([]);
            setArticleType('');
            setJournal('');
            setManuscriptFile(null);
            setCoverLetterFile(null);
            setFunding('');
            setConflictOfInterest('');
            setEthicsApproved(false);
            setEthicsDetails('');
            setAcknowledgements('');
            setSuggestedReviewers('');
            setOpposedReviewers('');
            setConsent(false);
        } catch (err) {
            console.error('Submission failed', err?.response || err);
            let message = 'Submission failed';
            if (err.response?.data?.error === 'Validation failed') {
                message = 'Server validation failed: ' + (err.response.data.fields || []).join(', ');
            } else if (err.response?.data?.error === 'CORS') {
                message = 'CORS error: backend origin not allowed';
            } else if (err.message) {
                message = err.message;
            }
            setSnackbar({ open: true, message, severity: 'error' });
        } finally {
            setSubmitting(false);
            setTimeout(() => setProgress(0), 800);
        }
    };

    const errorText = (key) => errors[key] && (
        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>{errors[key]}</Typography>
    );

    const PreviewDialog = () => (
        <Dialog open={showPreview} onClose={() => setShowPreview(false)} maxWidth="md" fullWidth>
            <DialogTitle>Review Your Submission</DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>Manuscript Details</Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">Title:</Typography>
                        <Typography variant="body1">{title}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">Article Type:</Typography>
                        <Typography variant="body1">{articleType}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">Journal:</Typography>
                        <Typography variant="body1">{journal}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">Abstract:</Typography>
                        <Typography variant="body2" sx={{ maxHeight: 100, overflow: 'auto' }}>{abstract}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">Keywords:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {keywords.map(k => <Chip key={k} label={k} size="small" />)}
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Authors</Typography>
                {authors.map((author, idx) => (
                    <Box key={idx} sx={{ mb: 2, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <Typography variant="subtitle2">
                            {author.firstName} {author.lastName}
                            {idx === correspondingAuthorIndex && <Chip label="Corresponding" size="small" sx={{ ml: 1 }} />}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">{author.email}</Typography>
                        <Typography variant="body2" color="text.secondary">{author.affiliation}</Typography>
                        {author.orcid && <Typography variant="body2" color="text.secondary">ORCID: {author.orcid}</Typography>}
                    </Box>
                ))}

                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Files</Typography>
                <Typography variant="body2">
                    <strong>Manuscript:</strong> {manuscriptFile?.name || 'None'}
                </Typography>
                {coverLetterFile && (
                    <Typography variant="body2">
                        <strong>Cover Letter:</strong> {coverLetterFile.name}
                    </Typography>
                )}

                {(funding || conflictOfInterest || acknowledgements) && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>Declarations</Typography>
                        {funding && (
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Funding:</strong> {funding}
                            </Typography>
                        )}
                        {conflictOfInterest && (
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Conflict of Interest:</strong> {conflictOfInterest}
                            </Typography>
                        )}
                        {acknowledgements && (
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Acknowledgements:</strong> {acknowledgements}
                            </Typography>
                        )}
                        {ethicsApproved && (
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Ethics Approval:</strong> Yes {ethicsDetails && `- ${ethicsDetails}`}
                            </Typography>
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowPreview(false)}>Edit</Button>
                <Button onClick={handleConfirmSubmit} variant="contained" disabled={submitting}>
                    {submitting ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
                    Confirm & Submit
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Box component={Paper} sx={{ maxWidth: 960, mx: 'auto', my: 4, p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" gutterBottom align="center">Manuscript Submission</Typography>
            <Typography variant="body2" align="center" sx={{ mb: 3 }}>
                Please complete all required sections. Fields marked * are mandatory. This form mirrors
                common international / IEEE style submission metadata.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField label="Title *" value={title} onChange={e => setTitle(e.target.value)} fullWidth size="small" />
                {errorText('title')}
                <TextField label="Abstract * (min 50 words)" value={abstract} onChange={e => setAbstract(e.target.value)} fullWidth multiline minRows={4} size="small" sx={{ mt:2 }} />
                <Typography variant="caption" sx={{ display:'block', textAlign:'right', mt:0.5 }}>
                    {abstract.trim() ? abstract.trim().split(/\s+/).length : 0} words
                </Typography>
                {errorText('abstract')}

                <TextField select label="Article Type *" value={articleType} onChange={e => setArticleType(e.target.value)} fullWidth size="small" sx={{ mt:2 }}>
                    {articleTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
                {errorText('articleType')}

                <TextField select label="Journal *" value={journal} onChange={e=>setJournal(e.target.value)} fullWidth size="small" sx={{ mt:2 }}>
                    {journalOptions.map(j => <MenuItem key={j} value={j}>{j}</MenuItem>)}
                </TextField>
                {errorText('journal')}

                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>Authors & Affiliations</Typography>
                {authors.map((a, idx) => (
                    <Paper key={idx} variant="outlined" sx={{ p:2, mb:2 }}>
                        <Stack direction={{ xs:'column', sm:'row' }} spacing={2}>
                            <TextField label="First Name *" value={a.firstName} onChange={e=>updateAuthor(idx,'firstName',e.target.value)} size="small" fullWidth />
                            <TextField label="Last Name *" value={a.lastName} onChange={e=>updateAuthor(idx,'lastName',e.target.value)} size="small" fullWidth />
                        </Stack>
                        {errorText(`author_${idx}`)}
                        <Stack direction={{ xs:'column', sm:'row' }} spacing={2} sx={{ mt:1 }}>
                            <TextField label="Email *" type="email" value={a.email} onChange={e=>updateAuthor(idx,'email',e.target.value)} size="small" fullWidth />
                            <TextField label="Affiliation *" value={a.affiliation} onChange={e=>updateAuthor(idx,'affiliation',e.target.value)} size="small" fullWidth />
                        </Stack>
                        {errorText(`authorEmail_${idx}`)}
                        {errorText(`authorAff_${idx}`)}
                        <TextField label="ORCID" placeholder="0000-0000-0000-0000" value={a.orcid} onChange={e=>updateAuthor(idx,'orcid',e.target.value)} size="small" fullWidth sx={{ mt:1 }} />
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt:1 }}>
                            <FormControlLabel control={<Checkbox checked={correspondingAuthorIndex===idx} onChange={()=>setCorrespondingAuthorIndex(idx)} />} label="Corresponding Author" />
                            <IconButton aria-label="remove author" onClick={()=>removeAuthor(idx)} disabled={authors.length===1} size="small"><DeleteIcon fontSize="inherit" /></IconButton>
                        </Stack>
                    </Paper>
                ))}
                <Button variant="outlined" startIcon={<AddIcon />} onClick={addAuthor} size="small">Add Author</Button>

                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>Keywords *</Typography>
                <Stack direction="row" spacing={1} sx={{ mb:1, flexWrap:'wrap' }}>
                    {keywords.map(k => <Chip key={k} label={k} onDelete={()=>removeKeyword(k)} sx={{ mb:1 }} />)}
                </Stack>
                <Stack direction="row" spacing={1}>
                    <TextField label="Add keyword" value={keywordInput} onChange={e=>setKeywordInput(e.target.value)} size="small" fullWidth onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); addKeyword(); } }} />
                    <Button onClick={addKeyword} variant="contained" size="small">Add</Button>
                </Stack>
                {errorText('keywords')}

                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>Declarations</Typography>
                <TextField label="Funding Information" value={funding} onChange={e=>setFunding(e.target.value)} fullWidth multiline minRows={2} size="small" />
                <TextField label="Conflict of Interest" value={conflictOfInterest} onChange={e=>setConflictOfInterest(e.target.value)} fullWidth multiline minRows={2} size="small" sx={{ mt:2 }} />
                <FormControlLabel sx={{ mt:1 }} control={<Checkbox checked={ethicsApproved} onChange={e=>setEthicsApproved(e.target.checked)} />} label="Ethics approval obtained" />
                {ethicsApproved && <TextField label="Ethics Approval Details" value={ethicsDetails} onChange={e=>setEthicsDetails(e.target.value)} fullWidth multiline minRows={2} size="small" sx={{ mt:1 }} />}
                <TextField label="Acknowledgements" value={acknowledgements} onChange={e=>setAcknowledgements(e.target.value)} fullWidth multiline minRows={2} size="small" sx={{ mt:2 }} />

                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>Files</Typography>
                <Box sx={{ display:'flex', flexDirection:{ xs:'column', sm:'row'}, gap:2 }}>
                    <Button variant="outlined" component="label" sx={{ flex:1 }}>
                        {manuscriptFile ? `Manuscript: ${manuscriptFile.name}` : 'Upload Manuscript * (PDF/DOCX)'}
                        <input type="file" hidden onChange={handleFile(setManuscriptFile)} />
                    </Button>
                    <Button variant="outlined" component="label" sx={{ flex:1 }}>
                        {coverLetterFile ? `Cover Letter: ${coverLetterFile.name}` : 'Upload Cover Letter (optional)'}
                        <input type="file" hidden onChange={handleFile(setCoverLetterFile)} />
                    </Button>
                </Box>
                {errorText('manuscriptFile')}

                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>Reviewer Suggestions</Typography>
                <TextField label="Suggested Reviewers (one per line: Name, Institution, Email)" value={suggestedReviewers} onChange={e=>setSuggestedReviewers(e.target.value)} multiline minRows={3} fullWidth size="small" />
                <TextField label="Opposed Reviewers (optional, one per line)" value={opposedReviewers} onChange={e=>setOpposedReviewers(e.target.value)} multiline minRows={2} fullWidth size="small" sx={{ mt:2 }} />

                <Divider sx={{ my: 3 }} />
                <FormControlLabel control={<Checkbox checked={consent} onChange={e=>setConsent(e.target.checked)} />} label="I confirm this manuscript is original, not under consideration elsewhere, and all authors approve this submission." />
                {errorText('consent')}

                {submitting && (
                    <Box sx={{ my:2 }}>
                        <LinearProgress variant="determinate" value={progress} />
                        <Typography variant="caption" sx={{ display:'block', mt:0.5 }}>Uploading... {Math.round(progress)}%</Typography>
                    </Box>
                )}
                <Button type="submit" variant="contained" disabled={submitting} sx={{ mt:2, position:'relative', minHeight:48 }} fullWidth>
                    {submitting ? <><CircularProgress size={20} sx={{ mr:1, color:'#fff' }} /> Submitting…</> : 'Submit Manuscript'}
                </Button>
                <Divider sx={{ my: 3 }} />
                <Typography variant="body1" align="center" sx={{ fontWeight: 700 }}>
                    In addition to the above form, you can ALSO email the PDF of your paper to{' '}
                    <a href="mailto:editor.itme@krmangalam.edu.in" style={{ color: '#1976d2', textDecoration: 'none' }}>
                        editor.itme@krmangalam.edu.in
                    </a>.
                </Typography>
            </Box>
            <PreviewDialog />
            <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={()=>setSnackbar(s=>({...s, open:false}))} anchorOrigin={{ vertical:'bottom', horizontal:'center' }}>
                <Alert severity={snackbar.severity} onClose={()=>setSnackbar(s=>({...s, open:false}))} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default InternationalSubmissionForm;
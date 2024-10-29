import React, { useEffect, useState } from 'react';
import {
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Card,
  Typography,
  Container,
  Select,
  MenuItem,
} from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Layout from '../../../Layouts/Admin/DashboardLayout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { errorAlert, successAlert } from 'src/utils';
import { db, storage } from 'src/Firebase';
import Iconify from 'src/components/iconify';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { PrivatePaths } from 'src/routes/path';
import { reset } from 'numeral';

function CandidateForm() {
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const [isLoading, setIsLoading] = React.useState(false);

  const Viewcandidate = () => {
    navigate(`${PrivatePaths.ADMIN}/candidates`, { replace: true });
  };
  const [formData, setFormData] = useState({
    fullName: '',
    partyAffiliation: '',
    position: '',
    photo: null,
    biography: '',
    campaignSlogan: '',
    policies: '',
    contactInformation: {
      website: '',
      email: '',
      twitter: '',
    },
    age: '',
    education: '',
    workExperience: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.contactInformation) {
      setFormData((prevData) => ({
        ...prevData,
        contactInformation: { ...prevData.contactInformation, [name]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!user) {
      errorAlert('User is not authenticated.');
      setIsSubmitting(false);
      return;
    }

    const candidateId = `candidate_${Date.now()}`;

    let photoURL = '';
    if (formData.photo) {
      const photoRef = ref(storage, `photos/${candidateId}`);
      await uploadBytes(photoRef, formData.photo);
      photoURL = await getDownloadURL(photoRef);
    }

    const candidateData = {
      ...formData,
      id: candidateId,
      photo: photoURL,
      policies: formData.policies.split(',').map((policy) => policy.trim()), // Assuming policies are entered as comma-separated values
      age: Number(formData.age),
    };

    try {
      await setDoc(doc(db, 'candidates', candidateId), candidateData);
      setFormData({
        fullName: '',
        partyAffiliation: '',
        position: '',
        photo: null,
        biography: '',
        campaignSlogan: '',
        policies: '',
        contactInformation: {
          website: '',
          email: '',
          twitter: '',
        },
        age: '',
        education: '',
        workExperience: '',
        location: '',
      });

      successAlert('Candidate Uploaded successfully!');
      setIsLoading(false);
      setIsSubmitting(false);
      setInputKey(Date.now());
      reset();
    } catch (error) {
      console.error('Error adding candidate:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Layout name="Add Candidate" title="Candidates">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
            <Typography variant="h6" gutterBottom>
              Add a candidate{' '}
            </Typography>
            <Button
              variant="contained"
              sx={{ marginRight: 8 }}
              onClick={Viewcandidate}
              startIcon={<Iconify icon="eva:eye-fill" />}
            >
              View Candidates{' '}
            </Button>
          </Stack>

          <Stack spacing={2} mt={2} ml={-3}>
            <form onSubmit={handleSubmit}>
              <Card sx={{ position: 'relative', margin: 3, gap: 4, mb: 1, ml: 2, width: '95%' }}>
                <Stack
                  spacing={3}
                  sx={{ position: 'relative', margin: 6, gap: 4, ml: 6, width: '90%' }}
                >
                  {' '}
                  <Grid
                    container
                    item
                    spacing={3}
                    style={{ marginLeft: '-20px', marginTop: '-20px' }}
                  >
                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="fullName"
                          label="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="partyAffiliation">Party Affiliation </InputLabel>
                        <Select
                          name="partyAffiliation"
                          label="Party Affiliation"
                          value={formData.partyAffiliation}
                          onChange={handleInputChange}
                          required
                        >
                          {[
                            '',
                            'People Democrtic Party',
                            'All Progressive Congress',
                            'Labour Party',
                            'Social Democratic Party',
                            'All Progressives Grand Alliance',
                            'Action Democratic Party',
                            'African Democratic Congress',
                            'All Grassroots Alliance',
                            'All Nigeria Peoples Party',
                          ].map((party) => (
                            <MenuItem key={party} value={party}>
                              {party}
                            </MenuItem>
                          ))}
                        </Select>{' '}
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="position">Position </InputLabel>
                        <Select
                          name="position"
                          label="Position"
                          value={formData.position}
                          onChange={handleInputChange}
                          required
                          inputProps={{
                            name: 'position',
                            id: 'position',
                          }}
                        >
                          {[
                            '',
                            'President',
                            'Vice President',
                            'Secretary of State',
                            'Secretary of Treasury',
                            'Secretary of Defense',
                            'Attorney General',
                            'Secretary of the Interior',
                            'Secretary of Agriculture',
                            'Secretary of Commerce',
                            'Secretary of Labor',
                            'Secretary of Health and Human Services',
                            'Secretary of Housing and Urban Development',
                            'Secretary of Transportation',
                            'Secretary of Energy',
                            'Secretary of Education',
                          ].map((period) => (
                            <MenuItem key={period} value={period}>
                              {period}
                            </MenuItem>
                          ))}
                        </Select>{' '}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    spacing={3}
                    style={{ marginLeft: '-20px', marginTop: '-20px' }}
                  >
                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="website"
                          label="Website"
                          value={formData.contactInformation.website}
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              contactInformation: {
                                ...prevData.contactInformation,
                                website: e.target.value,
                              },
                            }))
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="email"
                          label="Email"
                          value={formData.contactInformation.email}
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              contactInformation: {
                                ...prevData.contactInformation,
                                email: e.target.value,
                              },
                            }))
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="twitter"
                          label="Twitter"
                          value={formData.contactInformation.twitter}
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              contactInformation: {
                                ...prevData.contactInformation,
                                twitter: e.target.value,
                              },
                            }))
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    spacing={3}
                    style={{ marginLeft: '-20px', marginTop: '-20px' }}
                  >
                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="age"
                          label="Age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                          required
                        />
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="education"
                          label="Education"
                          value={formData.education}
                          onChange={handleInputChange}
                          required
                        />
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="workExperience"
                          label="Work Experience"
                          value={formData.workExperience}
                          onChange={handleInputChange}
                          required
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    spacing={3}
                    style={{ marginLeft: '-20px', marginTop: '-20px' }}
                  >
                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          key={inputKey}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          required
                        />
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="location"
                          label="Location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                        />
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="campaignSlogan"
                          label="Campaign Slogan"
                          value={formData.campaignSlogan}
                          onChange={handleInputChange}
                          required
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    spacing={3}
                    style={{ marginLeft: '-20px', marginTop: '-20px' }}
                  >
                    <Grid item container xs={8} sm={8} md={8}>
                      <FormControl fullWidth>
                        <TextField
                          name="biography"
                          label="Biography"
                          value={formData.biography}
                          onChange={handleInputChange}
                          multiline
                          rows={4}
                          required
                        />
                      </FormControl>
                    </Grid>

                    <Grid item container xs={8} sm={8} md={4}>
                      <FormControl fullWidth>
                        <TextField
                          name="policies"
                          label="Policies (comma separated)"
                          value={formData.policies}
                          onChange={handleInputChange}
                          required
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>

              <Grid container sx={{ my: 0 }} spacing={1}>
                <LoadingButton
                  sx={{ mr: 6, ml: 3, mt: 4, width: '120px' }}
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  Submit
                </LoadingButton>
              </Grid>
            </form>
          </Stack>
        </Container>
      </Layout>
    </>
  );
}

export default CandidateForm;

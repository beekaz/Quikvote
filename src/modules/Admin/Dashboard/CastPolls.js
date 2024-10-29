import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Layout from '../../../Layouts/Admin/DashboardLayout';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Modal,
  Alert,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useLocation, useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import { AuthContext } from 'src/context';
import { useFetchCandidates, useFetchPolls } from 'src/context/hooks';
import { errorAlert, successAlert, votedAlert } from 'src/utils';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from 'src/Firebase';
import { reset } from 'numeral';
import { LoadingButton } from '@mui/lab';
import CountdownComponent from 'src/components/CountDown';
import { PrivatePaths } from 'src/routes/path';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreatePolls = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const location = useLocation();
  const position = location.state?.position;
  const { user } = useContext(AuthContext);
  const candidates = useFetchCandidates();
  const Aspirant = candidates.filter((c) => c?.position === position?.position);
  const AllVotes = useFetchPolls();
  const [formData, setFormData] = useState({
    candidate: '',
    user: {
      id: user.id,
      uid: user.uid,
      email: user.email,
      fullname: user.fullname,
    },
  });

  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const selectedCandidate = Aspirant.find((c) => c.id === value);
    setSelectedCandidate(selectedCandidate);
    // setFormData((prevData) => ({ ...prevData, [name]: selectedCandidate.id }));
  };

  useEffect(() => {
    if (selectedCandidate) {
      setFormData((prevData) => ({
        ...prevData,
        candidate: selectedCandidate.id,
      }));
    }
  }, [selectedCandidate]);

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== '');
  };

  const handleCountdownComplete = () => {
    setIsCountdownComplete(true);
  };

  const handleHome = (res) => {
    let path;
    if (user) {
      switch (user.role) {
        case 'Admin':
          path = `${PrivatePaths.ADMIN}/dashboard`;
          break;
        default:
          path = `${PrivatePaths.USER}/dashboard`;
      }
    }
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsLoading(true);

    if (!user) {
      errorAlert('User is not authenticated.');
      return;
    }

    const pollId = `${position.path}_${Date.now()}`;
    const pollsData = {
      ...formData,
      id: pollId,
      position: position.position,
      candidate: selectedCandidate.id,
      party: selectedCandidate.partyAffiliation,
      photo: selectedCandidate.photo,
      aspirant: selectedCandidate.fullName,
      isVoted: true,
      // name: position.path,
    };

    try {
      await setDoc(doc(db, 'poll_result', pollId), pollsData);
      // setFormData({
      //   user: {
      //     id: user.id,
      //     uid: user.uid,
      //     email: user.email,
      //     fullname: user.fullname,
      //   },
      //   position: selectedCandidate.position,
      //   aspirant: selectedCandidate.fullName,
      //   isVoted: true,
      //   candidate: selectedCandidate.id,
      //   party: selectedCandidate.partyAffiliation,
      //   photo: selectedCandidate.photo,
      // });

      successAlert(`Voted ${position.position} successfully!`);
      handleHome();
      setIsLoading(false);

      setIsSubmitting(false);

      setOpen(false);
      reset();
    } catch (error) {
      console.error('Error adding candidate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (AllVotes && user) {
      const positionPolls = AllVotes.filter(
        (vote) => vote.position === position.position && vote.user?.id === user?.id
      );
      setHasVoted(positionPolls.length > 0);
    }
  }, [AllVotes]);

  return (
    <>
      <Layout name="All Candidates" title="Candidates">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h7" gutterBottom>
              Cast Poll for {position.position}
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} md={8} gap={8}>
              <FormControl fullWidth>
                <InputLabel htmlFor="candidate">Select Your Candidate</InputLabel>
                <Select
                  name="candidate"
                  label="candidate"
                  value={formData.candidate}
                  onChange={handleSelectChange}
                  required
                  fullWidth
                >
                  {Aspirant?.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={() => {
                  if (hasVoted) {
                    votedAlert(`You have already voted for a ${position.position} .`);
                    if (isCountdownComplete) {
                      votedAlert("Voting has ended. You can't vote anymore");
                    }
                  } else {
                    setOpen(!open);
                  }
                }}
                disabled={!isFormValid()}
              >
                Vote
              </Button>
            </Grid>
          </Grid>
          {selectedCandidate && (
            <Grid container spacing={4} style={{ marginTop: '1rem' }}>
              <Grid item xs={12} md={6} gap={8}>
                <Card>
                  <CardContent>
                    <Box display="flex" flexDirection="column" gap={0}>
                      <Typography variant="h2" component="div">
                        {selectedCandidate?.fullName}
                      </Typography>
                      <Typography variant="h4" component="div">
                        ({selectedCandidate?.position})
                      </Typography>
                    </Box>
                    <Box
                      style={{ marginTop: '1rem' }}
                      display="flex"
                      flexDirection="column"
                      gap={2}
                    >
                      <Typography variant="h5" color="text.secondary">
                        <span style={{ fontSize: '18px' }}>Party Affiliation: </span>
                        {selectedCandidate?.partyAffiliation}
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
                        Biography: {selectedCandidate?.biography}
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
                        Campaign Slogan: {selectedCandidate?.campaignSlogan}
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
                        Policies: {selectedCandidate?.policies}
                      </Typography>

                      <Typography variant="h5" color="text.secondary">
                        Education: {selectedCandidate?.education}
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
                        Work Experience: {selectedCandidate?.workExperience}
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
                        Location: {selectedCandidate?.location}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="410"
                    image={selectedCandidate?.photo}
                    alt={selectedCandidate?.fullName}
                  />
                </Card>
              </Grid>
            </Grid>
          )}
        </Container>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Are you sure?{' '}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '13px' }}>
              Are you sure you want to vote for {selectedCandidate?.fullName}
              <br />
              as the next {''}
              <strong>{selectedCandidate?.position}? </strong>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>

            <Grid container sx={{ my: 0, justifyContent: 'center' }} spacing={1}>
              <Button
                sx={{ mr: 3, mt: 2, width: '80px', height: '40px' }}
                size="medium"
                type="button"
                variant="outlined"
                onClick={() => setOpen(false)}
              >
                Cancel{' '}
              </Button>

              {!hasVoted && (
                <LoadingButton
                  sx={{ mr: 3, mt: 2, width: '80px', height: '40px' }}
                  size="medium"
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  onClick={handleSubmit}
                  disabled={hasVoted}
                >
                  Confirm
                </LoadingButton>
              )}
            </Grid>
          </Box>
        </Modal>
      </Layout>
    </>
  );
};

export default CreatePolls;

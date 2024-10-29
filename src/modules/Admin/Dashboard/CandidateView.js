import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../../Layouts/Admin/DashboardLayout';
import {
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from '@mui/material';
import Iconify from 'src/components/iconify';

const CandidateView = ({}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const location = useLocation();
  const candidates = location.state?.candidate;
  return (
    <>
      <div>CandidateView</div>
      <div>{candidates?.fullName}</div>
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} gap={8}>
              <Card>
                <CardContent>
                  <Box display="flex" flexDirection="column" gap={0}>
                    <Typography variant="h2" component="div">
                      {candidates?.fullName}
                    </Typography>
                    <Typography variant="h4" component="div">
                      ({candidates?.position})
                    </Typography>
                  </Box>
                  <Box style={{ marginTop: '1rem' }} display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h5" color="text.secondary">
                      <span style={{ fontSize: '18px' }}>Party Affiliation: </span>
                      {candidates?.partyAffiliation}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Biography: {candidates?.biography}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Campaign Slogan: {candidates?.campaignSlogan}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Policies: {candidates?.policies}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Contact Information: Website: {candidates?.contactInformation.website}
                      Email: {candidates?.contactInformation.email}
                      Twitter: {candidates?.contactInformation.twitter}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Age: {candidates?.age}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Education: {candidates?.education}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Work Experience: {candidates?.workExperience}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Location: {candidates?.location}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="510"
                  image={candidates?.photo}
                  alt={candidates?.fullName}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default CandidateView;

import React, { useContext, Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../Layouts/Admin/DashboardLayout';
import { AuthContext } from '../../../context';
import { Stack, Button, Container, Typography, Grid, Box, LinearProgress } from '@mui/material';
import Iconify from '../../../components/iconify';
import CandidateCard from 'src/components/CandidateCard';
import { PrivatePaths } from 'src/routes/path';
import { useFetchCandidates } from 'src/context/hooks';
import { DataSaverOffTwoTone } from '@mui/icons-material';

const CandidateList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const candidates = useFetchCandidates();

  useEffect(() => {
    if (candidates) {
      setselectedAspirants(candidates);
    }
  }, [candidates]);

  const [selectedAspirants, setselectedAspirants] = useState([]);

  const AddCandidate = () => {
    navigate(`${PrivatePaths.ADMIN}/create-candidate`);
  };

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
            <div>
              <Typography variant="h7" gutterBottom>
                All Candidates{' '}
              </Typography>
            </div>

            <div>
              {user?.role === 'Admin' && (
                <Button
                  variant="contained"
                  sx={{ marginRight: 0, marginLeft: 2 }}
                  onClick={AddCandidate}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Add Candidates{' '}
                </Button>
              )}
            </div>
          </Stack>

          <Grid container spacing={3}>
            <Suspense fallback={<LinearProgress />}>
              {candidates?.length > 0 ? (
                selectedAspirants.map((candidate, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box mt={2}>
                      <CandidateCard candidate={candidate} />
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    height="50vh"
                  >
                    <DataSaverOffTwoTone />
                    <Typography style={{ marginTop: '1rem' }} variant="h6">
                      No data available
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Suspense>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default CandidateList;

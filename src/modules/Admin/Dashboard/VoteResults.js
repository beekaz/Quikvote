import React, { useContext, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../Layouts/Admin/DashboardLayout';
import { AuthContext } from '../../../context';
import {
  Stack,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  LinearProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@mui/material';
import Iconify from '../../../components/iconify';
import CandidateCard from 'src/components/CandidateCard';
import { PrivatePaths } from 'src/routes/path';
import { Firestore } from 'firebase/firestore';
import { getCandidates } from 'src/context/hooks';
import { errorAlert } from 'src/utils';

const UserList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const [allCandidates, setAllCandidates] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    getCandidates()
      .then((candidates) => {
        setAllCandidates(candidates);
      })
      .catch((error) => {
        errorAlert('Error fetching candidates:', error);
      });
  }, []);

  const voteCounts = votes.reduce((counts, vote) => {
    if (!counts[vote.candidate_id]) {
      counts[vote.candidate_id] = 0;
    }
    counts[vote.candidate_id]++;
    return counts;
  }, {});

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

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="h7" gutterBottom>
              All Users{' '}
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Candidate ID</TableCell>
                    <TableCell align="right">Votes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(voteCounts).map(([candidateId, count]) => (
                    <TableRow key={candidateId}>
                      <TableCell component="th" scope="row">
                        {candidateId}
                      </TableCell>
                      <TableCell align="right">{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default UserList;

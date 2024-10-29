import React from 'react';
import { Card, CardContent, Typography, Grid, Container, Button } from '@mui/material';
import { useFetchPolls } from 'src/context/hooks';
import Layout from '../../Layouts/Admin/DashboardLayout';
import { PieChart } from '@mui/x-charts';
import TablePage from 'src/components/TablePage';
import Iconify from 'src/components/iconify';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import styles from './styles.module.css';
import { getCountdown } from 'src/Storage';

const UserPollOverview = () => {
  const timeup = getCountdown();
  const AllVotes = useFetchPolls();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  let index = 0;
  const partyVotes = AllVotes?.reduce((acc, vote) => {
    acc[vote.party] = acc[vote.party] || { count: 0, position: vote.party, id: index++ };
    acc[vote.party].count += 1;
    return acc;
  }, {});

  const partyData = Object.values(partyVotes)
    .map(({ count, position, id }) => ({
      label: `${position} (${count})`,
      heading: position,
      value: count,
      id: id,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  index = 0;
  const aspirantVotes = AllVotes?.reduce((acc, vote) => {
    const key = `${vote.aspirant}_${vote.candidate}`;
    acc[key] = acc[key] || {
      count: 0,
      position: vote.party,
      id: index++,
      office: vote.position,
      aspirant: vote.aspirant,
    };
    acc[key].count += 1;
    return acc;
  }, {});

  const aspirantVotesArray = Object.values(aspirantVotes);

  const aspirantsData = Object.values(aspirantVotes)
    .map(({ count, position, id, candidate, aspirant }) => ({
      label: `${aspirant} (${count})`,
      value: count,
      id: id,
      candidate: candidate,
      aspirant: aspirant,
      position: position,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7);

  const columns = [
    { id: '' },
    { id: 'sn', label: 'S/N', render: (rowData) => rowData.id + 1 },
    { id: 'aspirant', label: 'Aspirant' },
    { id: 'office', label: 'Office ' },
    { id: 'position', label: 'Party' },
    { id: 'count', label: 'Vote Count' },
  ];

  return (
    <Layout>
      <Container maxWidth="xl">
        <Button
          variant="text"
          onClick={handleGoBack}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          sx={{ mb: 2 }}
        >
          Go Back{' '}
        </Button>

        <Typography variant="h4" sx={{ mb: 5 }}>
          Poll Results Overview
        </Typography>
      </Container>

      {timeup === 'true' ? (
        <>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              {partyData?.map((result, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <CardContent>
                      <Typography>
                        {' '}
                        <strong>{result.heading}</strong>
                      </Typography>
                      <Typography variant="body1">Total Votes: {result.value}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Container maxWidth="xl" style={{ marginTop: '10px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Card>
                  <Typography
                    style={{ marginLeft: '2rem', marginTop: '2rem', marginBottom: '-3rem' }}
                    variant="h5"
                  >
                    Candidate's Leaderboard{' '}
                  </Typography>
                  <BasicPie data={aspirantsData} />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Card>
                  <Typography
                    style={{ marginLeft: '2rem', marginTop: '2rem', marginBottom: '-3rem' }}
                    variant="h5"
                  >
                    {' '}
                    Party's Leaderboard{' '}
                  </Typography>
                  <BasicPie data={partyData} />
                </Card>
              </Grid>
            </Grid>
          </Container>
          {/* <Container maxWidth="xl" style={{ marginTop: '20px' }}>
            <TablePage data={aspirantVotesArray} columns={columns} />
          </Container> */}
        </>
      ) : (
        <Container maxWidth="xl" style={{ marginTop: '10px' }}>
          <div className={styles.loader}>
            <Circles height={30} width={30} color="#1A89C2" />

            <Typography
              variant="h4"
              style={{
                position: 'absolute',
                bottom: 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Voting stil on going, check back later
            </Typography>
          </div>
        </Container>
      )}
    </Layout>
  );
};

export default UserPollOverview;

const BasicPie = ({ pos, aspc, data }) => {
  return (
    <PieChart
      series={[
        {
          data: data,
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 120,
          cy: 200,
        },
      ]}
      width={430}
      height={380}
    />
  );
};

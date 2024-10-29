import React, { useEffect } from "react";
import "../../styles/targetAudience.css";
import ScrollReveal from "scrollreveal";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";

const TargetAudience = () => {
  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      delay: 200,
      distance: "50px",
      duration: 800,
      easing: "ease-out",
      origin: "bottom",
      reset: true,
    });
  }, []);

  const audiences = [
    { title: "Professional Associations", description: "Facilitating voting processes for members and leadership elections." },
    { title: "Unions", description: "Empowering union members with a transparent voting process." },
    { title: "Political Parties", description: "Streamlining internal voting and decision-making." },
    { title: "NGOs, Societies or Clubs", description: "Helping organizations conduct votes for various purposes." },
    { title: "Colleges and Universities", description: "Assisting with student government elections and campus decisions." },
    { title: "Homeowners' Associations", description: "Managing community voting and decision-making." },
    { title: "Churches and Religious Groups", description: "Facilitating congregation voting for church matters." },
    { title: "Clubs and decision Making", description: "Assist club decisions and member elections through Polls, Elections, Surveys, and Quizzes." },
    { title: "Cooperatives and Credit Unions", description: "Helping cooperatives manage voting for member participation." },
  ];

  return (
    <Container maxWidth="lg" className="text-center my-5">
      <Typography variant="h2" component="h2" gutterBottom>
        QuikVote Serves
      </Typography>
      <Typography variant="h5" component="h5" className="reveal" paragraph>
        A variety of organizations and groups that require effective and streamlined voting solutions.
      </Typography>
      <Grid container spacing={4} className="reveal">
        {audiences.map((audience, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card variant="outlined" style={{ height: "100%" }}>
              <CardContent style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography variant="h5" component="h5" gutterBottom>
                  {audience.title}
                </Typography>
                <Typography variant="body1" component="p" style={{ flexGrow: 1 }}>
                  {audience.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TargetAudience;

import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { PublicPaths } from '../../routes/path';
// import styles from './styles.module.css';
// import { Button, Container, Grid, Typography } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import HeroSection from '../../components/Hero/HeroSection';
import TargetAudience from '../../components/Features/TargetAudience';
import WhyChooseQuikVote from '../../components/Features/WhyQuikVote';
import Footer from '../../components/Footer/Footer';
import AboutSection from '../../components/About/About';
import LearnMore from '../../components/Features/LearnMore';

const Home = () => {
  const navigate = useNavigate();


  return (

    <div >

      <Navbar />
      <HeroSection />

      <TargetAudience />

      <WhyChooseQuikVote />

      <LearnMore />

      <AboutSection />




      {/* <FeaturesSection /> */}

      <Footer />


    </div>
  );
};

export default Home;

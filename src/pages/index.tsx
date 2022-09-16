import * as React from 'react';
import Head from 'next/head';
import Region from '../components/Region';
import Thumbnail from '../components/Thumbnail';
import Grid from '../components/Grid';
import styles from './index.module.scss';
import fakeImages from '../data/fake-images.json';

const Archive = () => (
  <div>
    <Head>
      <title>Film | Luis Rojas</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles['archive-container']}>
      <Region>
        <Grid>
          {fakeImages.map(fakeImage => (
            <Thumbnail 
              {...fakeImage} 
              target={fakeImage.target as "_blank"} 
            />
          ))}
        </Grid>
      </Region>
    </div>
  </div>
)

export default Archive;

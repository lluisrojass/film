import * as React from 'react';
import Head from 'next/head';
import Region from '../components/Region';
import Thumbnail from '../components/Thumbnail';
import Grid from '../components/Grid';
import styles from './index.module.scss';
import siteJson from '../../site.json';

const Archive = () => (
  <div>
    <Head>
      <title>Film | Luis Rojas</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles['archive-container']}>
      <Region>
        <Grid>
          {siteJson.images.reverse().map(fakeImage => (
            <Thumbnail {...fakeImage} key={fakeImage.id} />
          ))}
        </Grid>
      </Region>
    </div>
  </div>
)

export default Archive;

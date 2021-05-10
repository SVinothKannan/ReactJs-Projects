import React from 'react';
import { Loader } from 'react-overlay-loader';

import 'react-overlay-loader/styles.css';

export default function MyLoader({ active }) {
  return (    
  <div>
        <Loader fullPage loading={active} text='Please Wait!   Signing in to your account...' style={{ Color:"rgb(136, 136, 136)"}}/>
  </div>
  )
}


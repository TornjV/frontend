import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Cluster from './cluster';
import Service from './service';
import Provision from './provision';
import Settings from './settings';
import Profile from './profile';
import '../style.scss';

storiesOf('Layout', module)
  .add('cluster', Cluster)
  .add('settings', Settings)
  .add('service', Service)
  .add('provision', Provision)
  .add('profile', Profile);

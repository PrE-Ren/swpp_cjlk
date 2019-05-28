import React from 'react'
import Left_sidebar from '../../molecules/Left_sidebar'
import ImpendingList from '../../../containers/ImpendingList'
import RecentList from '../../../containers/RecentList'
import Right_sidebar from '../../molecules/Right_sidebar'
import { Grid, Header, Icon, Container } from 'semantic-ui-react'

export const HomePage = ({ mySNU_verification_token, phone_token }) => {
  if (mySNU_verification_token == null || phone_token == null) {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/login'
    });
    return (<div></div>)
  }
  else {
    return (
      <Grid columns={3}>
        <Grid.Column width={2}>
          <Left_sidebar />
        </Grid.Column>

        <Grid.Column width={10}>
          <Container>
            <Header as='h1' icon textAlign='center'>
              <Icon name='group' circular />
              SNU Moyeo
              <Header.Subheader>SNU web service that helps you construct and join a meeting </Header.Subheader><br /><br />
            </Header>
          </Container>
          <Container>
            <ImpendingList />
            <RecentList />
          </Container>
        </Grid.Column>

        <Grid.Column width={4}>
          <Right_sidebar />
        </Grid.Column>
      </Grid>
    )
  }
}

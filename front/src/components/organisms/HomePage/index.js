import React from 'react'
import { PropTypes } from 'prop-types'
import Left_sidebar from '../../molecules/Left_sidebar'
import ImpendingList from '../../../containers/ImpendingList'
import RecentList from '../../../containers/RecentList'
import Right_sidebar from '../../molecules/Right_sidebar'
<<<<<<< HEAD
import styled from 'styled-components'
import { Nav, NavLink } from 'styled-nav-component';

const Title_Font = styled.div`
  display: flex;
  font-size: 55px;
  font-weight: bold;
  justify-content: center;
  margin-top: 20px;
`

const Upper_Box = styled.div`
  display: block;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 100px;
  margin-right: 5px;
`

const Lower_Box = styled.div`
  display: block;
  margin-left: 5px;
  margin-right: 5px;
`

const List_Box = styled.div`
  float: left;
  margin-left: 10%;
  display: inline-block;
`
=======
import { Grid, Header, Icon, Container } from 'semantic-ui-react'
>>>>>>> 1ccdebb7e7c9eedc16812597c76b7362747d3a1f

export const HomePage = ({ token }) => {
  if (token == null) {
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

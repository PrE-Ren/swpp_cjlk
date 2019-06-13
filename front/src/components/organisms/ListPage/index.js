import React from 'react'
import Left_sidebar from '../../molecules/Left_sidebar'
import KindList from '../../../containers/KindList'
import Right_sidebar from '../../molecules/Right_sidebar'
import Button from '../../atoms/Button'
import { Grid, Header, Icon, Container, Pagination, Search} from 'semantic-ui-react'

export const ListPage = ({ username, mySNU_verification_token, phone_verification_token, meetinglist_list, change_page_num_click }) => {
  if (username == null) {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/login'
    });
    return (<div></div>)
  }
  else if (mySNU_verification_token == null || phone_verification_token == null) {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/auth'
    });
    return (<div></div>)
  }
  else if (meetinglist_list != null) {
    // calculate the total number of pages
    let last_page_num
    last_page_num = Math.ceil(JSON.parse(meetinglist_list).count / JSON.parse(meetinglist_list).page_size)
    if (last_page_num == 0)
      last_page_num = 1;

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
              <Header.Subheader>SNU web service that helps you construct and join a meeting</Header.Subheader><br /><br />
            </Header>
          </Container>
          <Container>
            <KindList /><br />
            <Grid columns={2}>
              <Grid.Column width={12}>
                <Pagination defaultActivePage={1} totalPages={last_page_num} onPageChange={(e, {activePage}) => change_page_num_click({activePage}.activePage)} />
              </Grid.Column>
              <Grid.Column width={4}>
                <Search />
              </Grid.Column>
            </Grid>
          </Container>
        </Grid.Column>
        <Grid.Column width={4}>
          <Right_sidebar />
        </Grid.Column>
      </Grid>
    )
  }
  else {
    return (<div></div>)
  }
}

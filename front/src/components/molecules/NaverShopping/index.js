import React from 'react'
import { Segment, Form, Grid, Modal, Card, Button, List, Item } from 'semantic-ui-react'



export class NaverShopping extends React.Component{
    state = {
        query : null,
        result_open : false     
    }

    result_show = () => this.setState({ result_open: true })
    result_close = () => this.setState({ result_open: false})

    render() {
        const {state, prepare_search_click, search_click} = this.props
        const {query} = this.state
        const searchlist = (sessionStorage.getItem("searchlist") != null ? JSON.parse(sessionStorage.getItem('searchlist')) : [])
        console.log(this.props.state.is_search_loaded)
        console.log(searchlist)

        const result_content =
            <Modal open={this.state.result_open} onClose={this.result_close}>
                <Modal.Header> '{this.state.query}' 에 대한 검색 결과 </Modal.Header>
                <Item.Group divided>                              
                  {searchlist.map(searchlist_entry =>
                    <Item key = {searchlist_entry.image}>
                        <Item>
                            <Item.Content> {searchlist_entry.title} </Item.Content>
                        </Item>
                        <Item>
                            <Item.Image src = {searchlist_entry.image}/>
                        </Item>
                        <Item>
                            <Item.Content href={searchlist_entry.link} target="_blank"> {searchlist_entry.link} </Item.Content>
                        </Item>
                        <Item>
                            <Item.Content> 가격 : {searchlist_entry.lprice} 원 </Item.Content>
                        </Item>      
                    </Item>
                  )}
                </Item.Group>
                <Modal.Actions>
                <Button negative onClick={() => {this.result_close()}}> 닫기 </Button>
                </Modal.Actions>
            </Modal>
        
        return(
            <Grid.Column width={4}>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Search' onChange={(e) => this.setState({query : e.target.value})}/>
              <Button color='teal' fluid size='large' onClick={() => {prepare_search_click(); this.result_show(); search_click(this.state.query)}}> 검색 </Button>
              {result_content}
            </Grid.Column>
        )

    }
}
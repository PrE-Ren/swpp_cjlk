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
        const {prepare_search_click, search_click} = this.props
        const searchlist = (sessionStorage.getItem("searchlist") != null ? JSON.parse(sessionStorage.getItem('searchlist')) : [])

        const result_content =
            <Modal open={this.state.result_open} onClose={this.result_close}>
                <Modal.Header> '{this.state.query}' 에 대한 검색 결과 </Modal.Header>
                <Item.Group divided>                              
                  {searchlist.map(searchlist_entry =>
                    <Item key = {searchlist_entry.image}>
                        <Item.Image src = {searchlist_entry.image}/>
                        <Item.Content>
                            <Item.Header> {searchlist_entry.title} </Item.Header>
                            <Item.Meta>
                                <span> 가격(단가) : {searchlist_entry.lprice}원 </span>
                            </Item.Meta>  
                            <Item.Description href={searchlist_entry.link} target="_blank"> 제품 링크 : {searchlist_entry.link} </Item.Description>    
                        </Item.Content>                
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
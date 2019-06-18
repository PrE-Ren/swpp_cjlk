import React from 'react'
import { Dimmer, Form, Grid, Modal, Loader, Button, List, Item, Image, Input, Popup } from 'semantic-ui-react'

export class NaverShopping extends React.Component{
    state = { query : "", result_open : false }
    result_show = () => this.setState({ result_open: true })
    result_close = () => this.setState({ result_open: false })

    render() {
        const { state, prepare_search_click, search_click } = this.props
        const search_list = (sessionStorage.getItem("search_list") != null ? JSON.parse(sessionStorage.getItem('search_list')) : [])

        const result_content =
            <Modal open={this.state.result_open} onClose={this.result_close}>
                <Modal.Header> '{this.state.query.value}'에 대한 상위 10개의 검색 결과 (유사도 기준)</Modal.Header>
                <Modal.Content image scrolling>
                  {this.props.state.is_search_loaded
                    ?
                    <Item.Group divided>
                      {search_list.map(search_entry =>
                        <Item key = {search_entry.image}>
                            <Item.Image src = {search_entry.image}/>
                            <Item.Content>
                                <Item.Header> {search_entry.title} </Item.Header>
                                <Item.Meta>
                                    <span> 가격(단가) : {search_entry.lprice}원 </span>
                                </Item.Meta>
                                <Item.Description href={search_entry.link} target="_blank"> 제품 링크 : {search_entry.link} </Item.Description>
                            </Item.Content>
                        </Item>
                      )}
                    </Item.Group>
                    :
                    <Dimmer active inverted>
                        <Loader inverted>검색 결과를 가져오고 있습니다.</Loader>
                    </Dimmer>}
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => {this.result_close()}}> 닫기 </Button>
                </Modal.Actions>
            </Modal>

        return (
            <React.Fragment>
              <Input placeholder='네이버 쇼핑 검색' action size='mini' style={{ marginTop: '5px', marginBottom: '15px', marginLeft: '-5px' }}>
                <Popup content='네이버 쇼핑에서 먼저 검색해보시면 어떨까요?' position='left center'
                       trigger={<Image src="http://localhost:8000/media/naver_symbol.png" size='mini' as='a'/>} />&ensp;

                <input style={{width:'150px'}} ref={node => {this.state.query = node}}/>
                <Button color='green' type='submit' onClick={() => {
                  if (this.state.query.value == "")
                    alert('검색어를 입력해주세요.')
                  else {
                    this.result_show(),
                    prepare_search_click(),
                    search_click(this.state.query.value)
                  }
                }}> Search </Button>
              </Input>
              {/*<Form.Input fluid icon='user' iconPosition='left' placeholder='네이버 쇼핑 검색'
                          onChange={(e) => this.setState({ query : e.target.value })}/>

              <Button type='submit' onClick={() => {
                if (this.state.query.length != 0) {
                  this.result_show(),
                  prepare_search_click(),
                  search_click(this.state.query)
                }
                else
                  alert('검색어를 입력해주세요.')
              }}>Search</Button>*/}
              {result_content}
            </React.Fragment>
        )

    }
}

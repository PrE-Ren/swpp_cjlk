import React from 'react'
import { Button, Image, Form, Icon, Grid } from 'semantic-ui-react'

// is_captcha_loaded : 캡챠 이미지 로드가 완료되었는지 여부
// is_captcha_verified : 캡챠 인증이 완료되었는지 여부
// load_captcha_click : 새로고침 버튼을 눌렀을 때 액션을 디스패치할 함수
// confirm_captcha_click : 보안문자를 입력하고 확인 버튼을 눌렀을 때 액션을 디스패치할 함수
export class Captcha extends React.Component {
  state = { value: null, captcha_code: "" }
  handle_captcha_code = (e) => this.setState({ captcha_code: e.target.value })

  render() {
    const { is_captcha_loaded, is_captcha_verified, prepare_load_captcha_click, load_captcha_click, confirm_captcha_click } = this.props

    const image =
      (is_captcha_loaded)
      ? <Image src={"http://localhost:8000/" + sessionStorage.getItem("captcha_image")}></Image>
      : <Image src={"http://localhost:8000/media/captcha_default.jpg"}></Image>

    return (
      (is_captcha_verified == false)
      ?
      <Grid column={2}>
        <Grid.Row>

          {/* 캡챠 이미지 */}
          <Grid.Column width={10}>
            {image}
          </Grid.Column>

          {/* 새로고침 버튼 */}
          <Grid.Column width={6}>
            <Button onClick={() => { prepare_load_captcha_click(), load_captcha_click() }}><Icon name='refresh' />새로고침</Button>
          </Grid.Column>

        </Grid.Row>
        <Grid.Row>

          {/* 보안문자 입력 란 */}
          <Grid.Column width={12}>
            <Form.Input id="captcha" icon='checkmark' iconPosition='left' placeholder='captcha code' onChange={this.handle_captcha_code} />
            <div></div>
          </Grid.Column>

          {/* 보안문자 확인 란 */}
          <Grid.Column width={4}>
            <Button onClick={() => {
              confirm_captcha_click(sessionStorage.getItem("captcha_key"), this.state.captcha_code),
              document.getElementById("captcha").value = "",
              this.setState({ captcha_code: "" })
            }}>확인</Button>
          </Grid.Column>

        </Grid.Row>
      </Grid>
      :
      <Form.Input disabled icon='checkmark' iconPosition='left' defaultValue="보안문자 인증 완료" />)
  }

  componentDidMount() {
    this.props.load_captcha_click()  //  saga에 의해서 세션 스토리지에 이미지 파일 경로와 키 값이 저장되고, LOAD_IMAGE_SUCCESS 액션을 날려서 리듀서를 통해 참으로 설정
  }
}

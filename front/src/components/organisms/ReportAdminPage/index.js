import React from 'react'
import ReportInfo from '../../../containers/ReportInfo'
import { Card, Header, Grid, Modal } from 'semantic-ui-react'

export const ReportAdminPage = ({username, report_info_list}) => {
    console.log(username)
    if(username == 'admin')
    {
        console.log("hi")
        console.log(report_info_list)
        if(report_info_list != null)
        {
            console.log("something is in")
            let report_infos = JSON.parse(report_info_list)
            return(   
              <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column>
                <Header as='h1' color='teal' textAlign='center'>User Reports</Header>
                <Card.Group>      
                    {report_infos.map(report_info =>
                    <Card key = {report_info.id}>
                        <ReportInfo report_info = {report_info}/>
                    </Card> 
                    )}
                </Card.Group> 
                </Grid.Column>
              </Grid>
            )
        }
        else
            return (<div></div>)
    }
    else
        return (<div></div>)
}
import React from 'react'
import ReportInfo from '../../../containers/ReportInfo'

export const ReportAdminPage = (state) => {
    //if(state.username == 'admin') 등의 요소가 필요하나 아직 백엔드 구현 덜되어서 놔둠
    if(state.report_info_list != null)
    {
        let report_infos = JSON.parse(state.report_info_list)
        {report_infos.map(report_info =>
            <ReportInfo report_info = {report_info}/>
        )}
    }
}
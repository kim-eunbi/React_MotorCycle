import React from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function CheckBox() {
    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
                <Panel header="바이크 브랜드" key="1">
                    오토바이야 잘 팔려라
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox

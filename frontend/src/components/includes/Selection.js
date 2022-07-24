import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function Selection() {
    return (
        <Tabs style={{ width: 525 }}
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="CS" title="CS">
                123123
            </Tab>
            <Tab eventKey="Language" title="언어">
                456456
            </Tab>
            <Tab eventKey="base" title="기본질문 및 개발상식" >
                678678
            </Tab>
            <Tab eventKey="position" title="직무별" >
                890890
            </Tab>
        </Tabs>
    );
}

export default Selection;
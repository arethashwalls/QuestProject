import React from 'react';
import QuestNav from '../../components/QuestNav';
import Chart from '../../components/Chart';

const Quest = props => {
    return <div>
        <QuestNav theme={props.theme} signedIn={props.signedIn} />
        <Chart theme={props.theme}/>
    </div>
}

export default Quest;
import React from 'react';
import QuestNav from '../../components/QuestNav';
import Chart from '../../components/Chart';

const Quest = props => {
    return <div>
        <QuestNav theme={props.theme} signedIn={props.signedIn} />
        <Chart />
    </div>
}

export default Quest;
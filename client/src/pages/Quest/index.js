import React from 'react';
import QuestNav from '../../components/QuestNav';

const Quest = props => {
    return <div>
        <QuestNav theme={props.theme} signedIn={props.signedIn} />
    </div>
}

export default Quest;
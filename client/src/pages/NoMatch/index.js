import React from 'react';

const NoMatch = () => {
    return <div>
        <div class="text-center">
        <img src={process.env.PUBLIC_URL + "/images/quest.png"} />
    
        </div>
        <br></br> 
        <div class="nom">
        <h1 class="text-center">
                No Quests Here, Young Adventurer...
            </h1>
        </div>
        <div class="absolute">
        <img src={process.env.PUBLIC_URL + "/images/404.png"} />
        </div>
        <div>
            <h1 class="text-center">
                Return to Your Quests...
            </h1>
            </div>
    </div>
}

export default NoMatch;
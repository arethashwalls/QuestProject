import React from "react";

const NoMatch = () => {
  return (
    <div>
      <div className="text-center">
        <img src={process.env.PUBLIC_URL + "/images/quest.png"} />
      </div>
      <br />
      <div className="nom">
        <h1 class="text-center">No Quests Here, Young Adventurer...</h1>
      </div>
      {/* <div className="absolute"> */}
      <img
        src={process.env.PUBLIC_URL + "/images/404.png"}
        className="center"
      />
      {/* </div> */}
      <div>
        <h1 className="text-center">Return to Your Quests...</h1>
      </div>
    </div>
  );
};

export default NoMatch;

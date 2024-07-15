import React from "react";

import Comments from "./Comments.tsx";
import Header from "./Header.tsx";
import Designers from "./Designers.tsx";


const App: React.FC = () => {
    return (
        <div>
            <Header />
            <Comments />
            <Designers />
        </div>
    );
};

export default App;

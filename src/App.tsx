import React from "react";

import Comments from "./Comments.tsx";
import Header from "./Header.tsx";

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <Comments />
        </div>
    );
};

export default App;

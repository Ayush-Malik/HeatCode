import "./PreLoader.scss";

export default function PreLoader() {
    return (
        <div className="preloader">

            {/* container */}
            <div className="preloader__container">

                {/* heatcode logo to animate */}
                <svg xmlns="http://www.w3.org/2000/svg" width="500" height="370">
                    <g id="main_layer">
                        <g id="layer1">
                            <path style={{fill:"#75dbef", stroke:"none"}} d="M247 169C242.923 196.221 217.346 224.241 201.86 246C188.767 264.397 190.16 293.265 204.015 311C209.28 317.739 219.356 329.712 228.96 324.427C240.733 317.949 230.794 307.207 227.454 299C224.993 292.955 224.478 286.471 225.174 280C228.365 250.294 255.962 229.137 256 198C256.011 189.219 255.112 174.314 247 169z"/>
                        </g>
                        <g id="layer2">
                            <path style={{fill:"#75dbef", stroke:"none"}} d="M268 203C268 221.663 260.051 235.648 250.217 251C244.48 259.956 235.142 270.525 237.34 282C241.013 301.175 264.175 297.948 272.56 285C288.479 260.42 283.905 226.644 268 203z"/>
                        </g>
                        <g id="layer3">
                            <path style={{fill:"#75dbef", stroke:"none"}} d="M293 240C293 264.693 288.886 285.895 271.826 305C265.43 312.163 258.013 318.07 250.001 323.309C247.622 324.864 242.774 327.17 243.752 330.787C244.96 335.255 251.835 333.692 255 333.282C265.256 331.953 274.455 328.995 283 322.957C308.273 305.097 314.869 263.355 293 240z"/>
                        </g>
                    </g>
                </svg>

                {/* heatcode text with wavy animation */}
                <div className="preloader_text">
                    <span id="a">H</span>
                    <span id="b">e</span>
                    <span id="c">a</span>
                    <span id="d">t</span>
                    <span id="e">C</span>
                    <span id="f">o</span>
                    <span id="g">d</span>
                    <span id="h">e</span>
                </div>
            </div>


            {/* bubbles section for additional animation */}
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>
            <div className="bubble"><span className="dot"></span></div>

        </div>
    );
}
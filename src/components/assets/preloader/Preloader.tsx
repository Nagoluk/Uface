import React from 'react';
import {ReactComponent as PreloaderSVG} from '../../../img/common/preloader.svg';

const Preloader: React.FC = () => {
    return (<div className="preloader">
                <div>
                    <PreloaderSVG/>
                </div>
            </div>)
}

export default Preloader
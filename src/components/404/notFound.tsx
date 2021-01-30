import React from 'react';
import notFound from '../../img/Preloader/notFound.gif'


class NotFound extends React.Component {
    componentDidMount() {
        document.title = 'Not found';
    }

    render() {
        return (<div style={{textAlign: 'center', marginTop: '40px'}}>
                    <img src={notFound} alt="Not found"/>
                    <h2>404 Not Found</h2>
                </div>)

    }
}

export default NotFound;
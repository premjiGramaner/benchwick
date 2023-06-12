import React from 'react';

import { URLS } from '@Utils/constants';
import { IDefaultPageProps } from '@Interface/index';

class AuthComponentWrapper extends React.Component<any, { hasError: boolean }> {
    private initialState: { hasError: boolean } = {
        hasError: false,
    };

    constructor(props: IDefaultPageProps) {
        super(props);
        this.state = this.initialState;
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1 className='main-state-global-error'>Oops!!! Something went wrong.</h1>;
        }

        return (
            <React.Fragment>
                <div className="benchwick-container" data-testid="benchwick-container">
                    {/* <div className="container-fluid page-body-wrapper"> */}
                    <div className="page-body-wrapper">
                        {this.props?.children || null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AuthComponentWrapper;
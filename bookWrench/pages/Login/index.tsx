import React from 'react';
import View from './View';

const Login = (props: any) => {
    return (
        <div className="container mx-auto px-4 h-screen -mt-16 flex justify-center items-center">
            <div className="bg-white border-solid border mx-auto text-center py-16 px-20 rounded-lg">
                <View {...props} />
            </div>
        </div>
    );
};

export default Login;

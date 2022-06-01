import React, { useEffect } from 'react';
import View from './View';
import HeaderLogin from '@widgets/HeaderLogin';
import FooterLogin from '@widgets/FooterLogin';
import './login.scss';

const Login = (props) => {

    useEffect(() => {
            const header = document.getElementsByClassName("header")[0];
            header?.classList?.add("hidden")
    },[])


    return (
        <div className="wrapper login-wrap">
                <HeaderLogin/>
                <div className="login-page">
                    <div className="mx-auto flex justify-center items-center sm:px-4">
                        <div className="bg-white w-full  sm:w-[448px] border-solid border mx-auto text-center rounded-lg my-12 xl:my-28">
                            <View {...props} />
                        </div>
                    </div>
               
                 </div>
            <FooterLogin/>
        </div>

    );
};

export default Login;

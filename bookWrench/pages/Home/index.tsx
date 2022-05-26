import React from 'react';
// import globals from "@globals";
import Login from '@pages/Login';

const Home = (props: any) => {
    // const [isShimmerVisible, setShimmer] = useState(false);

    // useEffect(() => {
    //     getAppSettings();
    // }, []);

    // const getAppSettings = () => {
    //     // alert(10)
    //     const isAuth = globals.getCookie('isauth');

    //     setShimmer(true);
    //     if (typeof window != "undefined" && window.location.search && window.location.search.length > 0) {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         let search = urlParams.get('q')
    //         if(search){
    //             search = atob(search)
    //             search = JSON.parse(search);
    //             setReqParams(search)
    //         }else{
    //             let obj = {
    //                 type:urlParams.get("type"),
    //                 email:urlParams.get("email"),
    //                 invitedBy:urlParams.get("invitedBy"),
    //             }
    //             setReqParams(obj)
    //         }
    //     }
    //     globals.getAPIResponse({ pageName, setDataCallback: appSettingCB });

    // }
    return (
        <>
            <Login {...props} />
        </>
    );
};

export default Home;

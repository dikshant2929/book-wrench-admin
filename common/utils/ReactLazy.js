const defaultProps = {
    delay: 0,
    rootMargin: '0px',
    threshold: 0,
    autoDisconnect: true,
};

const ReactLazy = (props, cb) => {
    if ((!props || !props.element) && typeof props.element !== 'object') {
        if (typeof cb == 'function') {
            cb(false);
        }
        return;
    }
    //Assign defaultProps into props
    props = { ...defaultProps, ...props };

    //ES6 Functions for handling
    const getTimeoutData = (element) => element.getAttribute('data-timeout');
    const setTimeoutData = (element, value) => element.setAttribute('data-timeout', value);
    const deleteTimeoutData = (element) => element.removeAttribute('data-timeout');

    let delayLoad = (element, delayTime) => {
        var timeoutId = getTimeoutData(element);
        if (timeoutId) {
            return; // timeout was already set, do nothing
        }
        timeoutId = setTimeout(function () {
            loadAndUnobserve(element);
            cancelDelayLoad(element);
        }, delayTime);
        setTimeoutData(element, timeoutId);
    };

    let cancelDelayLoad = (element) => {
        var timeoutId = getTimeoutData(element);
        if (!timeoutId) {
            return; // do nothing if timeout doesn't exist
        }
        clearTimeout(timeoutId);
        deleteTimeoutData(element);
    };

    let loadAndUnobserve = (element, entries, obsrvr) => {
        // console.log("switch", element);
        if (!element) return;

        switch (props.type) {
            case 'cls':
                if (element.getAttribute('data-lazy-cls')) {
                    element.classList.add(element.getAttribute('data-lazy-cls'));
                    element.removeAttribute('data-lazy-cls');
                }
                break;
            case 'bg':
                if (element.getAttribute('url')) {
                    element.style.backgroundImage = `url("${element.getAttribute('url')}")`;
                }
                break;
            // case 'content':
            //     var img = element.querySelectorAll('img');
            //     if (img) {
            //         for (let i = 0; i < img.length;  i++) {
            //             ReactLazy({ element: img[i] , type:'content'}, function (element) {
            //                 element.src = element.getAttribute('data-gsll-src');
            //             });
            //         }
            //     }
            //     break;
            case 'iframe':
                if (element.getAttribute('data-gsll-src')) {
                    element.src = element.getAttribute('data-gsll-src');
                    element.removeAttribute('data-gsll-src');
                }
                break;
            default:
        }

        if (typeof cb == 'function') {
            cb(element, entries, obsrvr);
        }

        if (props.autoDisconnect) {
            observer = observer.disconnect();
        }
    };

    let handleIntersection = (entries, obsrvr) => {
        if (!entries[0].isIntersecting) {
            // if (window.requestIdleCallback) {
            //     window.requestIdleCallback(() => {
            //         //cb(false);
            //         cancelDelayLoad(props.element);
            //     });
            // } else {
            // cancelDelayLoad(props.element);
            // }
            if (typeof cb == 'function') {
                cb(false, entries, obsrvr);
            }
            return;
        }

        // if (window.requestIdleCallback) {
        //     window.requestIdleCallback(() => {
        //         // console.log(props.delay)
        //         delayLoad(props.element, props.delay);
        //     });
        // } else {
        // delayLoad(props.element, props.delay);
        loadAndUnobserve(props.element, entries, obsrvr);
        // }
    };

    let observer = new IntersectionObserver(handleIntersection, {
        rootMargin: props.rootMargin,
        threshold: props.threshold,
    });

    // console.log(props.element);
    observer.observe(props.element);
};

export default ReactLazy;

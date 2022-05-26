import React, { PropsWithChildren, useState } from 'react';
import { TooltipProps } from './interfaces';
const defaultProps = {};

function Tooltip(props: PropsWithChildren<TooltipProps>) {
    let items = props.items;
    let direction = props.direction;
    let line = props.line;
    const [stateData, stateDataSet] = useState(false);

    const handleHover = (flag: any) => {
        stateDataSet(flag);
    };
    return (
        <div data-attr="tooltip" onMouseOver={() => handleHover(true)} onMouseOut={() => handleHover(false)}>
            <i className="connecto-icons help" title="">
                help_outline
            </i>

            {stateData && (
                <div className={`body ${direction} ${line}`}>
                    <p>{items}</p>
                </div>
            )}
        </div>
    );
}

Tooltip.defaultProps = defaultProps;
export default Tooltip;

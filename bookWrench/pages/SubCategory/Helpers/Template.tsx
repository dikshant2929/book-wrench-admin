import React from 'react';
import { withRouter } from 'react-router-dom';
import constant from './constant';
import encrypt from '@app/storage/encrypt';
import exposedPath from '@ExposedPath';
const { SubCategory } = exposedPath;

// Campaign List Table Action Buttons (Edit, View, Expire)
const TableEditViewExpire = ({ data, history, reloadTable }: any) => {
    const { edit, expire } = constant; // Buttons

    const onClickHandaler = (eventId: any, data: any) => {
        // console.log({ eventId, data });
        // return;
        switch (eventId) {
            case edit.id: //Edit Campaign
                const editPath = `${SubCategory}/edit/${encrypt.encode(JSON.stringify({ ...data, type : "Edit" }))}`;
                history.push(editPath, data);
                break;
            // case expire.id: // Expire Campaign
            //     const expireCampaign = new ExpireCampaign(data.id, 'expire');
            //     const popupContent = (
            //         <ExpireCampaignYesPopup expireCampaign={expireCampaign} data={data} reloadTable={reloadTable} />
            //     );
            //     popupContents({ contents: popupContent, title: '' });
            //     popupToggler(); //Open Popup
            //     break;
        }
    };

  
    
    return (
        <div className="flex">
            {/* Edit Icon //////////////////////////////////////////*/}
            {data.actions?.includes(edit.id) && (
                    <span
                        onClick={() => onClickHandaler(edit.id, data)}
                        title={edit.name}
                        className="cursor-pointer m-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </span>
            )}
        </div>
    );
};
export default withRouter(TableEditViewExpire);
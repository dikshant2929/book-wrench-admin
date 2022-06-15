import React from 'react';
import { withRouter } from 'react-router-dom';
import constant from './constant';
import encrypt from '@app/storage/encrypt';
import exposedPath from '@ExposedPath';
import { popupContents, popupToggler } from '@common/elements/Popup';
import Services from '../Services/department.service';
import { showToster } from '@common/elements/ToastNotification/new_index';
const { Department } = exposedPath;

export const ExpireCampaignYesPopup = (props: any) => {
    const onClickYes = () => {
        Services.deleteDepartment(props.data.id,{}, props.data.id,(res:any) => {
            showToster({ status: 'Success', msg: res.msg || 'Department Delete Successfully' });
            popupToggler(); 
            setTimeout(() => {
                props.reloadTable();
            }, 500);
        });
    };
 return (
        <>
            <p className="text-sm">
                Do you really want to delete <span className="font-bold">{props.data.title}</span> Department ?{' '}
            </p>
            <br />
            <span onClick={onClickYes} className="inline-block bg-green-500 text-white p-1 cursor-pointer px-4 py-2 rounded-md text-sm">
                Yes
            </span>
        </>
    );
};

// Campaign List Table Action Buttons (Edit, View, Expire)
const TableEditViewExpire = ({ data, history, reloadTable }: any) => {
  
    const { edit, expire } = constant; // Buttons

    const onClickHandaler = (eventId: any, data: any) => {
        // console.log({ eventId, data });
        // return;
        switch (eventId) {
            case edit.id: //Edit Campaign
                const editPath = `${Department}/edit/${encrypt.encode(JSON.stringify({ ...data, type : "Edit" }))}`;
                history.push(editPath, data);
                break;
            case expire.id: // Expire Campaign
               // const expireCampaign = new ExpireCampaign(data.id, 'expire');
                const popupContent = (
                    <ExpireCampaignYesPopup expireCampaign="" data={data} reloadTable={reloadTable} />
                );
                popupContents({ contents: popupContent, title: '' });
                popupToggler(); //Open Popup
                break;
        }
    };

    

    
    
    return (
        <div className="flex gap-2">
            {/* Edit Icon //////////////////////////////////////////*/}
            {data.actions?.includes(edit.id) && (
                    <span
                        onClick={() => onClickHandaler(edit.id, data)}
                        title={edit.name}
                        className="cursor-pointer p-[0.312rem] border border-gray-300 rounded-md "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </span>
            )}
            {/* Expire Icon //////////////////////////////////////////*/}
            {data.actions.includes(expire.id) && (
                    <span
                        onClick={() => onClickHandaler(expire.id, data)}
                        title={expire.name}
                        className="cursor-pointer  p-[0.312rem] border border-gray-300 rounded-md">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </span>
                
            )}
        </div>
    );
};
export default withRouter(TableEditViewExpire);
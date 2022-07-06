import React from 'react';
import { withRouter } from 'react-router-dom';
import constant from './constant';
import encrypt from '@app/storage/encrypt';
import exposedPath from '@ExposedPath';
import { popupContents, popupToggler } from '@common/elements/Popup';
import Services from '../Services/maintenance.service';
import { showToster } from '@common/elements/ToastNotification/new_index';

const { Maintenance } = exposedPath;

export const ExpireCampaignYesPopup = (props: any) => {
    const onClickYes = () => {
        Services.deleteMaintenance(props.data.id,{}, props.data.id,(res:any) => {
            showToster({ status: 'Success', msg: res.msg || 'Service Delete Successfully' });
            popupToggler(); 
            setTimeout(() => {
                props.reloadTable();
            }, 500);
        });
    };
    const onClickNo = () => {
        popupToggler(); 
    };
 return (
        <>
            <p className="text-sm">
                Do you really want to delete <span className="font-bold">{props.data.title}</span> Service ?{' '}
            </p>
            <br />
            <span onClick={onClickYes} className="inline-block bg-green-500 text-white p-1 cursor-pointer px-4 py-2 rounded-md text-sm">
                Yes
            </span>
            <span className="inline-block ml-2 bg-gray-200 text-black p-1 cursor-pointer px-4 py-2 rounded-md text-sm" onClick={onClickNo}>No</span>
        </>
    );
};

// Campaign List Table Action Buttons (Edit, View, Expire)
const TableEditViewExpire = ({ data, history, reloadTable }: any) => {
    const { edit, expire,view } = constant; // Buttons

    const onClickHandaler = (eventId: any, data: any) => {
        // console.log({ eventId, data });
        // return;
        switch (eventId) {
            case edit.id: //Edit Campaign
                const editPath = `${Maintenance}/edit/${encrypt.encode(JSON.stringify({ ...data, type : "Edit" }))}`;
                history.push(editPath, data);
                break;
            case view.id: //Edit Campaign
                const viewPath = `${Maintenance}/view/${encrypt.encode(JSON.stringify({ ...data, type : "View" }))}`;
                history.push(viewPath, data);
                break;
            case expire.id: // Expire Campaign
              //  const expireCampaign = new ExpireCampaign(data.id, 'expire');
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
            {data.actions.includes(view.id) && (
                    <span
                        onClick={() => onClickHandaler(view.id, data)}
                        title={view.name}
                        className="cursor-pointer  p-[0.312rem] border border-gray-300 rounded-md">
                       <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 65.06" xml:space="preserve"><g><path d="M0.95,30.01c2.92-3.53,5.98-6.74,9.15-9.63C24.44,7.33,41.46,0.36,59.01,0.01c17.51-0.35,35.47,5.9,51.7,19.29 c3.88,3.2,7.63,6.77,11.24,10.74c1.16,1.28,1.22,3.17,0.23,4.51c-4.13,5.83-8.88,10.82-14.07,14.96 C95.12,59.88,79.34,64.98,63.35,65.06c-15.93,0.07-32.06-4.86-45.8-14.57c-6.14-4.34-11.81-9.63-16.78-15.85 C-0.34,33.24-0.23,31.27,0.95,30.01L0.95,30.01z M61.44,26.46c0.59,0,1.17,0.09,1.71,0.24c-0.46,0.5-0.73,1.17-0.73,1.9 c0,1.56,1.26,2.82,2.82,2.82c0.77,0,1.46-0.3,1.97-0.8c0.2,0.6,0.3,1.24,0.3,1.9c0,3.35-2.72,6.07-6.07,6.07 c-3.35,0-6.07-2.72-6.07-6.07C55.37,29.18,58.09,26.46,61.44,26.46L61.44,26.46z M61.44,10.82c5.99,0,11.42,2.43,15.35,6.36 c3.93,3.93,6.36,9.35,6.36,15.35c0,5.99-2.43,11.42-6.36,15.35c-3.93,3.93-9.35,6.36-15.35,6.36c-5.99,0-11.42-2.43-15.35-6.36 c-3.93-3.93-6.36-9.35-6.36-15.35c0-5.99,2.43-11.42,6.36-15.35C50.02,13.25,55.45,10.82,61.44,10.82L61.44,10.82z M71.89,22.08 c-2.67-2.67-6.37-4.33-10.45-4.33c-4.08,0-7.78,1.65-10.45,4.33c-2.67,2.67-4.33,6.37-4.33,10.45c0,4.08,1.65,7.78,4.33,10.45 c2.67,2.67,6.37,4.33,10.45,4.33c4.08,0,7.78-1.65,10.45-4.33c2.67-2.67,4.33-6.37,4.33-10.45C76.22,28.45,74.56,24.75,71.89,22.08 L71.89,22.08z M14.89,25.63c-2.32,2.11-4.56,4.39-6.7,6.82c4.07,4.72,8.6,8.8,13.45,12.23c12.54,8.85,27.21,13.35,41.69,13.29 c14.42-0.07,28.65-4.67,40.37-14.02c4-3.19,7.7-6.94,11.03-11.25c-2.79-2.91-5.63-5.54-8.51-7.92C91.33,12.51,75,6.79,59.15,7.1 C43.34,7.42,27.93,13.76,14.89,25.63L14.89,25.63z"/></g></svg>
                    </span>
                
            )}
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
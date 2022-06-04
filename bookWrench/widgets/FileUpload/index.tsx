import React, { useState, useRef, useContext } from 'react';
import { FileDrop } from 'react-file-drop';
import './file_upload.css';
import TableView from '@common/widgets/TableView';
import RightMark from '@common/icons/Right';
import CrossMark from '@common/icons/CrossMark';
import Button from '@common/elements/Button';
import Services from './Services';
import { showToster } from '@common/elements/ToastNotification/new_index';
import ShimmerEffect from '@common/elements/ShimmerEffect';
import { HeaderProps } from '@common/widgets/TableView/interfaces';

const defaultConfig = {
    title: 'Errors',
    table: {
        totalRecords: 0,
        filteredRecords: 0,
        heading: [
            {
                key: 'rowNo',
                value: 'Row No',
                isShown: true,
            },
            {
                key: 'cellNo',
                value: 'Cell No',
            },
            {
                key: 'reason',
                value: 'Reason',
            },
        ],
        dataList: [],
    },
};

interface FileUploadArgs {
    fileValidationAPIKey: string;
    fileUploadAPIKey: string;
    requestFileName: string;
    text: string;
    onClose: (args: any | {}) => any;
}


const FileUpload = (props: FileUploadArgs) => {

    const [isShimmerVisible, setShimmer] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [tableConfig, setTableConfig] = useState<any>(defaultConfig);
    const [tableHeaders, setTableHeaders] = useState<HeaderProps[]>(tableConfig?.table?.heading);
    const [ isYesSelected, setYesSelection] = useState(false);
    const [ canContinue, setCanContinue] = useState(false);
    const [ errorMsg, setErrorMsg] = useState(null);
    const [ response, setResponse] = useState('');

    const fileInputRef = useRef<any>(null);
    const styles = { border: '2px dashed rgba(0,0,0,.2)', width: 570, color: 'black', padding: 5, cursor: 'pointer' };

    const onFileInputChange = (event: any) => {
        const { files } = event.target;
        // do something with your files... 
        console.log(URL.createObjectURL(files[0]));
        setSelectedFile(files);
    }

    const onTargetClick = () => {
        fileInputRef?.current?.click?.()
    }

    const onCrossMarkStart = () => {
        setSelectedFile(null);
        setYesSelection(false);
    }

    const onFileDropped = (files: any, event:any) => {
        setSelectedFile(files);
        event.preventDefault();
    }

    const updateHeader = (data: any) => {
        setTableHeaders(data);
    };

    const resetData = () => {
        setErrorMsg(null);
        const prevConfig = {...tableConfig};
        prevConfig.table.dataList = [];
        setTableConfig({...prevConfig});
        setCanContinue(false);
    }

    const onPositiveClick = () => {
        resetData();
        if(selectedFile[0]){
            const formData = new FormData();
            formData.append(props.requestFileName,selectedFile[0])
            setShimmer(true);
            Services.uploadInventoryFileValidation(props.fileValidationAPIKey, formData, (data) => {
                const {affectedRowsDetails = [], canContinue = false, errorMsg = null} = data;
                const exitingTableConfig = {...tableConfig};
                exitingTableConfig.table.dataList = affectedRowsDetails || [];
                setTableConfig({...exitingTableConfig});
                setCanContinue(canContinue);
                setErrorMsg(errorMsg);
                setResponse(data);
                setShimmer(false);
                setSelectedFile(null);
            }, (error) => {
                setErrorMsg(error);
                setShimmer(false);
            })
        }
        setYesSelection(true);
    }

    const continueButtonClick = () => {
        

        const formData = new FormData();
        formData.append(props.requestFileName,selectedFile[0]);
        formData.append('validationdto', JSON.stringify(response));
        setShimmer(true);
        Services.createInventoryFromFile(props.fileUploadAPIKey, formData, (data) => {
            showToster({ status: data.message === "success" ? "Success" : "Error", msg: data.responseMessage });
            props.onClose(false);
            setShimmer(false);
            setTimeout(() => {
                window.location.reload();
            },3000)
        }, (error) => {
            setErrorMsg(error);
            setShimmer(false);
        })

    }

    if(isShimmerVisible){
        return <ShimmerEffect height={10} count={1} visible={isShimmerVisible} type="grid" />
    }
    return (<>
        {
            selectedFile
                ?
                <div className='flex items-center my-5 border p-4'>
                    {console.log(selectedFile)}
                    <span className="text-sm mr-2">{selectedFile?.[0]?.name}</span>
                    <RightMark onClick={onPositiveClick}/>                    
                    <CrossMark onClick={onCrossMarkStart}/>
                </div>
                :
                <div className='flex items-center' >
                    <input
                        onChange={onFileInputChange}
                        ref={fileInputRef}
                        type="file"
                        className='hidden'
                    />
                    <div style={styles}>
                        <FileDrop
                            onDrop={(files, event) => onFileDropped(files, event)}
                            onTargetClick={onTargetClick}>
                            {props.text}
                        </FileDrop>
                    </div>
                </div>
        }

        {
            isYesSelected && 
            <>
                <TableView
                    config={tableConfig}
                    isLoading={false}
                    showColumnPicker={false}
                    tableHeaders={tableHeaders}
                    updateHeader={updateHeader}
                />

                { errorMsg && <span className='text-red-500 block mb-3 text-sm mt-4'>{errorMsg}</span> }
                { tableConfig.table.dataList.length === 0 && !errorMsg && <span className='text-green-500'>No Error Exists</span> }
                { canContinue && <Button title="Continue" onClick={continueButtonClick}/>}
            </>
        }

    </>)
}

export default FileUpload;
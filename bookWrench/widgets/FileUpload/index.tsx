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


interface FileUploadArgs {
    fileValidationAPIKey: string;
    fileUploadAPIKey: string;
    requestFileName: string;
    text: string;
    title:string
    imagePath: (args: any | {}) => any;
    onClose: (args: any | {}) => any;
    
}


const FileUpload = (props: FileUploadArgs) => {
    const [isShimmerVisible, setShimmer] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);
   
    const fileInputRef = useRef<any>(null);
    const styles = { border: '2px dashed rgba(0,0,0,.2)', width: 570, color: 'black', padding: 5, cursor: 'pointer', height: 80 };

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
       
    }

    const onFileDropped = (files: any, event: any) => {
        setSelectedFile(files);
        event.preventDefault();
    }

    const onPositiveClick = () => {
        if (selectedFile[0]) {
            const formData = new FormData();
            formData.append('file', selectedFile[0])
            setShimmer(true);
            Services.uploadInventoryFileValidation('uploadImage', formData, (data) => {
                if(data){
                    props?.imagePath?.(data.url)
                }
                
            }, (error) => {
                setShimmer(false);
            })
        }
       
    }

    if (isShimmerVisible) {
        return <ShimmerEffect height={10} count={1} visible={isShimmerVisible} type="grid" />
    }
    return (<>
        {
            selectedFile
                ?
                <div className='flex items-center my-5 border p-4 h-20'>
                    <span className="text-sm mr-2">{selectedFile?.[0]?.name}</span>
                    <RightMark onClick={onPositiveClick} />
                    <CrossMark onClick={onCrossMarkStart} />
                </div>
                :
                <div className='file_upload w-[28%]'>
                    <label className="text-xs text-gray-700 mb-1 text-left">{props.title}</label>
                    
                    <div className='flex items-center' >
                                              
                        <input
                            onChange={onFileInputChange}
                            ref={fileInputRef}
                            type="file"
                            className='hidden'  />
                        
                        <div style={styles}>
                            <FileDrop
                                onDrop={(files, event) => onFileDropped(files, event)}
                                onTargetClick={onTargetClick}>
                                {props.text}
                            </FileDrop>
                            
                        </div>
                        
                    </div>
                </div>
        }

        
    </>)
}

export default FileUpload;
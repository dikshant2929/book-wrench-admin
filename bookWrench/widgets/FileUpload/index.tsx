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
    title: string
    imagePath: (args: any | {}) => any;
    onClose: (args: any | {}) => any;

}


const FileUpload = (props: FileUploadArgs) => {
    const [imageUploadStatus, setImageUploadStatus] = useState(false);
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

            Services.uploadInventoryFileValidation('uploadImage', formData, (data) => {
                if (data) {
                    props?.imagePath?.(data.url);
                    setImageUploadStatus(true);
                }

            }, (error) => {
                setImageUploadStatus(false);
            })
        }

    }


    return (<>
        {
            selectedFile
                ?
                <div className='flex items-center mt-7 border p-4 h-20'>
                    <span className="text-sm mr-2">{selectedFile?.[0]?.name}</span>
                    <RightMark onClick={onPositiveClick} />
                    <CrossMark onClick={onCrossMarkStart} />
                    {imageUploadStatus && <div className="ImageStatus text-green-500 text-xs ml-2">Image Added Successfully !!!</div>}
                </div>
                :
                <div className='file_upload w-[28%]'>
                    <label className="text-xs text-gray-700 mb-1 text-left">{props.title}</label>

                    <div className='flex items-center relative' >
                        <div className='file__details absolute inset-0 flex items-center gap-4 pl-4'>
                            <span className='icon rounded-md p-2.5 bg-gray-200 flex justify-center items-center text-gray-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            </span>
                            <div className='file_format_details'>
                                <p className='text-[#555555] text-sm'>Drop your docs here or <strong>Browse</strong></p>
                                <span className='text-gray-300 text-xs'>Support: jpg, jpeg,png</span>
                            </div>
                        </div>

                        <input
                            onChange={onFileInputChange}
                            ref={fileInputRef}
                            type="file"
                            className='hidden' />

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
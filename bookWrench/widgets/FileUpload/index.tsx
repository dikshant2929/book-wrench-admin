import React, { useState, useRef, useContext, useEffect } from 'react';
import { FileDrop } from 'react-file-drop';
import './file_upload.css';
import RightMark from '@common/icons/Right';
import CrossMark from '@common/icons/CrossMark';
import Services from './Services';


interface FileUploadArgs {
    fileValidationAPIKey: string;
    fileUploadAPIKey: string;
    requestFileName: string;
    text: string;
    title: string
    imagePath: (args: any | {}) => any;
    onClose: (args: any | {}) => any;
    imageURL?: string;
    parentClass? : string;
    acceptType?:string,
    supportType?:string
}

const defaultProps = {
    parentClass : "file_upload w-full md:w-[45%] lg:w-[28%]",
    acceptType:"*",
    supportType:"jpg, jpeg,png"

}


const FileUpload = (props: FileUploadArgs) => {
    const [imageUploadStatus, setImageUploadStatus] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [selectedFile, setSelectedFile] = useState<any>(null);
    

    const fileInputRef = useRef<any>(null);
    const styles = { border: '2px dashed rgba(0,0,0,.2)', width: 570, color: 'black', padding: 5, cursor: 'pointer', height: 80 };


    const getImageName = (url:string) => url.split('/').pop();

    useEffect(() => {
        if(props.imageURL){
            setImageURL(props.imageURL);
            setImageUploadStatus(true);
            setSelectedFile([{ name : "image"}]);
        }
    }, [props.imageURL])
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
                    setImageURL(data.url);
                    setImageUploadStatus(true);
                }

            }, (error) => {
                setImageUploadStatus(false);
            })
        }

    }

    const onCrossDeleteImage = () => {
        const imgName = getImageName(imageURL);
        Services.removefile('removeImage', imgName, () => {
            setImageURL("");
            setImageUploadStatus(false);
            setSelectedFile(null);
            props?.imagePath?.("");

        }, (error) => {
            console.log(error)
        })
        
    }


    return (<>
        {
            selectedFile
                ?
                <div className='flex items-center mt-6 border rounded-lg p-4 h-20 relative bg-[#E4E6F1] w-1/2'>
                    {!imageUploadStatus && <span className="text-sm mr-2">{selectedFile?.[0]?.name}</span>}
                    {!imageUploadStatus && <RightMark onClick={onPositiveClick} />}
                    {!imageUploadStatus && <CrossMark onClick={onCrossMarkStart} />}
                    { imageUploadStatus && imageURL && <div onClick={onCrossDeleteImage} className='edited__image w-20'><img className='w-8 h-8 mx-auto' src={imageURL}></img>
                    <span className='absolute top-1 right-1 hover:bg-red-200 hover:fill-[#DE350B]'><svg height="18" width="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className=""><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg></span></div>}
                    {/* {imageUploadStatus && <div className="ImageStatus text-red-500 text-xs font-semibold bg-white py-1.5 px-2 cursor-pointer rounded">Remove</div>} */}

                </div>                
                :
                <div className={props.parentClass}>
                    <label className="label__small text-left">{props.title}</label>

                    <div className='flex items-center relative' >
                        <div className='file__details absolute inset-0 flex items-center gap-4 pl-4'>
                            <span className='icon rounded-md p-2.5 bg-gray-200 flex justify-center items-center text-gray-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            </span>
                            <div className='file_format_details'>
                                <p className='text-[#555555] text-sm'>Drop your docs here or <strong>Browse</strong></p>
                                <span className='text-gray-300 text-xs'>Support: {props.supportType}</span>
                            </div>
                        </div>

                        <input
                            onChange={onFileInputChange}
                            ref={fileInputRef}
                            type="file"
                            className='hidden'
                            accept={props.acceptType}
                            />

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

FileUpload.defaultProps = defaultProps;
export default FileUpload;
import React, { useState, useEffect } from 'react';
import FileUpload from '@app/widgets/FileUpload';
import Services from './Services';

const defaultProps = {};
const MultipleDocUploader = (props) => {
	const [list, setList] = useState(props.list || []);
	const [isFileUploaderVisible,setFileUploaderVisible] = useState(true);


	const getImageName = (url) => url.split('/').pop();

    const onItemRemove = (item) => {
		const imgName = getImageName(item);
        Services.removefile('removeImage', imgName, () => {
			let existingList = [...list];
			existingList = existingList.filter((data) => data !== item);
			updateParentList(existingList);
			setList([...existingList]);

        }, (error) => {
            console.log(error)
        })

	};

    const updateParentList = (list) =>
    props.onListUpdate && props.onListUpdate([...list]);

   
	
	const onTextChange = (value) => {
		setFileUploaderVisible(false)
		const existingList = [...list];
		existingList.push(value);
		updateParentList(existingList);
		setList([...existingList]);
		setFileUploaderVisible(true)
	}

    return (
       <>
		<div className='video__wrapper'>
			<label className='label__small'>Documents</label>
			{list.map((item, key) =>  <div key={key} className='attached__docs flex bg-[#F2F3F7] basis__33 basis__48 justify-around py-6 rounded-lg'>
						<div className='flex gap-6 items-center'>
							<span className='docs__icon__name'>
								<svg xmlns="http://www.w3.org/2000/svg" width="21" height="27" viewBox="0 0 21 27" fill="none">
									<path d="M13.7503 0.520508H2.2C0.984974 0.520508 0 1.50548 0 2.72051V24.4019C0 25.617 0.984971 26.6019 2.2 26.6019H18.5273C19.7423 26.6019 20.7273 25.617 20.7273 24.4019V7.08006C20.7273 6.4617 20.467 5.87189 20.0103 5.45505L15.2333 1.0955C14.828 0.725587 14.2991 0.520508 13.7503 0.520508Z" fill="#77ABFA" />
									<path d="M14.5 5.75911V1.40369C14.5 1.23811 14.6897 1.14425 14.8213 1.24468L20.5295 5.60011C20.6816 5.7162 20.5995 5.95911 20.4082 5.95911H14.7C14.5895 5.95911 14.5 5.86957 14.5 5.75911Z" fill="#2268D1" />
									<line x1="5" y1="11.0923" x2="16" y2="11.0923" stroke="white" stroke-width="2" />
									<line x1="5" y1="15.2251" x2="16" y2="15.2251" stroke="white" stroke-width="2" />
									<line x1="5" y1="19.3584" x2="13" y2="19.3584" stroke="white" stroke-width="2" />
								</svg>
							</span>
							<span className='text-[#7D829F] font-semibold text-sm'>{getImageName(item)}</span>
						</div>
						<span onClick={() => onItemRemove(item)} className='cross__icon bg-[#DBDDE3] fill-[#989FAD] p-1.5 rounded-full cursor-pointer'>
							<svg height="18" width="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class=""><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
						</span>
					</div> 
				)}
            </div>
			{isFileUploaderVisible && <div className='pb-7 border-b-2 border-gray-100'>
                	<FileUpload supportType="txt,pdf,doc,docx" acceptType=".txt,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" parentClass='file_upload md:w-[36%]' imageURL="" title="" imagePath={onTextChange} />
             </div>}
	 </>
    );
};

MultipleDocUploader.defaultProps = defaultProps;
export default MultipleDocUploader;




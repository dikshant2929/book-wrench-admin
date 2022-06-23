import React, { useState, useEffect } from 'react';
import FileUpload from '@app/widgets/FileUpload';
import Services from './Services';

const defaultProps = {};
const MultipleImageUploader = (props) => {
	const [list, setList] = useState(props.list || []);
	const [isFileUploaderVisible, setFileUploaderVisible] = useState(true);


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

	useEffect(() => {
		setList(props.list || [])
	},[props.list])
	
	return (
		<>
			<div className='images__wrapper pt-7'>
				<label className='label__small'>Images</label>
				<div className='image__inner flex flex-wrap gap-4 mb-3'>

					{list.map((item, key) => <div key={key} className='img__thumbnail flex flex-wrap gap-3 relative'>
						<a className="bg-[#DFE2E9] rounded-lg" href={item} target="_blank" download><img className='w-24 h-24' src={item} alt={item} /></a>						
						<div className='absolute right-0 p-1 rounded-2xl bg-[#80808038]'>
							<span onClick={() => onItemRemove(item)} className='cross__icon inline bg-[#DBDDE3] rounded-full cursor-pointer'>
								<svg height="18" width="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className=''><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
							</span>
						</div>
					</div>

					)}

				</div>
			</div>
			{isFileUploaderVisible && <div className='pb-7 border-b-2 border-gray-100'>
				<FileUpload supportType="jpeg,jpg,png" acceptType="image/png, image/jpeg" parentClass='file_upload' imageURL="" title="" imagePath={onTextChange} />
			</div>}
		</>
	);
};

MultipleImageUploader.defaultProps = defaultProps;
export default MultipleImageUploader;




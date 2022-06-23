import React, { useState, useEffect } from 'react';

const defaultProps = {};
const MultipleVideoUploader = (props) => {
	const [list, setList] = useState(props.list || []);
	const [addButtonActive, setAddButtonActive] = useState(false)
	const onItemRemove = (item) => {
		let existingList = [...list];
		existingList = existingList.filter((data) => data !== item);
		updateParentList(existingList);
		setList([...existingList]);
	};



	const updateParentList = (list) =>
		props.onListUpdate && props.onListUpdate([...list]);

	const onButtonClick = () => {

		const input = document.getElementById("video");
		if (!input.value) return;
		setAddButtonActive(false)
		const existingList = [...list];
		existingList.push(input.value);
		updateParentList(existingList);
		setList([...existingList]);

		input.value = ""
	};

	const onFocusInput = () => {
		setAddButtonActive(true)
	}

	useEffect(() => {
		setList(props.list || [])
	}, [props.list])

	return (
		<div>


			<div className='video__wrapper mt-4'>
				<label className='label__small'>Videos</label>
					<div className='flex gap-3 flex-wrap'>
				{list.map((item, key) =>
						<div key={key}  className='flex gap-3 mb-4'>
							<input disabled value={item} className='form__input_w_height ' type="text" />
							<span className="bg-[#FFEBE6] fill-[#E1F3EA] p-3.5 rounded-lg cursor-pointer" onClick={() => onItemRemove(item)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
									<path d="M10 8.58534L12.8284 5.75692L14.2426 7.17113L11.4142 9.99956L14.2426 12.828L12.8284 14.2422L10 11.4138L7.17157 14.2422L5.75736 12.828L8.58579 9.99956L5.75736 7.17113L7.17157 5.75692L10 8.58534ZM2.92893 17.0706C-0.976418 13.1653 -0.976418 6.83384 2.92893 2.92849C6.83428 -0.976861 13.1657 -0.976861 17.0711 2.92849C20.9764 6.83384 20.9764 13.1653 17.0711 17.0706C13.1657 20.976 6.83428 20.976 2.92893 17.0706ZM4.34315 15.6564C5.84344 17.1567 7.87827 17.9996 10 17.9996C12.1217 17.9996 14.1566 17.1567 15.6569 15.6564C17.1571 14.1561 18 12.1213 18 9.99956C18 7.87783 17.1571 5.84299 15.6569 4.3427C14.1566 2.84241 12.1217 1.99956 10 1.99956C7.87827 1.99956 5.84344 2.84241 4.34315 4.3427C2.84285 5.84299 2 7.87783 2 9.99956C2 12.1213 2.84285 14.1561 4.34315 15.6564Z" fill="#DE350B" />
								</svg>
							</span>
						</div>
						)}
					</div>
				<div className='flex items-center gap-3'>
					<input id="video" className='form__input_w_height md:w-1/2' onFocus={onFocusInput} type="text" placeholder="youtube.com/watch?v=Vowek3_420o" />
					<span className={`${addButtonActive ? "active bg-[#E1F3EA] " : "bg-gray-300 fill-current cursor-not-allowed"} p-3.5 rounded-lg cursor-pointer`} onClick={onButtonClick}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M9 9V5H11V9H15V11H11V15H9V11H5V9H9ZM10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18Z" fill="#00875A" />
						</svg>
					</span>
				</div>
			</div>



		</div>
	);
};

MultipleVideoUploader.defaultProps = defaultProps;
export default MultipleVideoUploader;




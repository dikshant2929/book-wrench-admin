import React, { useState, useEffect } from 'react';
import Services from './Services';
import globals from '@globals';

const defaultProps = {

};

const AssociatedProducts = (props) => {

    const [state, setState] = useState(null)

    useEffect(() => {
        const serviceIds = props.serviceId
        Services.productList({ serviceIds }, data => {
            setState(data)
        })

    }, [])

    if (globals.isEmptyObject(state)) return null;

    return (
        <>
        <hr/>
        <div className="w-auto flex flex-col lg:flex-row gap-4 m-10">
            <div className='basis__10 border-light'>
                <label className='text-base font-bold'>Associated Products</label>
            </div>
            <div className='flex gap-y-6 flex-col w-full'>
                <div className='products__wrapper flex-wrap lg:flex-nowrap flex flex-col md:flex-row gap-4'>
                    {state && state.map((item, key) => <div key={key} className='product w-[199px]  basis__48 rounded-lg border border-[#DFE2E9] py-[1.2rem]'>
                        <div className=''>
                            <div className='rounded-lg  mx-auto mb-3.5 w-[73px] h-[73px]'>
                                <img className='w-full h-full rounded-lg' src={item.icon} alt={item.title} />
                            </div>
                            <p className='text-center text-sm font-semibold mb-3'>{item.title}</p>
                            <p className='text-center font-medium text-xs text-[#B8B0B0]'>(#56933)</p>
                        </div>
                        <div className='flex justify-between px-4 items-center mt-4'>
                            <span className='text-[#B8B0B0] text-xs'>Qty <span className='text-black font-bold text-sm'>{item.quantity}</span></span>
                            <span className='bg-[#E1F3EA] text-[#00875A] text-15px font-semibold px-3 py-1.5 rounded-lg'>{item.price}$</span>
                        </div>
                    </div>)}
                </div>
                {/* <div>
                    <button className='w-full md:w-auto py-3 px-14 text-sm font-medium text-[#646982] bg-[#E4E6F1] rounded-md'>Show all</button>
                </div> */}
            </div>
        </div>
        </>
    );
};

AssociatedProducts.defaultProps = defaultProps;
export default AssociatedProducts;

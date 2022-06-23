import React, { useState, useEffect } from 'react';
;

const defaultProps = {
   
};

const AssociatedProducts = (props) => {
    

    return (
        <div className="w-auto flex flex-col lg:flex-row gap-4 m-10">
        <div className='basis__10 border-light'>
            <label className='text-base font-bold'>Associated Products</label>
        </div>
        <div className='flex gap-y-6 flex-col'>
        <div className='products__wrapper flex-wrap lg:flex-nowrap flex flex-col md:flex-row gap-4'>
            <div className='product basis__25 basis__48 rounded-lg border border-[#DFE2E9] py-4'>
                <div className='px-8'>
                    <div className='bg-[#DFE2E9] p-9 rounded-lg w-14 mx-auto mb-3.5'></div>
                    <p className='text-center text-sm font-semibold mb-3'>Replace Pilot Safety Sensor</p>
                    <p className='text-center font-medium text-xs text-[#B8B0B0]'>(#56933)</p>
                </div>                                
               
               
                    <div className='flex justify-between px-4 items-center mt-4'>
                        <span className='text-[#B8B0B0]'>Qty <span className='text-black font-bold'>10</span></span>
                        <span className='bg-[#E1F3EA] text-[#00875A] text-base font-semibold px-3 py-1.5 rounded-lg'>240$</span>
                    </div>
                
            </div>
            <div className='product basis__25 basis__48 rounded-lg border border-[#DFE2E9] py-4'>
                <div className='px-8'>
                    <div className='bg-[#DFE2E9] p-9 rounded-lg w-14 mx-auto mb-3.5'></div>
                    <p className='text-center text-sm font-semibold mb-3'>Replace Pilot Safety Sensor</p>
                    <p className='text-center font-medium text-xs text-[#B8B0B0]'>(#56933)</p>
                </div>
                <div className='flex justify-between px-4 items-center mt-4'>
                    <span className='text-[#B8B0B0]'>Qty <span className='text-black font-bold'>10</span></span>
                    <span className='bg-[#E1F3EA] text-[#00875A] text-base font-semibold px-3 py-1.5 rounded-lg'>240$</span>
                </div>
            </div>
            <div className='product basis__25 basis__48 rounded-lg border border-[#DFE2E9] py-4'>
                <div className='px-8'>
                    <div className='bg-[#DFE2E9] p-9 rounded-lg w-14 mx-auto mb-3.5'></div>
                    <p className='text-center text-sm font-semibold mb-3'>Replace Pilot Safety Sensor</p>
                    <p className='text-center font-medium text-xs text-[#B8B0B0]'>(#56933)</p>
                </div>
                <div className='flex justify-between px-4 items-center mt-4'>
                    <span className='text-[#B8B0B0]'>Qty <span className='text-black font-bold'>10</span></span>
                    <span className='bg-[#E1F3EA] text-[#00875A] text-base font-semibold px-3 py-1.5 rounded-lg'>240$</span>
                </div>
            </div>
            <div className='product basis__25 basis__48 rounded-lg border border-[#DFE2E9] py-4'>
                <div className='px-8'>
                    <div className='bg-[#DFE2E9] p-9 rounded-lg w-14 mx-auto mb-3.5'></div>
                    <p className='text-center text-sm font-semibold mb-3'>Replace Pilot Safety Sensor</p>
                    <p className='text-center font-medium text-xs text-[#B8B0B0]'>(#56933)</p>
                </div>
                <div className='flex justify-between px-4 items-center mt-4'>
                    <span className='text-[#B8B0B0]'>Qty <span className='text-black font-bold'>10</span></span>
                    <span className='bg-[#E1F3EA] text-[#00875A] text-base font-semibold px-3 py-1.5 rounded-lg'>240$</span>
                </div>
            </div>
        </div>
        <div>
            <button className='w-full md:w-auto py-3 px-14 text-sm font-medium text-[#646982] bg-[#E4E6F1] rounded-md'>Show all</button>
        </div>
        </div>
    </div>
    );
};

AssociatedProducts.defaultProps = defaultProps;
export default AssociatedProducts;
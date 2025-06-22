import React from 'react'

const CaptainDetails = () => {
    return (
        <div>
            <div className="p-4 mt-2 flex justify-between items-center ">
                <div className="flex gap-3 justify-start items-center">
                    <img className="h-12 w-12 object-cover rounded-full" src="https://mrwallpaper.com/images/hd/beautiful-woman-with-random-people-in-background-roumbpovzh5jzxj5.jpg"></img>
                    <p className="text-lg capitalize font-semibold">Melisandre</p>
                </div>
                <div className="">
                    <p className="text-lg font-semibold">$1000</p>
                    <p className="text-sm leading-2 text-gray-500">Earned</p>
                </div>
            </div>
            <div className="flex px-3 py-5 rounded-xl mt-4 mx-3 bg-gray-100 items-center justify-center gap-5">
                <div className=" text-center">
                    <i class="text-3xl mb-2 ri-timer-2-line"></i>
                    <p className="text-lg font-semibold">10.2</p>
                    <p className="text-sm font-md text-gray-500">Hours Online</p>
                </div>
                <div className=" text-center">
                    <i class="text-3xl mb-2 ri-speed-up-line"></i>
                    <p className="text-lg font-semibold">30 Km</p>
                    <p className="text-sm font-md text-gray-500">Total Distance</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl mb-2 ri-booklet-line"></i>
                    <p className="text-lg font-semibold">30 Km</p>
                    <p className="text-sm font-md text-gray-500">Total Distance</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails

function Toggle({ setSelected, selected }) {

    return (
        <div className="flex space-x-2 border-[3px] border-[#4B5563] rounded-xl select-none mb-10">
        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
            <input checked={selected === "items"} type="radio" name="radio" defaultValue="html" className="peer hidden" onClick={() => setSelected("items")} defaultChecked />
            <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#2C2C2C] peer-checked:to-[#121212] peer-checked:text-[#F5F5F5] text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">Available Items</span>
        </label>
        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
            <input checked={selected === "mock"} type="radio" name="radio" defaultValue="react" className="peer hidden" onClick={() => setSelected("mock")} />
            <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#2C2C2C] peer-checked:to-[#121212] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">Design Preview</span>
        </label>
        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
            <input checked={selected === "business"} type="radio" name="radio" defaultValue="vue" className="peer hidden" onClick={() => setSelected("business")} />
            <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#2C2C2C] peer-checked:to-[#121212] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">Business Order</span>
        </label>
        </div>
    )
}

export default Toggle
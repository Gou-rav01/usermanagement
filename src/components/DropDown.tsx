import { useState } from "react"

const Dropdown = ({ onSelected }: { onSelected: (value: number) => void }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)

    const handleSelectedFilter = (value: number) => {
        onSelected(value)
        toggleDropdown()
    }

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev)
    }

    return (
        <>
            <button onClick={toggleDropdown}
                className="flex-shrink-0 z-10 
            inline-flex items-center py-2.5 px-4 
            text-sm font-medium text-center text-gray-900 
            bg-gray-100 border border-gray-300 rounded-s-lg 
            dark:bg-gray-700 
            dark:text-white dark:border-white-600"
                type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg></button>
            {isDropdownVisible && (
                <div className="absolute left-10 mt-10 bg-white border rounded shadow-md">
                    <ul style={{ width: 140 }}>
                        <li className="p-3 border-b border-gray-300"><button onClick={() => handleSelectedFilter(1)}>A-Z</button></li>
                        <li className="p-3"><button onClick={() => handleSelectedFilter(2)}>Z-A</button></li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default Dropdown;
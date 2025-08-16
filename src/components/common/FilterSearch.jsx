'use client'

const FilterSearch = ({ seter }) => {
    return (
        <div className="w-full">
            <input onChange={(e) => { seter(e.target.value) }} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Search By ID Or Name" />
        </div>
    )
}

export default FilterSearch;
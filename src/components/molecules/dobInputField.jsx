const DOB = ({
    value,
    onChange
}) => {
    return (
        <>
            <div>
                <label
                    htmlFor="dob"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={value}
                    onChange={onChange}
                    className="block w-full h-12 p-3 border rounded-lg text-gray-900 border-[#004871] bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>
        </>
    )
}
export default DOB;
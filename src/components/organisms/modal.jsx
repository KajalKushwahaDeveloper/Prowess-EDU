import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

function Modal({ visible, setVisible, headingName }) {
    //   const [visible, setVisible] = useState(false);

    return (
        <>
            <Dialog
                header=""
                visible={visible}
                style={{ width: "90vw", maxWidth: "854px", height: "auto" }}
                onHide={() => setVisible(false)}
                className="border-[#004871] border rounded-lg"
            >
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                    <h1 className="font-bold text-lg m-2">{headingName}</h1>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-2">
                        {/* {/ Teacher's Name /} */}
                        <div>
                            <label
                                htmlFor="teacher-name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Teacher's Name
                            </label>
                            <input
                                type="text"
                                id="teacher-name"
                                name="teacher-name"
                                placeholder="Enter teacher's name"
                                className="block w-full h-12 p-3 border rounded-lg text-gray-900 border-[#004871] bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        {/* {/ Email /} */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email address"
                                className="block w-full h-12 p-3 border rounded-lg text-gray-900 border-[#004871] bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        {/* {/ Phone /} */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter phone number"
                                className="block w-full h-12 p-3 border rounded-lg text-gray-900 border-[#004871] bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        {/* {/ Qualification /} */}
                        <div>
                            <label
                                htmlFor="qualification"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Qualification
                            </label>
                            <select
                                id="qualification"
                                name="qualification"
                                className="block w-full h-12 p-3 bg-white border rounded-lg text-gray-900 border-[#004871] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option disabled selected>
                                    Choose a Qualification
                                </option>
                                <option value="BEd">B.Ed</option>
                                <option value="MEd">M.Ed</option>
                                <option value="BTech">B.Tech</option>
                                <option value="MTech">M.Tech</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>

                        {/* {/ Date of Birth /} */}
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
                                className="block w-full h-12 p-3 border rounded-lg text-gray-900 border-[#004871] bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        {/* {/ Gender /} */}
                        <div>
                            <label
                                htmlFor="gender"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                className="block w-full h-12 p-3 bg-white border rounded-lg text-gray-900 border-[#004871] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="" disabled selected>
                                    Select Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* {/ Address /} */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter address"
                                className="block w-full h-12 p-3 border rounded-lg text-gray-900 border-[#004871] bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        {/* {/ Classes You Can Teach /} */}
                        <div>
                            <label
                                htmlFor="classes"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Classes You Can Teach
                            </label>
                            <input
                                type="text"
                                id="classes"
                                name="classes"
                                placeholder="Enter classes"
                                className="block w-full h-12 p-3 border rounded-lg text-gray-900 border-[#004871] bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        {/* {/ Experience /} */}
                        <div>
                            <label
                                htmlFor="experience"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Experience (in years)
                            </label>
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                placeholder="Enter experience"
                                className="block w-full h-12 p-3 border rounded-lg text-gray-900 border-[#004871] bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        {/* {/ Subjects /} */}
                        <div>
                            <label
                                htmlFor="subjects"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Subjects
                            </label>
                            <input
                                type="text"
                                id="subjects"
                                name="subjects"
                                placeholder="Enter subjects"
                                className="block w-full h-12 p-3 border rounded-lg text-gray-900 border-[#004871] bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>


                    <div className="col-span-2 flex justify-end mt-4 space-x-4">
                        {/* {/ Cancel Button /} */}
                        <button
                            onClick={() => setVisible(false)}
                            className="w-[183px] h-[48px] bg-[#FF8A00] text-white font-medium rounded-lg"
                        >
                            Cancel
                        </button>

                        {/* {/ Add Button /} */}
                        <button
                            className="w-[183px] h-[48px] bg-[#00A943] text-white font-medium rounded-lg"
                        >
                            Add
                        </button>
                    </div>

                </div>



            </Dialog>
        </>
    );
}

export default Modal;

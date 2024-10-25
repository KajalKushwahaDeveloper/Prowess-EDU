import React, { useState } from 'react';
import Pagination from "../common/pagination"; // Import the reusable component

const StudentFAQ = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center">Page: {currentPage}</h1>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default StudentFAQ;




// import React, { useState } from "react";
// import { Accordion, AccordionTab } from 'primereact/accordion';
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import "tailwindcss/tailwind.css";
// // import { Link } from "react-router-dom"; // Import Link from react-router-dom
// // import { GoArrowLeft } from "react-icons/go";
// // import { GoArrowRight } from "react-icons/go";

// const StudentFAQ = () => {
//   return (
//     <>
//       <div id="accordion-collapse" data-accordion="collapse">
//         <h2 id="accordion-collapse-heading-1">
//           <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
//             <span>What is Flowbite?</span>
//             <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
//             </svg>
//           </button>
//         </h2>
//         <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
//           <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
//             <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
//             <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
//           </div>
//         </div>
//         <h2 id="accordion-collapse-heading-2">
//           <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
//             <span>Is there a Figma file available?</span>
//             <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
//             </svg>
//           </button>
//         </h2>
//         <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
//           <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
//             <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
//             <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
//           </div>
//         </div>
//         <h2 id="accordion-collapse-heading-3">
//           <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
//             <span>What are the differences between Flowbite and Tailwind UI?</span>
//             <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
//             </svg>
//           </button>
//         </h2>
//         <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
//           <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
//             <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
//             <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
//             <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
//             <ul class="ps-5 text-gray-500 list-disc dark:text-gray-400">
//               <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
//               <li><a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>

//     </>
//   )
// }
// export default StudentFAQ;





//   const [open, setOpen] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpen(open === index ? null : index); // Toggle FAQ open/close
//   };

//   const faqs = [
//     {
//       question: "What is Lorem Ipsum?",
//       answer:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry An unknown printer took a galley of type and scrambled it to make a type specimen book .",
//     },
//     {
//       question: "Why do we use it?",
//       answer:
//         "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.",
//     },
//     {
//       question: "Where does it come from?",
//       answer:
//         "An unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     },
//   ];

//   return (
//     <div className="w-full max-w-2xl mx-auto p-6">
//       <div className="flex space-x-4">
//         <div className="text-lg font-bold">FAQ</div>
//         <Link to="/feedback" className="text-lg text-gray-500">
//           Feedback
//         </Link>{" "}
//         {/* {/ Link to Feedback /} */}
//       </div>
//       <div className="space-y-4 mt-6">
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             className="bg-white p-4 shadow rounded-lg"
//             onClick={() => toggleFAQ(index)}
//           >
//             <div className="flex justify-between items-center cursor-pointer">
//               <div className="font-medium text-lg">
//                 Q.{index + 1} {faq.question}
//               </div>
//               <div>{open === index ? "▾" : "▸"}</div>
//             </div>
//             {open === index && (
//               <div className="mt-2 text-gray-600">{faq.answer}</div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center items-center space-x-2 mt-6">
//         <span className="text-gray-500 cursor-pointer">
//           <GoArrowLeft />
//         </span>{" "}
//         {/* {/ Left Arrow /} */}
//         {[1, 2, 3, 4].map((num) => (
//           <button key={num} className="px-2 py-1 border rounded text-gray-500">
//             {num}
//           </button>
//         ))}
//         <span className="text-gray-500 cursor-pointer">
//           <GoArrowRight />
//         </span>
//       </div>

//       {/* {/ Query Section /} */}
//       <div className="mt-8">
//         <div className=" text-lg font-semibold">Enter your Query here...</div>
//         <div className="relative">
//           <textarea
//             className="w-full h-24 p-2 border border-gray-300 rounded resize-none"
//             placeholder="Enter your Query here..."
//           />
//           <button className="absolute right-0 -bottom-12 bg-green-500 text-white px-6 py-2 rounded">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentFAQ;


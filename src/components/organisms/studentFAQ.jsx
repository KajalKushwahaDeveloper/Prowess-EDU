import React, { useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "tailwindcss/tailwind.css";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import { GoArrowLeft } from "react-icons/go";
// import { GoArrowRight } from "react-icons/go";

const StudentFAQ = () => {
  return (
    <>
      <div className="card"> 
        <Accordion activeIndex={0}>
          <AccordionTab header="Header I">
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </AccordionTab>
          <AccordionTab header="Header II">
            <p className="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
          </AccordionTab>
          <AccordionTab header="Header III">
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
              quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
              mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </AccordionTab>
        </Accordion>
      </div>
    </>
  )
}
export default StudentFAQ;





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


// import { BLOGS } from "@/constants/data";
// import Image from "next/image";
// import React from "react";

// const Blog = () => {
//   return (
//     <section className="max-padd-container">
//       <div className="max-padd-container py-16 xl:py-28 rounded-3xl">
//         <span className="medium-18">Stay Updated with the Latest News!</span>
//         <h2 className="h2">Our Expert Blogs</h2>
//       </div>
//       <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-24">
//         {BLOGS.map((blog) => (
//           <div
//             key={blog.id}
//             className="rounded-3xl border-[11px] shadow-sm overflow-hidden relative"
//           >
//             <Image src={blog.image} alt="" width={400} height={800} />
//             <div className="absolute top-0 left-0 h-full w-full bg-black/25"></div>
//             <div className="absolute bottom-3 left-3 text-white text-[15px]">
//               <h3 className="font-[600px] text-[16px] pt-4 leading-5">
//                 {blog.title}
//               </h3>
//               <h4 className="medium-14 p-3 pt-1">{blog.category}</h4>
//               <button className="bg-white rounded-xl font-semibold text-tertiary px-3 py-1">
//                 Continue reading
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Blog;

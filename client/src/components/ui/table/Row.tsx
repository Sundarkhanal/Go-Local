export const RowSkeleton = ({rows, columns}: Readonly<{rows:number, columns:number}>) => {
    return(
        //      <tr>
        //     <td className="border border-gray-400 px-4 py-2">
        //         <div className="w-full p-2 h-2 rounded-md bg-gray-400 animate-pulse">

        //         </div>
        //     </td>
        //     <td className="border border-gray-400 px-4 py-2">
        //         <div className="w-full p-2 h-2 rounded-md bg-gray-400 animate-pulse">

        //         </div>
        //     </td>
        //     <td className="border border-gray-400 px-4 py-2">
        //         <div className="w-full p-2 h-2 rounded-md bg-gray-400 animate-pulse">

        //         </div>
        //     </td>
        //     <td className="border border-gray-400 px-4 py-2">
        //         <div className="w-full p-2 h-2 rounded-md bg-gray-400 animate-pulse">

        //         </div>
        //     </td>
        //   </tr>
        <>
        {[...Array(rows)].map((_:undefined, i:number) => (
            <tr key={i}>
                {[...Array(columns)].map((_:undefined, j:number) => (
                    <td key={"column-"+j} className="border border-gray-300 px-4 py-3">
                        <div className="w-full h-2 rounded-md bg-gray-400  animate-pulse"></div>
                    </td>
                ))}
            </tr>
        ))}
        </>
    )
}
interface IProductProps{
    name:string,
    price:number,
    image: string
}

const ProducCart = ({name, price, image}:IProductProps) => {
    return(
        <div className="bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition p-4">
            <img src={image} className="rounded-lg h-40 w-full object-cover"/>
            <h3 className="mt-3 font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">Fresh From Local Farms</p>

            <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-teal-600">
                    Nrs.{price}
                </span>

                <button className="px-3 py-1 bg-teal-600 text-white rounded hover:shadow"> 
                    Add
                </button>

            </div>

        </div>
    )


}

export default ProducCart
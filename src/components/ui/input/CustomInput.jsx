export default function CustomInput({placeholder}){
    return(
        <input
                  type="text"
                  id="search-job"
                  className="w-full p-3 pl-10 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 focus:ring-yellow-500 transition placeholder:text-gray-400"
                  placeholder={placeholder}
                />
    )
}